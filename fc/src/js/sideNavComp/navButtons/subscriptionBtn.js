
export function BillingBtn() {
	const col = document.createElement("col")
	col.classList.add("col-12")
	const btn = document.createElement("button")
	btn.classList.add("btn-cust-nav", "pageLinks")
	btn.type = "button"

	btn.name = "Billing"
	btn.innerHTML = `<i class="fa-solid fa-book"></i>`

	btn.id = "/site/billing.html"
	col.appendChild(btn)
	return col
}
