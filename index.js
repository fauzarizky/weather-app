document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "df79d518361285cfb3dc00a1beff96dd";
  const searchBtn = document.getElementById("searchBtn");
  const weatherInfo = document.getElementById("weatherInfo");
  const otherWeather = document.getElementById("otherWeather");
  const errorContainer = document.getElementById("errorContainer");
  const errorMessage = document.getElementById("errorMessage");

  const countries = ["singapore", "malaysia", "japan", "korea", "china"];
  
  function hideErrorMessage() {
    errorContainer.classList.add("hidden");
  }

  const displayWeather = (data) => {
    const { name, weather, main } = data;
    const description = weather[0].description;
    const temperature = main.temp;
    const icon = weather[0].icon;

    const weatherHTML = `
    <div class="flex flex-col items-center justify-center m-2 bg-cyan-500 text-white rounded-md" style="width: 150px; height: 150px;">
        <h2 class="text-2xl font-semibold">${name}</h2>
        <p>${description}</p>
        <p class="text-4xl font-bold">${temperature}°C</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
      </div>
    `;

    otherWeather.innerHTML += weatherHTML;
  };
  
  function handleEnterKey(event){
    if(event.key === "Enter"){
        searchBtn.click()
    }
  }
  
  cityInput.addEventListener("keyup", handleEnterKey);

  for (const country of countries) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`);
      if (response.ok) {
        const data = await response.json();
        displayWeather(data);
      } else {
        errorMessage.textContent = `Error Fetching Weather Data for ${country}: ${response.status}`;
        errorContainer.classList.remove("hidden");
        setTimeout(hideErrorMessage, 3000);
      }
    } catch (error) {
      errorMessage.textContent = `Error Fetching Weather Data for ${country}: ${response.status}`;
      errorContainer.classList.remove("hidden");
      setTimeout(hideErrorMessage, 3000);
    }
  }

  searchBtn.addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput").value;
    

    if (cityInput.trim() === "") {
      errorMessage.textContent = "Please enter a city name";
      errorContainer.classList.remove("hidden");

      setTimeout(hideErrorMessage, 3000);
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        const { name, weather, main } = data;
        const description = weather[0].description;
        const temperature = main.temp;
        const icon = weather[0].icon;

        const weatherHTML = `
        <div class="flex flex-col items-center">
        <h2 class="text-2xl font-semibold">${name}</h2>
        <p class="text-gray-600">${description}</p>
        <p class="text-4xl font-bold">${temperature}°C</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
        </div>
        `;
        weatherInfo.innerHTML = weatherHTML;
        errorContainer.classList.add("hidden");
      })
      .catch(() => {
        errorMessage.textContent = `Country Not Found!`;
        errorContainer.classList.remove("hidden");

        setTimeout(hideErrorMessage, 3000);
      });
  });
});