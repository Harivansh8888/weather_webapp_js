window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'http://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/3a14ea2f87bf92336f09df6099ee2565/${lat},${long}`;

      fetch(api)
        .then(response =>{
          return response.json;
        })
        .then(data =>{
          
          const{ temperature, summary } = data.currently;
          temperatureDegree.textcontent = temperature;
        });
    });


  }else{
    h1.textcontent = "Hey, either your browser does not supports geolocation OR you denied permission to it."
  }
});
