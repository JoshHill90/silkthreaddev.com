document.addEventListener('DOMContentLoaded', () => {
	const carouselContainer = document.querySelector('.carousel-container');
	const carousel = document.querySelector('.carousel');
	const galleryImages = document.querySelectorAll(".carImg");
	const galRec = carousel.getBoundingClientRect();

	// Initialize images outside of the view
	galleryImages.forEach((image) => {
		image.style.transform = `translateX(${galRec.width}px)`;
		image.style.opacity = 0;
	});
	executeImageMoves(galleryImages, galRec);

});

async function executeImageMoves(galleryImages, galRec) {


	for (i = 0; i < galleryImages.length; ++i) {
		galleryImages[i].style.transition = 'all .5s ease-in-out';
		galleryImages[i].style.opacity = 1;
		galleryImages[i].style.transform = 'translateX(0)';

		//console.log(imageObj[i].clientWidth)
		await new Promise((resolve) => {

			setTimeout(() => {


				galleryImages[i].style.transform = `translateX(${galRec.width}px)`;
				galleryImages[i].style.opacity = 0;
				//console.log('re-run')
				resolve();
			}, 5000);

		});
		if (i == (galleryImages.length - 1)) {
			i = -1;
			//imageObj[-1].classList.add('display-off')
		}
		//tempRight.classList.remove('display-off')
	}
	return;
}