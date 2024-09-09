export default class Animation {
	constructor() {
		this.leftSlide = document.querySelectorAll(".left-slide")
		this.upSlide = document.querySelectorAll(".up-slide")
		this.rightSlide = document.querySelectorAll(".right-slide")
		this.fadeSlide = document.querySelectorAll(".fade-slide")
	}
	init() {

		this.upSlide.forEach((el) => observer.observe(el))
		this.leftSlide.forEach((el) => observer.observe(el))
		this.rightSlide.forEach((el) => observer.observe(el))
		this.fadeSlide.forEach((el) => observer.observe(el))

	}

}

const observer = new IntersectionObserver((entries) => {
	entries.forEach(element => {
		if (element.isIntersecting) {
			setTimeout(() => {
				element.target.classList.add('show');
				element.target.classList.remove('hide');
			}, 300); // 500 milliseconds delay
		} else {
			setTimeout(() => {
				element.target.classList.remove('show');
				element.target.classList.add('hide');
			}, 300); // 500 milliseconds delay
		}
	});
});


