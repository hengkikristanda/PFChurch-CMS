function formatDate(inputDateStr) {
	const inputDate = new Date(inputDateStr);

	if (isNaN(inputDate.getTime())) {
		return "Invalid Date";
	}

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const formattedDate = inputDate.toLocaleString("en-US", {
		weekday: "short",
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	const dayOfWeek = daysOfWeek[inputDate.getDay()];

	// Replace the abbreviated day of the week with the full day
	const formattedDateTime = formattedDate.replace(dayOfWeek, `${dayOfWeek}`);

	return formattedDateTime;
}

function sortByKey(array, key, order) {
	return array.sort((a, b) => {
		const aValue = a[key];
		const bValue = b[key];

		if (order === "asc") {
			if (aValue < bValue) {
				return -1;
			}
			if (aValue > bValue) {
				return 1;
			}
			return 0;
		} else if (order === "desc") {
			if (aValue > bValue) {
				return -1;
			}
			if (aValue < bValue) {
				return 1;
			}
			return 0;
		} else {
			// Invalid order, return unsorted array
			return 0;
		}
	});
}
