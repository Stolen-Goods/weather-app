const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const cityInfoContainer = document.querySelector(".text-container");
const searchContainer = document.querySelector(".search-container");
const fahrenheitBtn = document.getElementById("fahrenheit");
const celsiusBtn = document.getElementById("celsius");
const loader = document.querySelector(".loader");
let degreeUnit = "f";

async function resolve(location) {
  cityInfoContainer.innerHTML = "<div class='loader'></div>";
  try {
    const weather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=HQ24UBAS9HSNB2D4S2RMK2JJ9`
    );
    const weatherData = await weather.json();
    const { feelslike, conditions } = weatherData.currentConditions;
    const { address } = weatherData;
    let weatherCondition = "";
    cityInfoContainer.innerHTML = "";

    if (
      conditions.toLowerCase().includes("clear") ||
      conditions.toLowerCase().includes("sunshine")
    ) {
      weatherCondition =
        "https://media.tenor.com/XImGzqlnkNIAAAAj/sun-smile.gif";
    } else if (conditions.toLowerCase().includes("snow")) {
      weatherCondition =
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXYwbXhyZTNmcHRkZTMzdXp3YWM2YjkxcDUyMGxvdXRvNWVteGFlMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iq3nJr0SbPTcDpInRf/giphy.webp";
    } else if (
      conditions.toLowerCase().includes("rain") ||
      conditions.toLowerCase().includes("precip")
    ) {
      weatherCondition =
        "https://media.tenor.com/YefQKTdi3hUAAAAm/rafsdesign-rafsdesigns.webp";
    } else if (
      conditions.toLowerCase().includes("cloud") ||
      conditions.toLowerCase().includes("overcast")
    ) {
      weatherCondition =
        "https://media.tenor.com/7ymwjVfhJPwAAAAi/clouds-happy.gif";
    } else {
      weatherCondition =
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWg0bnR1ZW05Mm15aGs1Y3hnODh5MDdoMHliMXBybXFybmNmd3doayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9u1J84ZtCSl9K/200.webp";
    }

    const cityData = document.createElement("div");
    if (degreeUnit === "f") {
      cityData.innerHTML = `
      <h1>${address}</h1>
      <h3>${Math.trunc(feelslike)}°F</h3>
      <img src=${weatherCondition} width="350px" height="auto">
      `;
      cityInfoContainer.appendChild(cityData);
    }
    if (degreeUnit === "c") {
      cityData.innerHTML = `
      <h1>${address}</h1>
      <h3>${celsiusConversion(feelslike)}°C</h3>
      <img src=${weatherCondition} width="350px" height="auto">
      `;
      cityInfoContainer.appendChild(cityData);
    }
    searchBar.value = "";
  } catch {
    const errMsg = new Error("Input a proper city name");
    alert(errMsg);
    cityInfoContainer.innerHTML = "";
  }
}

searchBtn.addEventListener("click", () => {
  resolve(searchBar.value);
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    resolve(searchBar.value);
  }
});

fahrenheitBtn.addEventListener("click", () => {
  fahrenheitBtn.classList.add("selected");
  celsiusBtn.classList.remove("selected");
  degreeUnit = "f";
});

celsiusBtn.addEventListener("click", () => {
  fahrenheitBtn.classList.remove("selected");
  celsiusBtn.classList.add("selected");
  degreeUnit = "c";
});

function celsiusConversion(fahrenheit) {
  return Math.trunc((fahrenheit - 32) / 1.8);
}
