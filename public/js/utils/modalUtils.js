// Get the modal and buttons
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementsByClassName("openModal");
const closeModalBtn = document.getElementById("closeModal");

for (let n = 0; n < openModalBtn.length; n++) {
	// When the user clicks the "Open Modal" link, display the modal
	openModalBtn[n].addEventListener("click", function () {
		const modalTitle = document.getElementById("modalTitle");
		const modalInput = document.getElementById("modal-input-container");
		const action = this.getAttribute("data-action");
		const saveBtn = document.getElementById("saveBtn");
		const message = document.getElementById("message");

		const clickedRow = this.closest("tr");
		const name = clickedRow.querySelector("td:nth-child(3)").textContent;
		const link = clickedRow.querySelector("td:nth-child(4)").textContent;
		const contentType = clickedRow.querySelector("td:nth-child(5)");

		if (action && action === "delete") {
			modalTitle.textContent = "Delete Confirmation";

			saveBtn.textContent = "Yes";
			saveBtn.classList.remove("btn-primary");
			saveBtn.classList.add("fw-bold", "text-primary");

			modalInput.classList.add("d-none");

			message.classList.remove("d-none");

			const dataName = document.getElementById("dataName");
			dataName.textContent = name;

			const dataValue = document.getElementById("dataValue");
			dataValue.textContent = link;
		} else if (action && action === "edit") {
			modalTitle.textContent = "Edit Contact Info";

			saveBtn.textContent = "Update";
			saveBtn.classList.remove("text-primary");
			saveBtn.classList.add("btn-primary");

			modalInput.classList.remove("d-none");

			message.classList.add("d-none");

			const formControlContactName = document.getElementById("formControlContactName");
			formControlContactName.value = name;

			const formControlWaNumber = document.getElementById("formControlWaNumber");
			formControlWaNumber.value = link;

			const formControlContactType = document.getElementById("formControlContactType");
			formControlContactType.value = contentType.getAttribute("data-value");
		}
		modal.style.display = "block";
	});
}

// When the user clicks the close button or anywhere outside the modal, close it
closeModalBtn.addEventListener("click", function () {
	modal.style.display = "none";
});

window.addEventListener("click", function (event) {
	if (event.target === modal) {
		// modal.style.display = "none";
	}
});

// Handle form submission
const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	// Retrieve form values
	const name = document.getElementById("name").value;
	const address = document.getElementById("address").value;
	const location = document.getElementById("location").value;

	// You can use these values for further processing
	console.log("Name:", name);
	console.log("Address:", address);
	console.log("Location:", location);

	// Close the modal
	modal.style.display = "none";
});
