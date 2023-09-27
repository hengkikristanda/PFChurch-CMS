function renderPage() {
	const previewContentData = localStorage.getItem("previewContentData");
	const content = JSON.parse(previewContentData);

	const container = document.querySelector("#container");

	container.innerHTML = content.htmlContent;

	if (content.ctaButton && content.ctaButton !== "") {
		const buttonContainer = document.createElement("div");
		buttonContainer.classList.add("d-flex", "justify-content-center", "align-items-center");

		const ctaButton = document.createElement("a");
		ctaButton.textContent = content.ctaButton;
		ctaButton.href = content.ctaButtonLink;
		ctaButton.setAttribute("target", "_blank");
		ctaButton.classList.add("btn", "btn-success", "fw-bold", "rounded-0", "fs-5", "mb-5", "btn-lg");

		buttonContainer.appendChild(ctaButton);
		container.appendChild(buttonContainer);
	}
}

function onLoad() {
	renderPage();
}

window.addEventListener("load", onLoad);
