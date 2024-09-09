export default class settingsForm {
	constructor(manager) {
		this.manager = manager
	}

	init() {
		this.manager.settingsforms = document.querySelectorAll('.needs-validation');
	}
	formValidation() {

		'use strict';


		Array.prototype.slice.call(this.manager.settingsforms)
			.forEach(function (form) {
				form.addEventListener('submit', function (event) {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}

					form.classList.add('was-validated');
				}, false);
			});
	}
	fillForm() {
		console.log(this.manager.userData.userInfo)
		this.manager.firstname.value = this.manager.userData.userInfo.first_name
		this.manager.lastname.value = this.manager.userData.userInfo.last_name
		this.manager.street.value = this.manager.userData.userInfo.address_1
		this.manager.unit.value = this.manager.userData.userInfo.unit
		this.manager.city.value = this.manager.userData.userInfo.city
		this.manager.state.value = this.manager.userData.userInfo.state
		this.manager.zip.value = this.manager.userData.userInfo.zip
		this.manager.phone.value = this.manager.userData.userInfo.phone
		this.manager.username.value = this.manager.userData.userInfo.email
	}
	update() {

	}
}