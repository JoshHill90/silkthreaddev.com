import { SectionKeyValue } from "../../webparts/section/sectionComponets"
import DomainsKeysValues from "./sub/domainClient"
export class ClientModal {
	constructor(Manager, API, DomainsKeysValues) {
		this.api = API
		this.manager = Manager
		this.domainSection = DomainsKeysValues
		this.clientSecrects = new SectionKeyValue()
		this.clientinfo = new SectionKeyValue()

		this.clientDomains = null
		this.clientContactElm = null
		this.keyValuesCollapse = null
		this.keyValuesCollapseToggle = null
		this.updateClientData = null
		this.clientInfoBtn = null

	}

	init() {
		this.keyValuesCollapse = document.getElementById("keyValuesCollapse")
		this.clientDomains = document.getElementById("clientDomains")
		this.clientContactElm = document.getElementById("clientContactElm")
		this.updateClientData = document.getElementById("updateClientData")

		this.clientInfoBtn = document.getElementById("clientInfoBtn")

		// close the collapse for key values if open 
		this.keyValuesCollapseToggle = new bootstrap.Collapse(keyValuesCollapse, {
			toggle: false // Do not toggle automatically
		});
		//this.clientSecrects.init()
	}

	clear() {
		this.clientDomains.innerHTML = ""
		this.clientContactElm.innerHTML = ""

		this.keyValuesCollapseToggle.hide()
	}

	async patch() {

		const clientInfoFormData = {
			first_name: document.getElementById("First-Name").value,
			last_name: document.getElementById("Last-Name").value,
			email: document.getElementById("Email").value,
			phone: document.getElementById("Phone").value
		}
		const clientUpdate = await this.api.patchClientDetails(clientInfoFormData)

		this.manager.clientList.forEach((client, index) => {
			if (client.user === clientUpdate.user) {
				this.manager.clientList[index] = clientUpdate
			}
		})
		return
	}

	componet(client, uniIndex) {
		this.clear()

		const infoData = [
			{ "key": "First-Name", "value": client.first_name, "copy": null, "edit": "on", "input": "text", "type": "text" },
			{ "key": "Last-Name", "value": client.last_name, "copy": null, "edit": "on", "input": "text", "type": "text" },
			{ "key": "Email", "value": client.email, "copy": "on", "edit": "on", "input": "email", "type": "email" },
			{ "key": "Phone", "value": client.phone, "copy": "on", "edit": "on", "input": "tel", "type": "tel" },
			{ "key": "Silk-ID", "value": client.silk_id, "copy": "on", "edit": null, "input": null, "type": "text" },
			{ "key": "Stripe-ID", "value": client.stripe_id, "copy": "on", "edit": null, "input": null, "type": "text" }
		]

		this.clientinfo.init(infoData, clientContactElm, uniIndex)
		this.clientinfo.set()

		this.manager.clientDetails.forEach((info) => {
			const topCol = document.createElement("div")

			topCol.setAttribute("data-bs-target", "#keyValuesCollapse")
			topCol.setAttribute("data-bs-toggle", "collapse")
			topCol.setAttribute("aria-expanded", "false")
			topCol.setAttribute("aria-controls", "keyValuesCollapse")
			topCol.classList.add("section-item", "col-12")
			//console.log("domain", info)
			topCol.innerHTML = `
				<div class="row">
					<div class="col-8">
						<p>${info.domains.domain}.${info.domains.domain_type}</p>
					</div>
					<div class="col-4">
						<p>${info.domains.status}</p>
					</div>
				</div>
			`
			topCol.addEventListener("click", () => {
				this.domainSection.clear()
				this.domainSection.componet(info)
				this.manager.seletedDomain = info.domains.domain
			})
			this.clientDomains.appendChild(topCol)
		})
	}

}