
import { apiURL } from "../main";
import defaultGetCookie from "../auth/siteCookie";
import AutomationAPI from "./api/automationAPI";
import NewTaskForm from "./comp/newTask/newTask";
import EmailTemplates from "./comp/emailTemplates/emailTemplates";
import Templates from "./comp/emailTemplates/templates";
import Task from "./comp/task/task";
import EmailList from "./comp/emailList/emailList";
import NewContactList from "./comp/emailList/newEmailList";
import { pageLoader } from "../loader/loader";
import AlertsNotifications from "../alerts/alerts";
import NewEmailList from "./comp/sendEmailList/newSendEmailList";
import SendEmailList from "./comp/sendEmailList/sendEmailList";
// client objects manager 
class AutomationManager {
	constructor() {
		this.apiURL = null
		this.cookie = null
		this.emailClientList = []
		this.emailTemplateList = []
		this.taskList = []
		this.paramList = []
		this.internalUserList = []
		this.internalGroupList = []
		this.emailsenderList = []
	}
}

class Automation {
	constructor() {
		this.pageLoader = new pageLoader()
		this.manager = new AutomationManager()
		this.alerts = new AlertsNotifications()
		this.api = new AutomationAPI(this.manager)
		this.contactList = new EmailList(this.manager, this.api, this.alerts)
		this.templates = new Templates(this.manager, this.api, this.alerts)
		this.task = new Task(this.manager, this.api, this.alerts)
		this.newTaskForm = new NewTaskForm(this.manager, this.api, this.alerts)
		this.newContactForm = new NewContactList(this.manager, this.api, this.alerts)
		this.newEmailTemplates = new EmailTemplates(this.manager, this.api, this.alerts)
		this.newEmailList = new NewEmailList(this.manager, this.api, this.alerts)
		this.sendEmailList = new SendEmailList(this.manager, this.api, this.alerts)
	}

	// initiate the client page
	async init() {
		//loading
		this.pageLoader.init()
		this.pageLoader.showLoader()

		//set up api site and cookie
		this.manager.apiURL = apiURL
		this.manager.cookie = defaultGetCookie()
		// set up key 
		await this.newEmailList.init()
		await this.sendEmailList.init()
		await this.contextData()
		await this.contactList.init()
		await this.templates.init()
		await this.task.init()
		await this.newEmailTemplates.init()
		await this.newTaskForm.init()
		await this.newContactForm.init()

		// initiate componets and build

		await this.build()

		this.listeners()
		// hide loader
		this.pageLoader.hideLoader()
	}

	listeners() {
		// form submit button 
		this.newTaskForm.newTaskForm.addEventListener("submit", async (event) => {
			event.preventDefault(); // Prevent the form from submitting normally
			this.pageLoader.showLoader()
			const newTaskStatus = await this.newTaskForm.post()
			if (newTaskStatus == "success") {
				this.reloadData()
				this.newTaskForm.clearForm()
				document.getElementById("createTaskCollapse").classList.remove("show")
				this.alerts.notice("New Task Added!")
			}
			this.pageLoader.hideLoader()

		});
		// submit new contact form
		this.newContactForm.contactForm.addEventListener("submit", async (tempForm) => {
			tempForm.preventDefault()
			this.pageLoader.showLoader()
			await this.newContactForm.post()
			this.reloadData()
			this.newContactForm.clearForm()
			this.pageLoader.hideLoader()
		})

		// submit new email template
		this.newEmailTemplates.templateForm.addEventListener("submit", async (tempForm) => {
			tempForm.preventDefault()
			this.pageLoader.showLoader()
			await this.newEmailTemplates.post()
			this.reloadData()
			this.newEmailTemplates.clearForm()
			this.pageLoader.hideLoader()
		})

		this.newEmailList.emailListForm.addEventListener("submit", async (tempForm) => {
			tempForm.preventDefault()
			this.pageLoader.showLoader()
			await this.newEmailList.post()
			this.newEmailList.clearForm()
			this.newEmailList.clearList()
			this.reloadData()
			this.pageLoader.hideLoader()
		})
	}

	async contextData() {
		// set context list
		const context = await this.api.getTaskContext()
		context.client_list.forEach((userData) => {
			this.manager.internalUserList.push(userData)
		})
		context.group_list.forEach((groupData) => {
			this.manager.internalGroupList.push(groupData)
		})

	}

	reloadData() {
		this.contactList.clear()
		this.templates.clear()
		this.task.clear()
		this.sendEmailList.clear()
		this.build()
	}

	async build() {
		this.contactList.componet()
		this.templates.componet()
		this.task.componet()
		this.sendEmailList.componet()
	}

}

document.addEventListener("DOMContentLoaded", () => {
	const automation = new Automation();
	automation.init();
});