/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */


var areas = [];

searchRecipes("chicken"); // Example search query
getAreas(); // Fetch areas
function searchRecipes(recipes) {
 var http = new XMLHttpRequest();
 http.open("GET", "https://nutriplan-api.vercel.app/api/meals/search?q=" + recipes + "&page=1&limit=25", true);
 http.send();
 http.onreadystatechange = function() {
   if (http.readyState == 4 && http.status == 200) {
     var response = JSON.parse(http.responseText);
     console.log(response.results); // Log the results to the console
   }
 };
}

function getAreas(){
 var http = new XMLHttpRequest();
 http.open("GET", "https://nutriplan-api.vercel.app/api/meals/areas", true);
 http.send();
 http.onreadystatechange = function() {
   if (http.readyState == 4 && http.status == 200) {
     var response = JSON.parse(http.responseText);
     areas = response.results.slice(0, 10); // Get the first 10 areas
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
            >
              ${area.name}
            </button>`;
  }
  return areasContainer;    
}