let searchInput = document.querySelector("#search-input");
let searchBTN = document.querySelector("#search-btn");
let showMoreBTN = document.querySelector("#showMore-btn");
let resultContainer = document.querySelector(".result-container");
let foot = document.querySelector("#footer");
let noData = document.querySelector(".noData");
let form = document.querySelector("form");

let page = 0;
let keyword = 0;

async function searchImage() {
	keyword = searchInput.value;
	let accesKey = "hP9NGlikkpujuN3PJK6rCEVOxD8G56BinjDC-4ZQeJ4";
	let url = `https://api.unsplash.com/search/collections?page=${page}&per_page=12&query=${keyword}&client_id=${accesKey}`;

	let response = await fetch(url);
	let data = await response.json();

	console.log(data);
	if (data.results && data.results.length > 0) {
		let results = data.results;

		results.forEach((result) => {
			// Image & image link from API
			let image = result.preview_photos[0].urls.small;
			let link = result.links.html;

			// Create image <img> element
			let img = document.createElement("img");
			img.src = image;

			// Create imageLink <a> element
			let imglink = document.createElement("a");
			imglink.href = link;
			imglink.setAttribute("target", "_blank");
			noData.style.display = "none";

			imglink.appendChild(img);
			resultContainer.appendChild(imglink);
		});
		showMoreBTN.style.display = "block";
		foot.style.display = "block";
		noData.style.display = "none";
		console.log("Data Found");
	} else {
		resultContainer.innerHTML = '<p class="noData">No data found</p>';
		showMoreBTN.style.display = "none";
		foot.style.display = "none";
		noData.style.display = "block";

		console.log("No Data");
	}
}

searchBTN.addEventListener("click", (e) => {
	resultContainer.innerHTML = "";
	e.preventDefault();
	page = 1;
	searchImage();
});

showMoreBTN.addEventListener("click", (e) => {
	e.preventDefault();
	page++;
	searchImage();
});
