export default class AutomationAPI {
	constructor(Manager) {
		this.manager = Manager
	}

	async getTaskList() {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/list`,
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

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async deleteTask(taskID) {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/${taskID}/delete`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async postNewTask(newTaskFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/new`,
				{
					method: 'POST',
					body: JSON.stringify(newTaskFormData),
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

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async postEmailTemplate(newTaskFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/template/upload`,
				{
					method: 'POST',
					body: newTaskFormData,
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async getEmailTemplate() {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/templates`,
				{
					method: 'GET',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}
	async deleteEmailtemplate(templateID) {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/template/${templateID}/delete`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}
	async postContactList(newContactFormData) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/contact-list/create`,
				{
					method: 'POST',
					body: newContactFormData,
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie
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
	async getContactList() {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/contact-list`,
				{
					method: 'GET',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async deleteContactList(listID) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/contact-list/${listID}/delete`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async getTaskContext() {
		try {
			const response = await fetch(this.manager.apiURL + `task/api/v1/context`,
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

			console.log(data)
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}
	async postNewSendEmailList(newSenderEmailList) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/sender-list/create`,
				{
					method: 'POST',
					body: JSON.stringify(newSenderEmailList),
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

	async getSendEmailList() {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/sender-list`,
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
			return data

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}

	async deleteSendEmailList(id) {
		try {
			const response = await fetch(this.manager.apiURL + `client/api/v1/sender-list/delete/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return

		} catch (error) {
			console.error('Error fetching client detail data:', error);
			throw error;
		}
	}
}