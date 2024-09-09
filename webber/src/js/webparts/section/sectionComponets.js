import AlertsNotifications from "../../alerts/alerts"

export class SectionKeyValue {
	constructor() {
		this.alerts = new AlertsNotifications()
		this.keyValueData = null
		this.parentElemnt = null
		this.uni = null
	}

	// start
	init(dataSet, element, uni) {
		this.keyValueData = dataSet
		this.parentElemnt = element
		this.uni = uni
	}

	// set the elements in place
	set() {
		this.keyValueData.forEach((data, dataIndex) => {
			//console.log("elm", data, dataIndex)
			const indexID = `${this.uni}${dataIndex}`
			let key = data.key.split(" ")[0]

			const sectionComponet = this.componet(key, data.value, data.copy, data.edit, data.input, data.type, indexID, dataIndex)
			this.parentElemnt.appendChild(sectionComponet)
		})
	}

	//clear the section
	clear() {
		this.parentElemnt.innerHTML = ""
	}



	// copy option 
	createCopyButton(key, value) {
		const copyBtn = document.createElement("a")
		copyBtn.classList.add("btn-cust-2")
		copyBtn.innerHTML = `<i class="fa-solid fa-copy" id="${key}copy"></i>`;
		copyBtn.addEventListener('click', () => {
			this.copyInputValue(value)
		})
		return copyBtn
	}

	// edit option
	editCheck(edit, key, index) {
		//console.log(key, edit)
		if (edit) {
			return `<a class="btn-cust-2" data-bs-toggle="collapse"
				href="#${key}Collapse${index}" role="button"
				aria-expanded="false" aria-controls="${key}Collapse${index}">
				<i class="fa-solid fa-pen-to-square"></i>
			</a>`
		} else {
			return ''; // No edit button
		}
	}
	// input type check and reutn
	inputCheck(input, type, key, value, listedIndex) {
		if (input) {
			switch (input) {
				// text input
				case "text": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// number input
				case "number": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// email input
				case "email": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// tel input
				case "tel": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// select option input
				case "select": return `
				<select type="${type}" class="mb-2 mt-2 form-select"
					id="${key}" name="${key}"
					value="${value}">
					${this.selectOptions(listedIndex)}
				</select>`

				// checkBox input
				case "check": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// text area
				case "area": return `
				<textarea type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}">${value}
				</textarea>`

				// date input
				case "date": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`

				// time input
				case "time": return `
				<input type="${type}" 
					class="form-control mb-2 mt-2" 
					id="${key}" 
					name="${key}"
					value="${value}">`
			}
		} else {
			return ""
		}

	}
	// for select input options
	selectOptions(index) {
		let returningElement = ""
		this.keyValueData[index].optionsList.forEach((option) => {
			//console.log(option)
			returningElement += `<option value="${option.key}">${option.value}</option>`
		})
		return returningElement
	}
	// Create the main component
	componet(key, value, copy, edit, input, type, index, listedIndex) {


		//KeyValue holder
		const keyValueComponent = document.createElement("div")
		keyValueComponent.classList.add("col-12", "mt-2")

		//componet inners
		keyValueComponent.innerHTML = `
		<div class="row mt-2 mb-2">
			<div class="col-8">
				<p class="p-b">${key}:
					<br><i class="p-lg mt-2">${value}</i>
				</p>
			</div>
			<div class="col-2">
				${this.editCheck(edit, key, index)}
			</div>
			<div id="copyCol${index}" class="col-2">
				<!-- Place holder for the copy button --!>   
			</div>
			<div class="col-12">
				<div class="collapse item-collaps" id="${key}Collapse${index}">
				${this.inputCheck(input, type, key, value, listedIndex)}
				</div>
			</div>
		</div>
		<hr>
		`

		if (copy) {
			{
				const copyBtn = this.createCopyButton(key, value);
				keyValueComponent.querySelector(`#copyCol${index}`).appendChild(copyBtn); // Append dynamically created button
			}
		}

		return keyValueComponent
	}
	copyInputValue(copyInput) {

		// Copy the text inside the text field
		navigator.clipboard.writeText(copyInput).then(() => {
			// Show success message
			this.alerts.notice('Text copied to clipboard!');
		})

	}
}

