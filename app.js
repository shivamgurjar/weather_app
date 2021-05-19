

const inp = document.getElementById('city_input');

// Getting the data using fetch
const default_city = "jaipur"


async function find_country(req_link){
    const req_res = await fetch(req_link);
    const country_data = await req_res.json();
    document.getElementById('country').textContent = '(' + country_data.countryName + ')'; 
}


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
        
        const ic = data.weather[0].icon;

        // Icon for Day and Night just beside the city name
        var day_night_icon = document.getElementById('day_night')
        if(ic[2]=='d')day_night_icon.src = "images/day.svg";
        else day_night_icon.src = "images/night.svg";

        // Writing the weather description
        document.getElementById('image').src = ' http://openweathermap.org/img/wn/' + ic + '@4x.png';
        document.getElementById('description').textContent = '(' + data.weather[0].description + ')';

        // Finding the full country name with another REST API service http://www.geonames.org
        const lattitude = data.coord.lat;
        const longitude = data.coord.lon;

        let req_link = 'http://api.geonames.org/countryCodeJSON?lat='+lattitude+'&lng='+longitude+'&username=hunky_07';
        find_country(req_link);

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