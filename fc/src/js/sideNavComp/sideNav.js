export class Nav {
	constructor(Manager) {
		this.manager = Manager
		this.pageLinks = []
		this.state = 'show'
		this.navBar = null
		this.toggleButton = null
		this.pageElements = []
		this.mainContent = null
		this.btnList = []
		this.sideNaveRow = null
	}

	init() {

		this.navBar = document.getElementById('sideNav');
		this.toggleButton = document.querySelector('.toggle-btn');
		this.mainContent = document.getElementById("mainContent")
		this.sideNaveRow = document.getElementById("sideNaveRow")
		this.setButtons()
		this.toggleButton.addEventListener('click', () => {
			this.toggle();
		});
		this.toggle();

	}



	goToPage(pageName) {
		console.log(pageName, "here")
		let pageIndex = this.pageLinks.findIndex(navItem => navItem.pageName === pageName);
		//console.log("link", this.pageLinks[pageIndex].pageLink)
		if (pageIndex !== -1 && this.pageElements[pageIndex].disabled != true) {
			window.location.href = this.pageLinks[pageIndex].pageLink;
		} else {
			console.error('Page not found');
		}
	}

	toggle() {

		this.state = this.state === 'show' ? 'hide' : 'show';
		this.updateSidebar();
	}

	updateSidebar() {
		if (this.state === 'show') {
			this.navBar.style.width = '150px';
			this.mainContent.style.paddingLeft = "150px"
			//console.log(this.pageElements)
			for (let i = 0; i < this.pageLinks.length; i++) {

				this.pageElements[i].innerHTML = this.pageLinks[i].pageName + " "
				this.pageElements[i].appendChild(this.pageLinks[i].icon)
			}

		} else {
			this.navBar.style.width = '60px';
			this.mainContent.style.paddingLeft = "60px"
			for (let i = 0; i < this.pageLinks.length; i++) {
				this.pageElements[i].innerHTML = ""
				this.pageElements[i].appendChild(this.pageLinks[i].icon)
			}
		}
	}
	setButtons() {
		this.btnList.forEach((btn) => {
			this.sideNaveRow.appendChild(btn)
		})
		const navElements = document.querySelectorAll('.pageLinks');
		navElements.forEach((elm) => {
			this.pageElements.push(elm)
			const elmIcon = elm.children[0]
			const elmName = elm.name
			const elmLink = elm.id
			//const custLink = elmLink.split(".")[1]
			let elmDisabledStatus
			if (!elm.disabled) {
				elmDisabledStatus = true
			} else {
				elmDisabledStatus = false
			}
			//console.log(elmDisabledStatus)
			this.pageLinks.push({ pageName: elmName, pageLink: elmLink, icon: elmIcon, disabled: elmDisabledStatus });
			elm.innerHTML = elm.name + " "
			elm.appendChild(elmIcon)

			elm.addEventListener("click", () => {
				this.goToPage(elmName)
			})
		});
	}
};

