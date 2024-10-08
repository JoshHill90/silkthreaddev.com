
export class pageLoader {

	constructor() {
		this.loader = null
		this.mainContent = null
	}
	init() {
		this.loader = document.getElementById("semicircle")
		this.mainContent = document.getElementById("mainContent")
	}
	showLoader() {
		this.loader.classList.add("show")
		this.mainContent.classList.add("hide")
		this.loader.classList.remove("hide")
		this.mainContent.classList.remove("show")
	}
	hideLoader() {
		this.loader.classList.remove("show")
		this.mainContent.classList.remove("hide")
		this.loader.classList.add("hide")
		this.mainContent.classList.add("show")
	}
}
