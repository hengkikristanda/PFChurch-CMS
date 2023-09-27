//Promotion.app.js

function fetchDataAndRender() {
	fetch("/routes/promotions") // Replace with your actual API endpoint
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((promotions) => {
			const promotionItemContainer = document.getElementById("promotionItemContainer");
			promotions.map((item) => {
				const loadingElement = document.createElement("div");
				loadingElement.classList.add("loader");

				const innerContainer = document.createElement("div");
				innerContainer.classList.add(
					"col",
					"col-md-3",
					"col-sm-12",
					"d-flex",
					"justify-content-center",
					"custom-height",
					"align-items-center"
				);
				innerContainer.appendChild(loadingElement);

				promotionItemContainer.appendChild(innerContainer);

				setTimeout(() => {
					const linkContainer = document.createElement("a");
					linkContainer.classList.add("card", "flex-fill");
					linkContainer.setAttribute("href", "detail.html?id=" + item.id);

					const image = document.createElement("img");
					image.classList.add("card-img-top");
					image.setAttribute("src", "/assets/promotions/" + item.imageSource);

					const cardHeader = document.createElement("div");
					cardHeader.classList.add("card-header");

					const cardTitle = document.createElement("h5");
					cardTitle.classList.add("card-title", "truncate");
					cardTitle.textContent = item.title;

					const span = document.createElement("span");
					span.classList.add("badge", item.className);
					span.textContent = item.contentStatus;

					cardHeader.appendChild(cardTitle);
					cardHeader.appendChild(span);

					const cardFooter = document.createElement("div");
					cardFooter.classList.add("card-footer", "text-body-secondary");
					cardFooter.textContent = "2 Days Ago";

					linkContainer.appendChild(image);
					linkContainer.appendChild(cardHeader);
					linkContainer.appendChild(cardFooter);

					innerContainer.classList.remove("custom-height", "align-items-center");
					innerContainer.replaceChild(linkContainer, loadingElement);

					promotionItemContainer.appendChild(innerContainer);
				}, 500);
			});
		})
		.catch((error) => {
			console.error("Error fetching and rendering promotions:", error);
		});
}

function initPageTitle() {
	const pageTitle = document.querySelector("#pageTitle");

	const badge = document.createElement("span");
	badge.classList.add("badge", "bg-primary");
	badge.textContent = "New";

	pageTitle.appendChild(badge);
}

function onLoad() {
	initPageTitle();
}

// Call the function to fetch and render data when the page loads
window.addEventListener("load", onLoad);
