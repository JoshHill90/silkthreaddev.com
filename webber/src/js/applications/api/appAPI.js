export default class AppAPI {
	constructor(Manager) {
		this.manager = Manager
	}

	async userDataAPI() {

		try {
			const response = await fetch(this.manager.apiURL + "client/api/v1/user/apps/", {
				method: 'GET',
				headers: {
					'Authorization': 'Token ' + this.manager.cookie,
					'X-CSRFToken': this.manager.cookie,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				alert("Invalid Token, please refresh and login");
				return;
			}

			const data = await response.json();
			return data
		} catch (error) {
			console.error('Error fetching gallery data:', error);
		}
	}
}