
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

export function CreateEmailListBtn() {
	const col = document.createElement("div")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "EmailList"
	btn.innerHTML = `
		Upload Contacts 
		<i class="fa-solid fa-envelopes-bulk"></i>
	`
	btn.id = "createEmailListBtn"
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("data-bs-target", "#createEmailListCollapse")
	btn.setAttribute("aria-expanded", "false")
	btn.setAttribute("aria-controls", "createEmailListCollapse")

	col.appendChild(btn)
	return col
}

export function CreatePhoneListBtn() {
	const col = document.createElement("div")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "PhoneList"
	btn.innerHTML = `
		New Phone List
		<i class="fa-solid fa-phone"></i>
	`
	btn.id = "createPhoneListBtn"
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("data-bs-target", "#createPhoneListCollapse")
	btn.setAttribute("aria-expanded", "false")
	btn.setAttribute("aria-controls", "createPhoneListCollapse")

	col.appendChild(btn)
	return col
}

export function UploadTemplateBtn() {
	const col = document.createElement("div")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "UploadTemplate"
	btn.innerHTML = `
		Upload Template
		<i class="fa-solid fa-file-arrow-up"></i>
	`
	btn.id = "UploadTemplateBtn"
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("data-bs-target", "#UploadTemplateCollapse")
	btn.setAttribute("aria-expanded", "false")
	btn.setAttribute("aria-controls", "UploadTemplateCollapse")

	col.appendChild(btn)
	return col
}

export function SendEmailListBtb() {
	const col = document.createElement("div")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "SenderEmailList"
	btn.innerHTML = `
		Sender Email List
		<i class="fa-solid fa-file-arrow-up"></i>
	`
	btn.id = "SendEmailListBtn"
	btn.setAttribute("data-bs-toggle", "collapse")
	btn.setAttribute("data-bs-target", "#SendEmailListCollapse")
	btn.setAttribute("aria-expanded", "false")
	btn.setAttribute("aria-controls", "SendEmailListCollapse")

	col.appendChild(btn)
	return col
}