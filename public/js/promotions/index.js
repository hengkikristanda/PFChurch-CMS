// promotion.js
function fetchDataAndRender() {
	fetch("/routes/promotions")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((promotions) => {
			if (promotions.length > 0) {
				localStorage.setItem("tempData", JSON.stringify(promotions));

				const nodataPlaceholder = document.getElementById("nodataPlaceholder");
				nodataPlaceholder.classList.add("d-none");

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

						const { imageData } = item;
						if (imageData != null) {
							const uint8Array = new Uint8Array(imageData.data);
							const blob = new Blob([uint8Array]);
							const fileReader = new FileReader();
							fileReader.onload = function () {
								const base64String = fileReader.result.split(",")[1];
								image.src = `data:image/png;base64,${base64String}`;
							};
							fileReader.readAsDataURL(blob);
						} else {
							image.src = "https://placehold.co/600x400";
						}
						image.style.objectFit = "cover";
						image.style.setProperty("min-height", "12rem");
						image.style.setProperty("max-height", "12rem");
						image.style.setProperty("max-width", "100%");

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
						cardFooter.textContent = formatDate(item.modifiedDate);

						linkContainer.appendChild(image);
						linkContainer.appendChild(cardHeader);
						linkContainer.appendChild(cardFooter);
						innerContainer.classList.remove("custom-height", "align-items-center");
						innerContainer.replaceChild(linkContainer, loadingElement);
						promotionItemContainer.appendChild(innerContainer);
					}, 500);
				});
			}
		})
		.catch((error) => {
			console.error("Error fetching and rendering page[promotions]:", error);
		});
}

function rerender(promotions) {
	if (promotions.length > 0) {
		const promotionItemContainer = document.getElementById("promotionItemContainer");
		promotionItemContainer.innerHTML = "";
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

			const linkContainer = document.createElement("a");
			linkContainer.classList.add("card", "flex-fill");
			linkContainer.setAttribute("href", "detail.html?id=" + item.id);

			const image = document.createElement("img");
			image.classList.add("card-img-top");

			let imageSource = item.imageSource;
			if (item.imageSource && !item.imageSource.startsWith("https")) {
				imageSource = "/img/uploads/" + item.imageSource;
			}
			image.setAttribute("src", imageSource);
			image.style.objectFit = "cover";
			image.style.setProperty("min-height", "12rem");
			image.style.setProperty("max-height", "12rem");
			image.style.setProperty("max-width", "100%");

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
			cardFooter.textContent = formatDate(item.modifiedDate);

			linkContainer.appendChild(image);
			linkContainer.appendChild(cardHeader);
			linkContainer.appendChild(cardFooter);
			innerContainer.classList.remove("custom-height", "align-items-center");
			innerContainer.replaceChild(linkContainer, loadingElement);
			promotionItemContainer.appendChild(innerContainer);
		});
	}
}

function handleSorting() {
	const sortCriteria = this.value;

	let cacheData = localStorage.getItem("tempData");
	if (cacheData !== null) {
		cacheData = JSON.parse(cacheData);
		let orderBy = "title";
		let orderType = "asc";
		if (sortCriteria === "titleDesc") {
			orderType = "desc";
		} else if (sortCriteria === "dateNewest") {
			orderBy = "modifiedDate";
			orderType = "desc";
		} else if (sortCriteria === "dateOldest") {
			orderBy = "modifiedDate";
		}
		const sortedData = sortByKey(cacheData, orderBy, orderType);
		rerender(sortedData);
	}
}

function onLoad() {
	fetchDataAndRender();

	const sortContent = document.getElementById("sortContent");
	sortContent.addEventListener("change", handleSorting);
}

// Call the function to fetch and render data when the page loads
window.addEventListener("load", onLoad);
