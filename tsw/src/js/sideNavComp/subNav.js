import { CreateTaskBtn } from "../task/subComp/taskBtn";

export class SubNav {
	constructor(Nav) {
		this.nav = Nav
		this.state = null
		this.subNavRow = null
		this.subNavObject = document.getElementById('subNavObj')
	}

	init() {
		this.addListener();
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
		this.subNavObject.appendChild(this.subNavRow)

		if (currentUrl.split("/")[3] == "site") {

			const createTask = CreateTaskBtn()
			createTask.addEventListener("click", () => {
				this.toggle();
			})
			console.log(createTask)
			this.subNavRow.appendChild(createTask)
		}
	}
};
