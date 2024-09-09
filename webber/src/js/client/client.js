
import { thisSiteURL, apiURL } from "../main";
import defaultGetCookie from "../auth/siteCookie";
import { ClientAPI } from "./api/clientAPI";
import { ClientModal } from "./modals/clientModal"
import DomainsKeysValues from "./modals/sub/domainClient";
import NewClientForm from "./comp/newClientComp";

// client objects manager 
class Client {
	constructor() {
		this.apiURL = null
		this.cookie = null
		this.clientList = null
		this.clientSection = null
		this.clientDetails = []
		this.selectedClientId = null

		this.closeCollapse = null

		this.clientSelectFeild = null
	}
}

class ClientManager {
	constructor() {
		this.manager = new Client()
		this.api = new ClientAPI(this.manager)
		this.newClientForm = new NewClientForm(this.manager, this.api)
		this.domainSection = new DomainsKeysValues(this.manager, this.api)
		this.modal = new ClientModal(this.manager, this.api, this.domainSection)
	}
	// initiate the client page
	async init() {
		//set up api site and cookie
		this.manager.apiURL = apiURL
		this.manager.cookie = defaultGetCookie()
		// set up key componets 
		this.clientSelectFeild = document.getElementById("clientSelectFeild")
		this.manager.clientSection = document.getElementById("clientSection")
		this.manager.clientList = await this.api.getAllClients()
		// initiate componets and build
		this.newClientForm.init()
		this.domainSection.init()
		this.build()
		this.modal.init()
		// set listeners for the page
		this.listeners()
	}

	listeners() {
		// new client form
		this.newClientForm.newClientBtn.addEventListener("click", async () => {
			await this.newClientForm.post()
			this.reloadData()
		})

		// update client details
		this.modal.clientInfoBtn.addEventListener('click', async () => {

			await this.modal.patch()
			this.reloadData()
		})

		// set up accordion section listiners 
		document.querySelectorAll('.close-accordion-btn').forEach(function (button) {
			button.addEventListener('click', function () {

				var accordionSection = this.closest('.accordion-collapse');

				accordionSection.classList.remove('show');
			});
		});
		// update client domain key values 
		this.domainSection.updateDomainValuesBtn.addEventListener('click', async () => {
			await this.domainSection.patch()
			this.reloadData()

		})
	}

	reloadData() {
		this.manager.clientSection.innerHTML = ""
		this.build()
	}

	build() {
		this.manager.clientList.forEach((client) => {
			const topCol = document.createElement("div")

			topCol.classList.add("col-12", "section-item")
			topCol.setAttribute("data-bs-toggle", "modal")
			topCol.setAttribute("data-bs-target", "#ClientDetailsModal")

			topCol.innerHTML = `
				<div class="row">
					<div class="col-4">
						<p class="p-n">
							${client.first_name} ${client.last_name}
						</p>
					</div>
					<div class="col-4">
						<p class="p-n">
							${client.email}
						</p>
					</div>
					<div class="col-4">
						<p class="p-n">
							${client.onboarded}
						</p>
					</div>
				</div>
			`

			this.manager.clientSection.appendChild(topCol)

			const clientOption = document.createElement("option")
			clientOption.id = client.user
			clientOption.textContent = `${client.first_name} ${client.last_name}`
			this.clientSelectFeild.append(clientOption)
			topCol.addEventListener("click", async () => {
				this.manager.clientDetails = []
				this.manager.selectedClientId = client.user
				const respData = await this.api.getClientDetails(client.user)
				respData.forEach((domainData) => {
					this.manager.clientDetails.push(domainData)
				})
				this.modal.componet(client, client.user)
			})
		})
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const clientManager = new ClientManager();
	clientManager.init();
});