
export function ClientCreateBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.setAttribute("data-bs-target", "#newClient")
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("aria-expanded", "true")
	btn.setAttribute("aria-controls", "newClient")
	btn.type = "button"

	btn.name = "Create"
	btn.innerHTML = `Create <i class="fa-solid fa-user-plus"></i>`
	btn.id = "clientCreateBtn"

	col.appendChild(btn)
	return col
}


export function addDomainBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.setAttribute("data-bs-target", "#newClientDomain")
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("aria-expanded", "true")
	btn.setAttribute("aria-controls", "newClientDomain")
	btn.type = "button"

	btn.name = "Domain"
	btn.innerHTML = `Domain <i class="fa-solid fa-globe"></i>`
	btn.id = "clientDomainBtn"

	col.appendChild(btn)
	return col
}

export function CreateTaskBtn() {
	const col = document.createElement("div")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Task"
	btn.innerHTML = `
		Create Task
		<i class="fa-regular fa-square-plus"></i>
	`
	btn.id = "createTaskBtn"
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("data-bs-target", "#createTaskCollapse")
	btn.setAttribute("aria-expanded", "false")
	btn.setAttribute("aria-controls", "createTaskCollapse")

	col.appendChild(btn)
	return col
}