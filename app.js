window.addEventListener("load", ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "http://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/3a14ea2f87bf92336f09df6099ee2565/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const{ temperature, summary, icon } = data.currently;
          //Set DOM ELements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //FORMUlA for celcuis
          let celcius = (temperature - 32) * (5/9);
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temp to celcuis/fahrenhiet
          temperatureSection.addEventListener("click", () => {
            if(temperatureSpan.textContent ==="F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }

          })
        });
    });
  }  else{
    h1.textcontent = "Hey, either your browser does not supports geolocation OR you denied permission to it."
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
