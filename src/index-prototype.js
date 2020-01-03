import "./index.scss";

function Gallery(gallery) {
	if (!gallery) {
		throw new Error("No Gallery Found!")
	}

	// save the reference for the gallery div that was passed in
	this.gallery = gallery

	// select the elements we need
	this.images = Array.from(gallery.querySelectorAll("img"))
	this.modal = document.querySelector(".modal")
	this.prevButton = this.modal.querySelector(".prev")
	this.nextButton = this.modal.querySelector(".next")

	// bind our methods to the instance when we need them
	this.showNextImage = this.showNextImage.bind(this)
	this.showPrevImage = this.showPrevImage.bind(this)
	this.handleKeyUp = this.handleKeyUp.bind(this)
	this.handleClickOutside = this.handleClickOutside.bind(this)


	// event listeners
	this.images.forEach(image =>
		image.addEventListener("click", (e) => this.showImage
			(e.currentTarget))
	)

	// add tab and enter functionality
	// loop over each image
	this.images.forEach(image => {
		// attach event listener for each img
		image.addEventListener("keyup", e => {
			// when that is keyup'd, check if it ws enter
			if (e.key === "Enter") {
				// if it was, show that img
				this.showImage(e.currentTarget)
			}
		})
	})

	this.modal.addEventListener("click", this.handleClickOutside)
}

Gallery.prototype.openModal = function () {
	console.info("Opening modal...")

	// check if modal is already open
	if (this.modal.matches(".open")) {
		return
	}
	this.modal.classList.add("open")

	// event listeners to be boud when we open modal
	window.addEventListener("keyup", this.handleKeyUp)
	this.nextButton.addEventListener("click", this.showNextImage)
	this.prevButton.addEventListener("click", this.showPrevImage)
}

Gallery.prototype.closeModal = function () {
	this.modal.classList.remove("open")

	// add event listeners for next/prev buttons and keyboards
	window.removeEventListener("keyup", this.handleKeyUp)
	this.nextButton.removeEventListener("click", this.showNextImage)
	this.prevButton.removeEventListener("click", this.showPrevImage)
}

Gallery.prototype.handleClickOutside = function (e) {
	// console.log("e.target::", e.target)
	// console.log("e.currentTarget::", e.currentTarget)
	if (e.target === e.currentTarget) {
		this.closeModal()
	}
}

Gallery.prototype.handleKeyUp = function (e) {
	// return - prevents func from running if Esc was clicked... 
	if (e.key === "Escape") return this.closeModal()
	if (e.key === "ArrowRight") return this.showNextImage()
	if (e.key === "ArrowLeft") return this.showPrevImage()
}

Gallery.prototype.showNextImage = function () {
	console.log(this)
	this.showImage(
		this.currentImage.nextElementSibling || this.gallery.firstElementChild
	)
}

Gallery.prototype.showPrevImage = function () {
	this.showImage(
		this.currentImage.previousElementSibling || this.gallery.lastElementChild
	)
}

Gallery.prototype.showImage = function (el) {
	if (!el) {
		console.info("No image to show")
		return
	}

	// update the modal with this info
	console.log(el)
	// update the modal with current src, title etc (search for img and set its src to el.src)
	this.modal.querySelector("img").src = el.src
	this.modal.querySelector("h2").textContent = el.title
	this.modal.querySelector("figure p").textContent = el.dataset.description
	this.currentImage = el
	this.openModal()
}

// use it on the page
const gallery1 = new Gallery(document.querySelector(".gallery1"))
const gallery2 = new Gallery(document.querySelector(".gallery2"))

console.log(gallery1, gallery2)