const observer = new IntersectionObserver((entries) => {
	entries.forEach(element => {
		if (element.isIntersecting) {
			element.target.classList.add('show')
			element.target.classList.remove('hide')
		} else {
			element.target.classList.remove('show')
			element.target.classList.add('hide')
		}
	});
})


const leftSlide = document.querySelectorAll(".left-slide")
const upSlide = document.querySelectorAll(".up-slide")
const rightSlide = document.querySelectorAll(".right-slide")
upSlide.forEach((el) => observer.observe(el))
leftSlide.forEach((el) => observer.observe(el))
rightSlide.forEach((el) => observer.observe(el))