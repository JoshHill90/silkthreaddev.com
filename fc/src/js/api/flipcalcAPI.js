import Charts from "../charts/chartManager"


export class FlipAPI {
	constructor(Manager, Loader) {
		this.manager = Manager
		this.loader = Loader

		this.chart = new Charts(this.manager)


		this.total_project_cost = null
		this.hml_loan_amount = null
		this.hml_pints_total = null
		this.hml_interest_total = null
		this.gap_down_payment = null
		this.gap_total_hml_fees = null
		this.gap_loan_amount = null
		this.gap_point_total = null
		this.gap_interest_total = null
		this.tcp_plus_cost = null
		this.tcp_as_percent = null
		this.resale_index = null
		this.gap_share_return = null
		this.gap_share_roi = null
		this.add_profit_min = null
		this.add_projection = null
		this.add_deal = null
		this.add_roi = null
		this.add_breakeven_price = null
		this.add_dscr = null
		this.add_sensitivity_arv_down = null
		this.add_sensitivity_resale_price = null
		this.add_payback_period = null
		this.add_stress_test_result = null
		this.breakdown = null
		this.calc = null

	}

	init() {
		this.chart.init()
		this.total_project_cost = document.getElementById("total_project_cost")
		this.hml_loan_amount = document.getElementById("hml_loan_amount")
		this.hml_pints_total = document.getElementById("hml_pints_total")
		this.hml_interest_total = document.getElementById("hml_interest_total")
		this.gap_down_payment = document.getElementById("gap_down_payment")
		this.gap_total_hml_fees = document.getElementById("gap_total_hml_fees")
		this.gap_loan_amount = document.getElementById("gap_loan_amount")
		this.gap_point_total = document.getElementById("gap_point_total")
		this.gap_interest_total = document.getElementById("gap_interest_total")
		this.tcp_plus_cost = document.getElementById("tcp_plus_cost")
		this.tcp_as_percent = document.getElementById("tcp_as_percent")
		this.resale_index = document.getElementById("resale_index")
		this.gap_share_return = document.getElementById("gap_share_return")
		this.gap_share_roi = document.getElementById("gap_share_roi")
		this.add_profit_min = document.getElementById("add_profit_min")
		this.add_projection = document.getElementById("add_projection")
		this.add_deal = document.getElementById("add_deal")
		this.add_roi = document.getElementById("add_roi")
		this.add_breakeven_price = document.getElementById("add_breakeven_price")
		this.add_dscr = document.getElementById("add_dscr")
		this.add_sensitivity_arv_down = document.getElementById("add_sensitivity_arv_down")
		this.add_sensitivity_resale_price = document.getElementById("add_sensitivity_resale_price")
		this.add_payback_period = document.getElementById("add_payback_period")
		this.add_stress_test_result = document.getElementById("add_stress_test_result")
		this.breakdown = document.getElementById("breakdown")
		this.calc = document.getElementById("calc")
		this.calc.addEventListener("click", async () => {
			this.loader.showLoader()
			await this.getData()
		})
	}

	async getData() {
		await this.constructBody()
		this.manager.fliCalcData = null
		this.manager.fliCalcData = await this.postRequest()
		this.clearValues()
		this.setValues()
		this.loader.hideLoader()
		this.breakdown.classList.remove("hide")
		this.breakdown.classList.add("show")
		document.location.href = "#breakdown"

	}

	async postRequest() {
		try {
			const response = await fetch(this.manager.apiURL + `api/v1/calculate`,
				{
					method: 'POST',
					body: JSON.stringify(this.manager.flipFormData),
					headers: {
						'Authorization': 'Token ' + this.manager.cookie,
						'X-CSRFToken': this.manager.cookie,
						'Content-Type': 'application/json'
					}
				});

			if (!response.ok) {
				this.loader.hideLoader()
				throw new Error(`HTTP error! Status: ${response.status}`);

			}

			const data = await response.json();

			console.log(data)
			return data.data;

		} catch (error) {
			console.error('Error fetching client data:', error);
			this.loader.hideLoader()
			throw error;
		}
	}

	async constructBody() {
		this.manager.projectBreakDown = []
		const purchase_price = document.getElementById('purchase_price').value
		const rehab_budget = document.getElementById('rehab_budget').value
		const closing_cost = document.getElementById('closing_cost').value
		const holding_cost = document.getElementById('holding_cost').value
		this.manager.projectBreakDown.push(purchase_price)
		this.manager.projectBreakDown.push(rehab_budget)
		this.manager.projectBreakDown.push(closing_cost)
		this.manager.projectBreakDown.push(holding_cost)
		this.manager.flipFormData = {
			project_in_months: document.getElementById('project_in_months').value,
			arv: document.getElementById('arv').value,
			purchase_price: purchase_price,
			rehab_budget: rehab_budget,
			closing_cost: closing_cost,
			holding_cost: holding_cost,
			hml_ltv: document.getElementById('hml_ltv').value,
			hml_points: document.getElementById('hml_points').value,
			hml_interest_rate: document.getElementById('hml_interest_rate').value,
			gap_points: document.getElementById('gap_points').value,
			gap_interest_rate: document.getElementById('gap_interest_rate').value,
			interest_type: document.getElementById('interest_type').value,
			commission: document.getElementById('commission').value,
			resale_closing_cost: document.getElementById('resale_closing_cost').value,
			profit_min: document.getElementById('profit_min').value,
			admin_fee: document.getElementById('admin_fee').value,
			gap_equity_share: document.getElementById('gap_equity_share').value,
			gap_equity: document.getElementById('gap_equity').value
		};
	}

	clearValues() {
		this.total_project_cost.innerHTML = ""
		this.hml_loan_amount.innerHTML = ""
		this.hml_pints_total.innerHTML = ""
		this.hml_interest_total.innerHTML = ""
		this.gap_down_payment.innerHTML = ""
		this.gap_total_hml_fees.innerHTML = ""
		this.gap_loan_amount.innerHTML = ""
		this.gap_point_total.innerHTML = ""
		this.gap_interest_total.innerHTML = ""

		this.resale_index.innerHTML = ""
		this.tcp_plus_cost.innerHTML = ""
		this.tcp_as_percent.innerHTML = ""

		this.gap_share_return.innerHTML = ""
		this.gap_share_roi.innerHTML = ""

		this.add_profit_min.innerHTML = ""
		this.add_projection.innerHTML = ""
		this.add_deal.innerHTML = ""
		this.add_roi.innerHTML = ""
		this.add_breakeven_price.innerHTML = ""
		this.add_dscr.innerHTML = ""
		this.add_sensitivity_arv_down.innerHTML = ""
		this.add_sensitivity_resale_price.innerHTML = ""
		this.add_payback_period.innerHTML = ""
		this.add_stress_test_result.innerHTML = ""
	}

	setValues() {

		this.total_project_cost.textContent = `$ ${this.manager.fliCalcData.total_project_cost}`
		//hml

		this.hml_loan_amount.textContent = `$ ${this.manager.fliCalcData.hml.loan_amount}`
		this.hml_pints_total.textContent = `$ ${this.manager.fliCalcData.hml.pints_total}`
		this.hml_interest_total.textContent = `$ ${this.manager.fliCalcData.hml.interest_total}`
		// gap

		this.gap_down_payment.textContent = `$ ${this.manager.fliCalcData.gap.down_payment}`
		this.gap_total_hml_fees.textContent = `$ ${this.manager.fliCalcData.gap.total_hml_fees}`
		this.gap_loan_amount.textContent = `$ ${this.manager.fliCalcData.gap.loan_amount}`
		this.gap_point_total.textContent = `$ ${this.manager.fliCalcData.gap.point_total}`
		this.gap_interest_total.textContent = `$ ${this.manager.fliCalcData.gap.interest_total}`

		//tcp
		this.tcp_plus_cost.textContent = `$ ${this.manager.fliCalcData.tcp.plus_cost}`
		this.tcp_as_percent.textContent = `${this.manager.fliCalcData.tcp.as_percent}%`
		// resale

		this.manager.fliCalcData.resale_index.forEach((resale, index) => {
			const resaleDiv = document.createElement("div")
			resaleDiv.classList.add("row", "mt-2", "mb-2")
			if (index == 4) {
				resaleDiv.classList.add("mid-pick")
			}
			resaleDiv.innerHTML = `
			<hr>
			<div class="col-4">
				<p class="p-b">
				$ ${resale.resale_price}
				</p>
			</div>
			<div class="col-4">
				<p class="p-b">
				$ ${resale.minus_cc}
				</p>
			</div>
			<div class="col-4">
				<p class="p-b">
				$ ${resale.profit}
				</p>
			</div>
			`
			this.resale_index.appendChild(resaleDiv)
		})

		// gap shares
		this.gap_share_return.textContent = `$ ${this.manager.fliCalcData.gap_shares.return}`
		this.gap_share_roi.textContent = `${this.manager.fliCalcData.gap_shares.roi}%`
		// addtional points 
		this.add_profit_min.textContent = `$ ${this.manager.fliCalcData.profit_min}`
		this.add_projection.textContent = `$ ${this.manager.fliCalcData.projection}`
		if (this.manager.fliCalcData.deal == true) {
			this.add_deal.textContent = "It's a Good Deal!"
		} else {
			this.add_deal.textContent = "It's a Bad Deal!"
		}
		// deal chart
		this.chart.dealChart()
		this.chart.resaleIndexChart()
		this.chart.totalProjectCostChart()
		this.add_roi.textContent = this.manager.fliCalcData.roi
		this.add_breakeven_price.textContent = this.manager.fliCalcData.breakeven_price
		this.add_dscr.textContent = this.manager.fliCalcData.dscr
		this.add_sensitivity_arv_down.textContent = this.manager.fliCalcData.sensitivity_arv_down
		this.add_sensitivity_resale_price.textContent = this.manager.fliCalcData.sensitivity_resale_price
		this.add_payback_period.textContent = this.manager.fliCalcData.payback_period
		this.add_stress_test_result.textContent = this.manager.fliCalcData.stress_test_result
	}
}












