

const inp = document.getElementById('city_input');
const default_city = "jaipur"

// Getting the data using fetch
async function find_country(req_link){
    const req_res = await fetch(req_link);
    const country_data = await req_res.json();
    document.getElementById('country').textContent = '(' + country_data.countryName + ')'; 
}

async function show_weather(city){
    const api_key = '7c6a18975a7913a95ba3941e3dfe9bb8';
    let link = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+api_key;


    const res = await fetch(link);
    console.clear();
    if(res.status>=400)console.log("Could not find city");
    else if(res.status===200){
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
        document.getElementById('image').src = ' https://openweathermap.org/img/wn/' + ic + '@4x.png';
        document.getElementById('description').textContent = '(' + data.weather[0].description + ')';

        // Finding the full country name with another REST API service http://www.geonames.org
        //const lattitude = data.coord.lat;
        //const longitude = data.coord.lon;

        //let req_link = 'https://api.geonames.org/countryCodeJSON?lat='+lattitude+'&lng='+longitude+'&username=hunky_07';
        //find_country(req_link);
        // Writing country code from openweather instead.
        document.getElementById('country').textContent = '(' + data.sys.country + ')'; 

        // -------------------------------------------------------------------------------------//
        // Finding the time at the entered city using data.timezone value
        //console.log(data.timezone);
        //getTime(data.timezone);
        var d = new Date((new Date().getTime())+(data.timezone*1000)+23400000);
        var full_date = d.toLocaleString();
        
        // Returned string is 5/20/2021, 10:48:48 PM
        var time_at_city = full_date.split(" ")[1].slice(0,-3);
        var am_or_pm = full_date.split(" ")[2];

        var right_time = time_at_city + " " + ((am_or_pm=="AM")?"PM":"AM");
        document.getElementById('date').textContent = new Date().toDateString() + " | " + right_time;
        //console.log(right_time);

    }else{
        console.log("Could not find city");
    }
}

function getTime(offset){
            var d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;

            // obtain UTC time in msec
            utc = localTime + localOffset;
            // create new Date object for different city
            // using supplied offset
            var nd = new Date(utc + (3600000*offset));
            //nd = 3600000 + nd;
            utc = new Date(utc);
            // return time as a string
            console.log(nd.toLocaleString());
            console.log(utc.toLocaleString());
}

show_weather(default_city);
inp.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        const city = inp.value;
        show_weather(city);
    }
})

