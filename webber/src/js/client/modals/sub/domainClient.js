import { SectionKeyValue } from "../../../webparts/section/sectionComponets"

export default class DomainsKeysValues {

	constructor(Manager, API) {
		this.domainItems = new SectionKeyValue()
		this.manager = Manager
		this.api = API
		this.keyValueElm = null
		this.updateDomainValuesBtn = null

	}

	init() {
		this.keyValueElm = document.getElementById("keyValueElm")
		this.updateDomainValuesBtn = document.getElementById("updateDomainValuesBtn")

	}

	async patch() {

		const domainFormData = {
			db_key: document.getElementById("Database-Key").value,
			db_name: document.getElementById("Database-Name").value,
			description: document.getElementById("Description").value,
			r2_id: document.getElementById("R2-ID").value,
			r2_bucket: document.getElementById("R2-Bucket").value,
			r2_endpoint: document.getElementById("R2-Endpoint").value,
			r2_key: document.getElementById("R2-Key").value,
			r2_token: document.getElementById("R2-Token").value,
			zone_id: document.getElementById("Zone-ID").value,
		}

		const domainUpdated = await this.api.patchDomainDetails(domainFormData)
		this.manager.clientDetails.forEach((domain, domainIndex) => {
			if (domainUpdated.domain == domain.domain) {
				this.manager.clientDetails[domainIndex] = domainUpdated
			}
		})
	}

	clear() {
		this.keyValueElm.innerHTML = ""
	}

	componet(domain) {
		this.clear()

		const keyValueSet = [
			{ "key": 'Database-Key', "value": domain.domains.db_key, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'Database-Name', "value": domain.domains.db_name, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'Description', "value": domain.domains.description, copy: "on", edit: "on", input: 'area', type: "textarea" },
			{ "key": 'R2-ID', "value": domain.domains.r2_account_id, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'R2-Bucket', "value": domain.domains.r2_bucket, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'R2-Endpoint', "value": domain.domains.r2_endpoint, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'R2-Key', "value": domain.domains.r2_key, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'R2-Token', "value": domain.domains.r2_token, copy: "on", edit: "on", input: 'text', type: "text" },
			{ "key": 'Zone-ID', "value": domain.domains.zone_id, copy: "on", edit: "on", input: 'text', type: "text" },
		]

		this.domainItems.init(keyValueSet, this.keyValueElm, domain.domains.silk_client)
		this.domainItems.set()
	}
}