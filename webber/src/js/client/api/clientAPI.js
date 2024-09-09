
export class ClientAPI {
	constructor(Manager) {
		this.manager = Manager
	}

	async getAllClients() {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/all/`,
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
			console.error('Error fetching client data:', error);
			throw error;
		}
	}

	async getClientDetails() {
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

	async postNewClient(newClientFormData) {
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

	async patchClientDetails(clientFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/${this.manager.selectedClientId}/details/update`,
				{
					method: 'PATCH',
					body: JSON.stringify(clientFormData),
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

	async patchDomainDetails(clientFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `domain/api/v1/${this.manager.seletedDomain}/update/`,
				{
					method: 'PATCH',
					body: JSON.stringify(clientFormData),
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

