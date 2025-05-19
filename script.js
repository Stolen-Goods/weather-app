const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const cityInfoContainer = document.querySelector(".text-container");
const searchContainer = document.querySelector(".search-container");

async function resolve(location) {
  try {
    const weather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HQ24UBAS9HSNB2D4S2RMK2JJ9`
    );
    const weatherData = await weather.json();
    const { feelslike, conditions, precip, snow } =
      weatherData.currentConditions;
    const { address } = weatherData;
    const cityData = document.createElement("div");
    cityData.innerHTML = `
    <h1>${address}</h1>
    <h3>${feelslike}*F</h3>
    <img src=${
      conditions === "Clear"
        ? "https://media.tenor.com/XImGzqlnkNIAAAAj/sun-smile.gif"
        : "https://media.tenor.com/7ymwjVfhJPwAAAAi/clouds-happy.gif"
    } width="350px" height="auto">
    `;
    cityInfoContainer.appendChild(cityData);
    console.log(weatherData);
  } catch {}
}

searchBtn.addEventListener("submit", () => {
  resolve(searchBar.value);
});
