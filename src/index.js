import "./index.scss";

function Gallery(gallery) {
	if (!gallery) {
		throw new Error("No Gallery Found!")
	}

	// select the elements we need
	const images = Array.from(gallery.querySelectorAll("img"))
	const modal = document.querySelector(".modal")
	const prevButton = modal.querySelector(".prev")
	const nextButton = modal.querySelector(".next")
	let currentImage

	function openModal() {
		console.info("Opening modal...")

		// check if modal is already open
		if (modal.matches(".open")) {
			return
		}
		modal.classList.add("open")

		// event listeners to be boud when we open modal
		window.addEventListener("keyup", handleKeyUp)
		nextButton.addEventListener("click", showNextImage)
		prevButton.addEventListener("click", showPrevImage)
	}

	function closeModal() {
		modal.classList.remove("open")

		// add event listeners for next/prev buttons and keyboards
		window.removeEventListener("keyup", handleKeyUp)
		nextButton.removeEventListener("click", showNextImage)
		prevButton.removeEventListener("click", showPrevImage)
	}

	function handleClickOutside(e) {
		// console.log("e.target::", e.target)
		// console.log("e.currentTarget::", e.currentTarget)
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	function handleKeyUp(e) {
		// return - prevents func from running if Esc was clicked... 
		if (e.key === "Escape") return closeModal()
		if (e.key === "ArrowRight") return showNextImage()
		if (e.key === "ArrowLeft") return showPrevImage()
	}

	function showNextImage() {
		showImage(currentImage.nextElementSibling || gallery.firstElementChild)
	}

	function showPrevImage() {
		showImage(currentImage.previousElementSibling || gallery.lastElementChild)
	}

	function showImage(el) {
		if (!el) {
			console.info("No image to show")
			return
		}

		// update the modal with this info
		console.log(el)
		// update the modal with current src, title etc (search for img and set its src to el.src)
		modal.querySelector("img").src = el.src
		modal.querySelector("h2").textContent = el.title
		modal.querySelector("figure p").textContent = el.dataset.description
		currentImage = el
		openModal()
	}

	// event listeners
	images.forEach(image =>
		image.addEventListener("click", (e) => showImage
			(e.currentTarget))
	)

	// add tab and enter functionality
	// loop over each image
	images.forEach(image => {
		// attach event listener for each img
		image.addEventListener("keyup", e => {
			// when that is keyup'd, check if it ws enter
			if (e.key === "Enter") {
				// if it was, show that img
				showImage(e.currentTarget)
			}
		})
	})

	modal.addEventListener("click", handleClickOutside)
}

// use it on the page
const gallery1 = Gallery(document.querySelector(".gallery1"))
const gallery2 = Gallery(document.querySelector(".gallery2"))