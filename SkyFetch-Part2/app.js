const apiKey = "YOUR_API_KEY";
const weatherDiv = document.getElementById("weather");
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListener("click", () => searchWeather());
input.addEventListener("keypress", e => {
    if(e.key==="Enter") searchWeather();
});

async function searchWeather(){

    const city = input.value.trim();

    if(city===""){
        showError("Please enter a city name");
        return;
    }

    showLoading();
    btn.disabled = true;

    try{

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await axios.get(url);

        const data = res.data;

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡️ Temp: ${data.main.temp} °C</p>
            <p>💨 Wind: ${data.wind.speed} m/s</p>
            <p>☁️ ${data.weather[0].description}</p>
        `;

    }catch(err){
        showError("City not found ❌");
    }

    btn.disabled = false;
    input.value="";
}

function showLoading(){
    weatherDiv.innerHTML = `<div class="spinner"></div><p>Loading...</p>`;
}

function showError(msg){
    weatherDiv.innerHTML = `<p class="error">${msg}</p>`;
}
