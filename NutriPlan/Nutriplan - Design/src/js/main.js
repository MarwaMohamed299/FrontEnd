var areas = [];
var meelsResults = [];
var homesearchInput = document.querySelector("#searchInput");
getAreas();
getMeelCategory();
searchRecipes(homesearchInput?.value || "chicken");
homesearchInput.addEventListener("change", function () {
    console.log("Input changed:", homesearchInput.value);
    searchRecipes(homesearchInput.value);
});

document.querySelector("#Area").addEventListener("click", filterRecipes);
document.querySelector("#categories-grid").addEventListener("click", filterRecipes);

function searchRecipes(searchInput) {
    console.log("Searching for recipes with query:", searchInput); // Log the search query
    loadRecipes(`https://nutriplan-api.vercel.app/api/meals/search?q=${encodeURIComponent(searchInput)}&page=1&limit=25`);
}

function filterRecipes(event) {
    var filter = event.target.closest("[data-filter]");
    if (!filter) return;
    loadRecipes(`https://nutriplan-api.vercel.app/api/meals/filter?${filter.dataset.filter}=${encodeURIComponent(filter.dataset.value)}&limit=25`);
}

function loadRecipes(url) {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    let meelsContainer = document.querySelector("#meels");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var response = JSON.parse(http.responseText);
            meelsResults = response.results;
            document.querySelector("#recipes-count").textContent = `Showing ${meelsResults.length} recipes`;
            meelsContainer.innerHTML = "";
            for (let meel in meelsResults) {
                meelsContainer.innerHTML += `<div
                class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-meal-id="${meelsResults[meel].id}"
              >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meelsResults[meel].thumbnail}"
                  alt="${meelsResults[meel].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meelsResults[meel].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meelsResults[meel].area ?? "International"}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                ${meelsResults[meel].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meelsResults[meel].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meelsResults[meel].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meelsResults[meel].area ?? "International"}
                  </span>
                </div>
              </div>
              </div>`;
            }
            console.log(meelsResults);
        }
    };
}

function getAreas() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://nutriplan-api.vercel.app/api/meals/areas", true);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var response = JSON.parse(http.responseText);
            areas = response.results.slice(0, 10);
            document.querySelector("#Area").innerHTML = displayAreas(areas);
            console.log(areas);
        }
    };
}

function displayAreas(areas) {
    let areasContainer = ``;
    for (var area of areas) {
        areasContainer += `<button
              class="px-4 pl-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-filter="area"
              data-value="${area.name}"
            >
              ${area.name}
            </button>`;
    }
    return areasContainer;
}

function getMeelCategory() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://nutriplan-api.vercel.app/api/meals/categories", true);
    http.send();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var response = JSON.parse(http.responseText);
            var meelsResults = response.results;
            console.log("Fetching meals for category:", response);
            document.querySelector("#categories-grid").innerHTML = displayMeels(meelsResults);
        }
    };

}

function displayMeels(meels) {
    let meelsContainer = ``;
    console.log("Displaying meals:", meels);
    for (var meel of meels) {
        meelsContainer += `<div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-filter="category"
              data-value="${meel.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${meel.name}</h3>
                </div>
              </div>
            </div>`;
    }
    return meelsContainer;
}

var currentPage = new URLSearchParams(location.search).get("page") || "home";

document.querySelectorAll("[data-page]").forEach(function (page) {
  page.classList.toggle("hidden", page.dataset.page !== currentPage);
});
