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
