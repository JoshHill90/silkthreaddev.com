import { Chart, registerables } from 'chart.js';

export default class Charts {
	constructor(Manager) {
		this.manager = Manager;
		this.dealData = [];
		this.theDealChart = null
		this.theResaleIndexChart = null
		this.theTotalProjectCostChart = null
		this.isMobile = null
	}

	init() {
		Chart.register(...registerables);
		this.isMobile = window.innerWidth <= 768;
		console.log(this.isMobile)
	}

	dealChart() {
		if (this.theDealChart) {
			this.theDealChart.destroy()
		}


		this.constructDealChart();
		this.theDealChart = new Chart(document.getElementById('dealBreakdown'), {
			type: 'bar',
			data: {
				labels: this.dealData.map(row => row.value),
				datasets: [
					{
						label: 'Deal Breakdown In Dollars',
						data: this.dealData.map(row => row.Amount),
						backgroundColor: [
							'rgb(191, 242, 204)',
							'rgb(191, 204, 242)',
							'rgb(242, 191, 229)',
							'rgb(242, 229, 191)',
							'rgb(229, 191, 242)'
						]
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							color: 'rgba(235, 216, 159)' // Y-axis label color
						}
					},
					x: {
						ticks: {
							color: 'black' // X-axis label color
						}
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'top',
						labels: {
							color: 'black', // Text color for legend,
							font: {
								size: this.isMobile ? 10 : 14 // Smaller font size for mobile
							}
						}
					}
				}
			}
		});
	}

	constructDealChart() {
		this.dealData = []
		this.dealData.push({ value: "Total Project Cost", Amount: this.manager.fliCalcData.total_project_cost });
		this.dealData.push({ value: "Profit Minimum", Amount: this.manager.fliCalcData.profit_min });
		this.dealData.push({ value: "Projection", Amount: this.manager.fliCalcData.projection });
		this.dealData.push({ value: "Down Payment", Amount: this.manager.fliCalcData.gap.down_payment });
		this.dealData.push({ value: "TCP Plus Cost", Amount: this.manager.fliCalcData.tcp.plus_cost });
	}

	resaleIndexChart() {
		if (this.theResaleIndexChart) {
			this.theResaleIndexChart.destroy()
		}

		this.theResaleIndexChart = new Chart(document.getElementById('resaleIndexBreakdown'), {
			type: 'line',
			data: {
				labels: this.manager.fliCalcData.resale_index.map((row, index) => `Point ${index + 1}`),
				datasets: [
					{
						label: 'Minus CC',
						data: this.manager.fliCalcData.resale_index.map(row => row.minus_cc),
						borderColor: 'rgba(191, 242, 204)',
						fill: false
					},
					{
						label: 'Profit',
						data: this.manager.fliCalcData.resale_index.map(row => row.profit),
						borderColor: 'rgba(191, 204, 242)',
						fill: false
					},
					{
						label: 'Resale Price',
						data: this.manager.fliCalcData.resale_index.map(row => row.resale_price),
						borderColor: 'rgba(242, 191, 229)',
						fill: false
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							color: 'rgba(235, 216, 159)', // Y-axis label color
							font: {
								size: this.isMobile ? 10 : 14 // Smaller font size for mobile
							}
						}
					},
					x: {
						ticks: {
							color: 'black', // X-axis label 
							font: {
								size: this.isMobile ? 10 : 14 // Smaller font size for mobile
							}
						}
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							color: 'black', // Text color for legend,
							font: {
								size: this.isMobile ? 10 : 14 // Smaller font size for mobile
							}
						}
					}
				}
			}
		});
	}

	totalProjectCostChart() {
		if (this.theTotalProjectCostChart) {
			this.theTotalProjectCostChart.destroy()
		}

		this.theTotalProjectCostChart = new Chart(document.getElementById('totalProjectCost'), {
			type: 'doughnut',
			data: {
				labels: [
					'Purchase Price',
					'Rehab Budget',
					'Closing Cost',
					'Holding Cost'
				],
				datasets: [
					{
						label: 'Total Project Breakdown',
						data: [
							this.manager.projectBreakDown[0],
							this.manager.projectBreakDown[1],
							this.manager.projectBreakDown[2],
							this.manager.projectBreakDown[3],
						],
						backgroundColor: [
							'rgb(191, 242, 204)',
							'rgb(191, 204, 242)',
							'rgb(242, 191, 229)',
							'rgb(242, 229, 191)'
						],
						borderColor: 'rgb(0,5,5, 158)',
						hoverOffset: 1
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							color: 'black', // Text color for legend
							font: {
								size: this.isMobile ? 10 : 14 // Smaller font size for mobile
							}
						}
					}
				}
			}
		});
	}
}
