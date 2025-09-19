//4669173d3fbd36cca34554c076c3685d
//https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${apikey}&units=metric

async function ser() {
    let inp = document.getElementById("inp").value;
    let apikey = `4669173d3fbd36cca34554c076c3685d`;

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${apikey}&units=metric`;
        let url2 = await fetch(url);
        let data = await url2.json();

        if (data.cod === "404") {
            document.getElementById("temp").innerHTML = "0";
            document.getElementById("location").innerHTML = "Location not found";
            document.getElementById("country").innerHTML = "Enter correct address";
            document.getElementById("image").innerHTML = '<img src="error-img.png">';
            return;
        }
        console.log(data);
        document.getElementById("location").innerHTML = `${data.name}`;
        document.getElementById("country").innerHTML = `${data.sys.country}`;
        document.getElementById("temp").innerHTML = `${data.main.temp}`;
        document.getElementById("description").innerHTML = `${data.weather[0].description}`;

        let iconcode = data.weather[0].icon;
        let iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;
        let weathericon = `<img src="${iconurl}">`;
        document.getElementById("image").innerHTML = weathericon;

        let ms = data.wind.speed;
        let km = (ms * 3.6).toFixed(2);
        document.getElementById("wind").innerHTML = `${km} Km/H`;

        let wind = data.wind.deg;
        function dir(deg) {
            if(deg >= 0 && deg < 45) return "N--S";
            else if(deg >= 45 && deg < 90) return "NE--SW";
            else if(deg >= 90 && deg < 135) return "E--W";
            else if(deg >= 135 && deg < 180) return "SE--NW";
            else if(deg >= 180 && deg < 225) return "S--N";
            else if(deg >= 225 && deg < 270) return "SW--NE";
            else if(deg >= 270 && deg < 315) return "W--E";
            else return "NW--SE";
        }
        let flow = dir(wind);
        document.getElementById("dir").innerHTML = `${flow}`;

        document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let risetime = new Date(sunrise * 1000).toLocaleTimeString();
        let settime = new Date(sunset * 1000).toLocaleTimeString();
        document.getElementById("rise").innerHTML = risetime;
        document.getElementById("set").innerHTML = settime;

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        document.getElementById("lat").innerHTML = `${data.coord.lat}`;
        document.getElementById("lon").innerHTML = `${data.coord.lon}`;
        let aqiurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;
        let aqidata = await fetch(aqiurl);
        let aqi = await aqidata.json();
        let aqino = aqi.list[0].main.aqi;
        let a = document.getElementById("aqi");

        if (aqino === 1) {
            a.innerHTML = "Good";
            a.style.color = "green";
        } else if (aqino === 2) {
            a.innerHTML = "Fair";
            a.style.color = "orange";
        } else if (aqino === 3) {
            a.innerHTML = "Moderate";
            a.style.color = "blue";
        } else if (aqino === 4) {
            a.innerHTML = "Poor";
            a.style.color = "red";
        } else if (aqino === 5) {
            a.innerHTML = "Very Poor";
            a.style.color = "purple";
        } else {
            a.innerHTML = "N/A";
            a.style.color = "black";
        }

        let rainurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        let rain = await fetch(rainurl);
        let raindata = await rain.json()
        let rainchance = raindata.list[0].pop * 100;
        document.getElementById("chance").innerHTML = rainchance.toFixed(0) + "%";
        console.log(rainchance);

        document.getElementById("pressure").innerHTML = `${data.main.pressure} MB`;

    } catch(error) {
        document.getElementById("location").innerHTML = "Location not found";
        alert("Some is wrong! Try again. Check your network connection.");
    }
}