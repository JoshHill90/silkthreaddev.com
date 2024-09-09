const service = document.getElementById("service")
const baseURL = "https://worker.silkthreaddev.com/"
const form = document.getElementById("serviceForm")
let isBackspace = false;
const webDevCol = document.getElementById("webDevCol")
const busAppsCol = document.getElementById("busAppsCol")
const hostingCol = document.getElementById("hostingCol")
// services form buttons
const page2NextBtn = document.getElementById("page2")
const page1NextBtn = document.getElementById("page1")
const page2BackBtn = document.getElementById("backToPage1")
const page3BackBtn = document.getElementById("backToPage2")
// services form sections 
const selectService = document.getElementById("selectService")
const contactInfo = document.getElementById("contactInfo")
const projectInfo = document.getElementById("projectInfo")


// services cards
const yearlyHostingCard = document.getElementById("yearlyHostingCard")
const monthlyHostingCard = document.getElementById("monthlyHostingCard")
const busAutoCard = document.getElementById("busAutoCard")
const busAppCard = document.getElementById("busAppCard")
const webDevandHostingCard = document.getElementById("webDevandHostingCard")
const webDevOnlyCard = document.getElementById("webDevOnlyCard")

const phoneNumbers = document.getElementById('phone');

service.addEventListener("change", (elm) => {
	hostingCol.classList.remove("showForm")
	busAppsCol.classList.remove("showForm")
	webDevCol.classList.remove("showForm")
	hostingCol.classList.add("hideForm")
	busAppsCol.classList.add("hideForm")
	webDevCol.classList.add("hideForm")
	clearCards()
	const selector = elm.target.value

	if (selector === "web") {
		webDevCol.classList.add("showForm")

	} else if (selector === "app") {
		busAppsCol.classList.add("showForm")
	} else if (selector === "host") {
		hostingCol.classList.add("showForm")
	} else if (selector === "none") {

		hostingCol.classList.remove("showForm")
		busAppsCol.classList.remove("showForm")
		webDevCol.classList.remove("showForm")
	}
})

document.getElementById("busApps").addEventListener("change", (elm) => {
	clearCards()
	const selector = elm.target.value

	if (selector === "intenalApp" ||
		selector === "intranetSite" ||
		selector === "externalApp" ||
		selector === "externalAppWhosting"
	) {
		busAppCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (
		selector === "SSAuto" ||
		selector === "SSInt" ||
		selector === "MSAuto" ||
		selector === "MSInt"
	) {
		busAutoCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (selector === "none") {

	}
})

document.getElementById("webDev").addEventListener("change", (elm) => {
	clearCards()
	const selector = elm.target.value

	if (selector === "webOnly") {
		webDevOnlyCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (
		selector === "webAndHosting") {
		webDevandHostingCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (selector === "none") {

	}
})

document.getElementById("hosting").addEventListener("change", (elm) => {
	clearCards()
	const selector = elm.target.value

	if (selector === "yearly") {
		yearlyHostingCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (
		selector === "monthly") {
		monthlyHostingCard.classList.add("showForm")
		page2NextBtn.classList.remove("hideForm")
	} else if (selector === "none") {

	}
})

function clearCards() {
	yearlyHostingCard.classList.remove("showForm")
	yearlyHostingCard.classList.add("hideForm")
	monthlyHostingCard.classList.remove("showForm")
	monthlyHostingCard.classList.add("hideForm")

	webDevandHostingCard.classList.remove("showForm")
	webDevandHostingCard.classList.add("hideForm")
	webDevOnlyCard.classList.remove("showForm")
	webDevOnlyCard.classList.add("hideForm")

	busAutoCard.classList.remove("showForm")
	busAutoCard.classList.add("hideForm")
	busAppCard.classList.remove("showForm")
	busAppCard.classList.add("hideForm")

}


form.addEventListener('submit', (event) => {
	event.preventDefault()
	document.getElementById('formBtn').hidden = true;

	// Fetch the form data
	const formData = new FormData(form);

	// Convert form data to JSON object
	const data = {};
	formData.forEach((value, key) => {
		data[key] = value;
	});
	fetch(`${baseURL}site/api/v1/dynamic-form/`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			if (res.ok) {
				window.location.href = "/site/contact/thanks.html";
			} else {
				return res.json();
			}
		})
		.catch((error) => alert('Services form backend please refresh and try again:', error));

});


// Detect if backspace is pressed
phoneNumbers.addEventListener('keydown', (event) => {
	if (event.key === 'Backspace') {
		isBackspace = true;
	}
});

// Handle input formatting
phoneNumbers.addEventListener('input', (event) => {
	var inputField = event.target;
	var inputValue = inputField.value;
	if (isBackspace) {
		isBackspace = false;
		return;
	}
	inputValue = inputValue.replace(/[^\d-]/g, '');

	inputValue = inputValue.replace(/-/g, '');

	if (inputValue.length > 3) {
		inputValue = inputValue.slice(0, 3) + '-' + inputValue.slice(3);
	}
	if (inputValue.length > 6) {
		inputValue = inputValue.slice(0, 7) + '-' + inputValue.slice(7, 11);
	}

	if (inputValue.length > 12) {
		inputValue = inputValue.slice(0, 12);
	}

	inputField.value = inputValue;
});

page1NextBtn.addEventListener("click", () => {
	var format = /[ `!@#$%^&*()_+\=\[\]{};:"\\|,.<>\/?~]/;
	const firstName = document.getElementById("firstName")
	const lastName = document.getElementById("lastName")

	const email = document.getElementById("email")
	const address = document.getElementById("address")
	const apartment = document.getElementById("apartment")
	const city = document.getElementById("city")
	const state = document.getElementById("state")
	const zip = document.getElementById("zip")
	const referral = document.getElementById("referral")
	console.log(email.value.includes("@"))
	if (firstName.value.length < 1 && format.test(firstName.value)) {
		alert("Please input your first name")
		return
	} else if (lastName.value.length < 1 && format.test(lastName.value)) {
		alert("Please input your Last name")
		return
	} else if (email.value.length < 1 && !email.value.includes("@")) {
		alert("Please input a valuid email")
		return
	} else if (address.value.length < 1) {
		alert("Please input your street address")
		return
	} else if (city.value.length < 1) {
		alert("Please input your city")
		return
	} else if (state.value === "none") {
		alert("Please input your state")
		return
	} else if (zip.value.length < 5) {
		alert("Please input your zip")
		return
	} else if (referral.value === "none") {
		alert("Please input your how you found us")
		return
	}
	contactInfo.classList.add("hideForm")
	selectService.classList.remove("hideForm")
})


page2NextBtn.addEventListener('click', () => {
	selectService.classList.add("hideForm")
	projectInfo.classList.remove("hideForm")
})

page2BackBtn.addEventListener('click', () => {
	contactInfo.classList.remove("hideForm")
	selectService.classList.add("hideForm")
})

page3BackBtn.addEventListener('click', () => {
	selectService.classList.remove("hideForm")
	projectInfo.classList.add("hideForm")
})