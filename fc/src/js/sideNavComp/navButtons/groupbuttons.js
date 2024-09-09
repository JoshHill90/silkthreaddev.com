
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
export function CalculatorBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Calculator"
	btn.innerHTML = `<i class="fa-solid fa-calculator"></i>`
	btn.id = "/site/index.html"

	col.appendChild(btn)
	return col
}