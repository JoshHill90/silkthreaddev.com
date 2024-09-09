export default class AutomationAPI {
	constructor(Manager) {
		this.manager = Manager
	}

	async getAutomationTask() {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/${this.manager.selectedClientId}/details/`,
				{
					method: 'GET',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			//console.log(data)
			return data;

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async postNewTask(newClientFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/create`,
				{
					method: 'POST',
					body: JSON.stringify(newClientFormData),
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			//console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}
}