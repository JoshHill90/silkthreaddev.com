export default class AddVariable {
	constructor(Manager) {
		this.manager = Manager
		this.addVariableRow = null
		this.addVariableCard = null

	}

	async init() {
		this.addVariableRow = document.getElementById("addVariableRow")
		this.addVariableCard = document.getElementById("addVariableCard")
	}

	show() {
		this.addVariableCard.hidden = false

	}

	hide() {
		this.addVariableCard.hidden = true
	}

	add(variableIndex) {
		this.show()

		const col = document.createElement("div")




		col.classList.add("col", "task", "task-pare")
		col.innerHTML = `
			<div class="row">
				<div class="col-10">
					<input class="form-control mt-2"  placeholder="Replacement Key" type="text" id="vKey${variableIndex}">

					<input class="form-control mt-2" placeholder="Replacement Value" type="text" id="vValue${variableIndex}" disabled>
					<input id="kvp${variableIndex}" class="ValueVar" type="text" hidden>
				</div>
				<div class="col-2">
					<button type="button" class="btn-task" id="btnKey${variableIndex}"> 
						<i class="fa-solid fa-xmark"></i>
					</button>
				</div>
			<div>

		`


		this.addVariableRow.appendChild(col)
		this.removeTaskBtn(variableIndex)
		this.inputListeners(variableIndex)
	}

	removeTaskBtn(id) {
		const button = document.getElementById(`btnKey${id}`)
		button.addEventListener("click", () => {
			button.closest(".task-pare").remove();
		})
		return
	}

	inputListeners(id) {
		const inputKey = document.getElementById(`vKey${id}`)

		const inputValue = document.getElementById(`vValue${id}`)
		inputKey.addEventListener("input", () => {
			inputValue.disabled = false
		})

		inputValue.addEventListener("input", () => {
			if (inputKey.value.trim() == "") {
				return
			}
			const jsonString = `{"${inputKey.value}": "${inputValue.value}"}`;
			document.getElementById(`kvp${id}`).value = jsonString
		})
		return
	}
}