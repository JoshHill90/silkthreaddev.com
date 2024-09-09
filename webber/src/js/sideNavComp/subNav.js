
import { addDomainBtn, ClientCreateBtn, CreateTaskBtn } from "./subNavBtn/subNavBtn"

export class SubNav {
	constructor(Nav) {
		this.nav = Nav
		this.state = null
		this.subNavRow = null

		this.checkbox2 = null
		this.subNavObject = document.getElementById('subNavObj')
	}

	init() {
		this.addListener();
		this.checkbox2 = document.getElementById("checkbox2")
		this.subNavRow = document.createElement("div")
		this.subNavRow.classList.add("row", "text-center")
		this.subNavRow.hidden = true
		this.subButtons()

	}
	addListener() {
		if (this.nav.toggleButton) {
			this.nav.toggleButton.addEventListener("click", () => {
				this.toggle();
			});
		} else {
			console.error("Toggle button not found");
		}
	}
	toggle() {
		if (this.subNavObject) {
			if (this.nav.state === "show") {

				this.subNavObject.style.left = "148px";
				this.subNavObject.style.width = "180px";
				this.subNavRow.hidden = false
			} else {

				this.subNavObject.style.left = "60px";
				this.subNavObject.style.width = "5px";
				this.subNavRow.hidden = true
			}
		} else {
			console.error("Sub navigation object not found");
		}
	}

	subButtons() {
		//console.log("checked")
		const currentUrl = window.location.href;

		if (currentUrl.split("/")[3] == "site") {
			this.subNavObject.appendChild(this.subNavRow)
			if (currentUrl.split("/")[4] == "clients.html") {
				const clientCreateCol = ClientCreateBtn()
				this.subNavToggleClose(clientCreateCol)

				const addDomainCol = addDomainBtn()
				this.subNavToggleClose(addDomainCol)
				this.subNavRow.appendChild(clientCreateCol)
				this.subNavRow.appendChild(addDomainCol)
			}

			if (currentUrl.split("/")[4] == "automation.html") {

				// new task
				const newTaskBtn = CreateTaskBtn()
				this.subNavToggleClose(newTaskBtn)
				// append buttons
				this.subNavRow.appendChild(newTaskBtn)
			}
		}
	}

	subNavToggleClose(subNavBtn) {
		subNavBtn.addEventListener("click", () => {
			this.nav.toggle()
			this.toggle()
			this.checkbox2.checked = false
		})
	}
};
