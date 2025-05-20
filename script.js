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
    let weatherCondition = "";

    if (conditions.toLowerCase().includes("clear")) {
      weatherCondition =
        "https://media.tenor.com/XImGzqlnkNIAAAAj/sun-smile.gif";
    } else if (
      conditions.toLowerCase().includes("cloudy") ||
      conditions.toLowerCase().includes("overcast")
    ) {
      weatherCondition =
        "https://media.tenor.com/7ymwjVfhJPwAAAAi/clouds-happy.gif";
    }

    const cityData = document.createElement("div");
    cityData.innerHTML = `
    <h1>${address}</h1>
    <h3>${feelslike}*F</h3>
    <img src=${weatherCondition} width="350px" height="auto">
    `;
    cityInfoContainer.appendChild(cityData);
    console.log(conditions);
  } catch {}
}

searchBtn.addEventListener("click", () => {
  cityInfoContainer.innerHTML = "";
  resolve(searchBar.value);
  searchBar.value = "";
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    cityInfoContainer.innerHTML = "";
    resolve(searchBar.value);
    searchBar.value = "";
  }
});
