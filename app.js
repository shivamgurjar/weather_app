const inp = document.getElementById('city_input');

// Getting the data using fetch
const default_city = "jaipur"

async function show_weather(city){
    const api_key = '7c6a18975a7913a95ba3941e3dfe9bb8';
    let link = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+api_key;

    const res = await fetch(link);
    if(res.status===200){
        const data = await res.json();
        document.getElementById('city').textContent = data.name;
        document.getElementById('status').textContent = data.weather[0].main;
        document.getElementById('tempreture').textContent = Math.round(data.main.feels_like - 273) + "°C";
        document.getElementById('min_max').textContent = Math.round(data.main.temp_min - 273) + "°C" + ' / ' + Math.round(data.main.temp_max - 273) + "°C";
    }else{
        console.log("Could not find city");
    }
}

show_weather(default_city);
inp.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        const city = inp.value;
        show_weather(city);
    }
})