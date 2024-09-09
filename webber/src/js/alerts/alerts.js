export default class AlertsNotifications {
	notice(message) {
		// Create the notice element
		const notice = document.createElement("div");
		notice.classList.add("alert-notice");
		notice.innerHTML = `
        <p class="p-notice">
            ${message}
        </p>
        `;

		// Append the notice to the main content
		document.getElementById("mainContent").appendChild(notice);

		// Set a timer to remove the notice after 5 seconds
		setTimeout(() => {
			notice.remove();
		}, 1000);
	}

	alert(message) {
		// Create the notice element
		const notice = document.createElement("div");
		notice.classList.add("alert-notice");
		notice.innerHTML = `
        <p class="p-notice">
            ${message}
        </p>
        `;

		// Append the notice to the main content
		document.getElementById("mainContent").appendChild(notice);

		// Set a timer to remove the notice after 5 seconds
		setTimeout(() => {
			notice.remove();
		}, 5000);
	}
}
