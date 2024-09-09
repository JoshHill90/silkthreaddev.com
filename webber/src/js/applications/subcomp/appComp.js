export default class AppComp {
	constructor(Manager) {
		this.manager = Manager

	}



	schedular() {
		const colHolder = document.createElement("div")
		colHolder.classList.add("col-4", "app-card")

		colHolder.innerHTML = `
			<div class="app-text">
				<h1 class="h1-l"> 
					Task Webber
				</h1>
				<p class="p-l">
					This Is an application for scheduling appointments with clients.
				</p>
				<p class="p-l">
					Included with your web hosting subscription.
				</p>
			</div>
			<div class="app-task-webber"></div>
		`
		colHolder.addEventListener("click", () => {
			document.location.href = ""
		})
		return colHolder
	}
}