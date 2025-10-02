export default function lastSync(date) {
	const now = new Date();
	const inputDate = new Date(date);
	const diffInSeconds = Math.floor((now - inputDate) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInSeconds < 60) {
		return "just now";
	} else if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
	} else if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
	} else {
		return inputDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
}
