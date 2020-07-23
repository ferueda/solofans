export const capitalizeWord = word => word.trim().replace(/^\w/, c => c.toUpperCase());

export const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const getDateDiff = (d1, d2) => {
	const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
	const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());

	return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};
