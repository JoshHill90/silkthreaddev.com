export class SectionKeyValue {
	constructor() {
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
			const indexID = `${this.uni}${dataIndex}`
			const sectionComponet = this.componet(data.key, data.value, data.copy, data.edit, data.input, data.type, indexID, dataIndex)
			this.parentElemnt.appendChild(sectionComponet)
		})
	}

	//clear the section
	clear() {
		this.parentElemnt.innerHTML = ""
	}

	// copy option 
	copyCheck(copy, key) {

		if (copy) {
			return `<a class="btn-cust-2">
			<i class="fa-solid fa-copy" id="${key}copy"></i>
		</a>`;
		} else {
			return ''; // No copy button
		}
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
			console.log(option)
			returningElement += `<option value="${option.key}">${option.value}</option>`
		})
		return returningElement
	}
	// Create the main component
	componet(key, value, copy, edit, input, type, index, listedIndex) {
		//console.log(index)
		//KeyValue holder
		const keyValueComponet = document.createElement("div")
		keyValueComponet.classList.add("col-12", "mt-2")
		//componet inners
		keyValueComponet.innerHTML = `
		<div class="row mt-2 mb-2">
			<div class="col-8">
				<p class="p-b">${key}:
					<i class="p-lg">${value}</i>
				</p>
			</div>
			<div class="col-2">
				${this.editCheck(edit, key, index)}
			</div>
			<div class="col-2">
				${this.copyCheck(copy, key)}
			</div>
			<div class="col-12">
				<div class="collapse item-collaps" id="${key}Collapse${index}">
				${this.inputCheck(input, type, key, value, listedIndex)}
				</div>
			</div>
		</div>`
		return keyValueComponet
	}
}