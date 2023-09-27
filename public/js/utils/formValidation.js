(() => {
	"use strict";

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false
		);
	});
})();

function getFormData() {
	const contentTitle = document.getElementById("promotionTitle");
	const ctaButton = document.getElementById("ctaButton");
	const ctaButtonLink = document.getElementById("callToActionLink");

	let formData = {
		title: contentTitle.value,
		ctaButton: ctaButton.value,
		ctaButtonLink: ctaButtonLink.value,
		content: tinymce.activeEditor.getContent(),
	};
	return JSON.stringify(formData);
}

function validatePreviewData() {
	const promotionTitle = document.getElementById("promotionTitle");
	if (promotionTitle && promotionTitle == "") {
	}
	return true;
}

function handlePreview() {
	const htmlContent = getFormData();
	fetch("/routes/previewContent", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: htmlContent,
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				console.error("Error:", response.status);
			}
		})
		.then((data) => {
			if (data && data.redirectURL) {
				const previewContentData = {
					title: data.title,
					ctaButton: data.ctaButton,
					ctaButtonLink: data.ctaButtonLink,
					htmlContent: data.content,
				};
				localStorage.setItem("previewContentData", JSON.stringify(previewContentData));
				window.open(data.redirectURL, "_blank");
			}
		})
		.catch((error) => {
			console.error("Fetch error:", error);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#previewButton").addEventListener("mouseup", handlePreview);
});
