function getImageLogoComponent() {
	const imageLogo = document.createElement("img");
	imageLogo.classList.add("me-2");
	imageLogo.src = "/img/logo-transparent.png";
	imageLogo.width = "180";
	return imageLogo;
}

function getsideBarBrandContainerContainer() {
	const sideBarBrandContainer = document.createElement("a");
	sideBarBrandContainer.classList.add("sidebar-brand");
	sideBarBrandContainer.href = "index.html";
	return sideBarBrandContainer;
}

function getSideBarMenuListContainer() {
	const sideBarNav = document.createElement("ul");
	sideBarNav.classList.add("sidebar-nav");
	sideBarNav.id = "sidebar-nav";
	return sideBarNav;
}

function getSideBarItemHeader(itemHeaderLabel) {
	const itemHeader = document.createElement("li");
	itemHeader.classList.add("sidebar-header");
	itemHeader.textContent = itemHeaderLabel;
	return itemHeader;
}

function getMenuItem(menuLabel, menuLink, menuClass, isActive) {
	const listItem = document.createElement("li");
	listItem.classList.add("sidebar-item");
	if (isActive) {
		listItem.classList.add("active");
	}

	const itemLink = document.createElement("a");
	itemLink.classList.add("sidebar-link");
	itemLink.href = menuLink;

	const icon = document.createElement("i");
	menuClass.map((className) => {
		icon.classList.add(className);
	});

	const label = document.createElement("span");
	label.classList.add("align-middle");
	label.textContent = menuLabel;

	itemLink.appendChild(icon);
	itemLink.appendChild(label);

	listItem.appendChild(itemLink);

	return listItem;
}

function renderSideBar(bodyId) {
	// side bar parent element
	const sideBarElement = document.getElementById("sidebar");

	// side bar container
	const sideBarMenuContainer = document.createElement("div");
	sideBarMenuContainer.classList.add("sidebar-content", "js-simplebar");

	// side bar brand component
	const sideBarBrandContainer = getsideBarBrandContainerContainer();
	sideBarBrandContainer.appendChild(getImageLogoComponent());

	// side bar menu list
	sideBarMenuContainer.appendChild(sideBarBrandContainer);

	const sideBarMenuListContainer = getSideBarMenuListContainer();

	fetch("/sidebarMenu")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((jsonData) => {
			menuList = jsonData.sideBarListMenu;
			menuList.map((menuItem) => {
				const itemHeader = getSideBarItemHeader(menuItem.header);

				sideBarMenuListContainer.appendChild(itemHeader);
				menuItem.menu.map((item) => {
					const isActive = bodyId == item.id;
					const itemMenu = getMenuItem(item.label, item.href, item.classList, isActive);
					sideBarMenuListContainer.appendChild(itemMenu);
				});
			});
		})
		.catch((error) => {
			console.error("Fetch Error:", error);
		});

	sideBarMenuContainer.appendChild(sideBarMenuListContainer);
	sideBarElement.appendChild(sideBarMenuContainer);
}

document.addEventListener("DOMContentLoaded", function () {
	const bodyId = document.querySelector("body").getAttribute("id");
	renderSideBar(bodyId);
});
