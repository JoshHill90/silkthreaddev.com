
export function ClientsBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Clients"
	btn.innerHTML = `<i class="fa-solid fa-users"></i>`
	btn.id = "/site/clients.html"

	col.appendChild(btn)
	return col
}

export function SubscriptionsBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Subscriptions"
	btn.innerHTML = `<i class="fa-solid fa-bolt"></i>`
	btn.id = "/site/subscriptions.html"

	col.appendChild(btn)
	return col
}

export function AutomationBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "AutomationBtn"
	btn.innerHTML = `<i class="fa-solid fa-bolt"></i>`
	btn.id = "/site/automation.html"

	col.appendChild(btn)
	return col
}


export function ProductsBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Products"
	btn.innerHTML = `<i class="fa-solid fa-chalkboard-user"></i>`
	btn.id = "/site/products.html"

	col.appendChild(btn)
	return col
}

export function SettingsBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Settings"
	btn.innerHTML = `<i class="fa-solid fa-user-gear"></i>`
	btn.id = "/site/settings.html"

	col.appendChild(btn)
	return col
}


export function ApplicationsBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Applications"
	btn.innerHTML = `<i class="fa-solid fa-bolt"></i>`
	btn.id = "/site/applications.html"

	col.appendChild(btn)
	return col
}
