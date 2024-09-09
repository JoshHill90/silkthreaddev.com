
export function TaskBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Task"
	btn.innerHTML = `<i class="fa-solid fa-list-check"></i>`
	btn.id = "/site/task.html"

	col.appendChild(btn)
	return col
}
