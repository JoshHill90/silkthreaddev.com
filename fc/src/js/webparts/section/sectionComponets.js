export class SectionKeyValue {
	constructor() {
		this.keyValueData = null
		this.parentElemnt = null
	}

	// start
	init(dataSet, element) {
		this.keyValueData = dataSet
		this.parentElemnt = element
	}

	// set the elements in place
	set() {
		this.keyValueData.forEach((data, dataIndex) => {
			const sectionComponet = this.componet(data.key, data.value, data.copy, data.edit, data.input, data.type, dataIndex)
			this.parentElemnt.appendChild(sectionComponet)
		})
	}

	//clear the section
	clear() {
		this.parentElemnt.innerHTML = ""
	}

	// copy option 
	copyCheck(key, copy) {
		if (copy) {
			return `<a class="btn-cust-2">
			<i class="fa-solid fa-copy" id="${key}copy"></i>
		</a>`;
		} else {
			return ''; // No copy button
		}
	}

	// edit option
	editCheck(edit, key) {
		if (edit) {
			return `<a class="btn-cust-2" data-bs-toggle="collapse"
				href="#${key}Collapse" role="button"
				aria-expanded="false" aria-controls="${key}Collapse">
				<i class="fa-solid fa-pen-to-square"></i>
			</a>`
		} else {
			return ''; // No edit button
		}
	}
	// input type check and reutn
	inputCheck(input, type, key, index) {
		if (input) {
			switch (input) {
				// text input
				case "text": return `
				<input type="${type}" 
					class="form-control" 
					id="${key}" 
					name="${key}">`

				// select option input
				case "select": return `
				<select type="${type}" class="mb-3 form-select"
					id="${key}" name="${key}">
					${this.selectOptions(index)}
				</select>`

				// checkBox input
				case "check": return `
				<input type="${type}" 
					class="form-control" 
					id="${key}" 
					name="${key}">`

				// text area
				case "area": return `
				<input type="${type}" 
					class="form-control" 
					id="${key}" 
					name="${key}">`
			}
		} else {
			return ""
		}

	}
	// for select input options
	selectOptions(index) {
		let returningElement = ""
		this.keyValueData[index].optionsList.forEach((option) => {
			returningElement += `<option value="${option}">.com</option>`
		})
		return returningElement
	}
	// Create the main component
	componet(key, value, copy, edit, input, type, index) {
		//KeyValue holder
		const keyValueComponet = document.createElement("div")
		keyValueComponet.classList.add("col-12", "mt-2")
		//componet inners
		keyValueComponet.innerHTML = `
		<div class="row">
			<div class="col-8">
				<p class="p-b">${key}:
					<i class="p-lg">${value}</i>
				</p>
			</div>
			<div class="col-2">
				${this.editCheck(edit, key)}
			</div>
			<div class="col-2">
				${this.copyCheck(copy, key)}
			</div>
			<div class="col-12">
				<div class="collapse" id="${key}Collapse">
				${this.inputCheck(input, type, key, index)}
				</div>
			</div>
		</div>`
		return keyValueComponet
	}
}