//global variables
var lat = 0;
var long = 0;
var key = config.secretKey;
//ONLOAD PREPARE
addEventListener("load", latLong);

//GEOLOCATION
function latLong () {
  if ("geolocation" in navigator) {
    console.log("geolocation attained")
  } else {
    console.log("geolocation not attained")
  }

function success(position) {
  lat = Math.round(position.coords.latitude);
  long = Math.round(position.coords.longitude);
  console.log(lat);
  console.log(long);
}

function error() {
  console.log("geolocation error");
}
  navigator.geolocation.getCurrentPosition(success, error);
}

// CLICK HANDLER EVENT / THE CLICK
function clickHandler(event) {
  var button= document.getElementById("apiCall");
  button.addEventListener("click", clickHandler);
  var request = new XMLHttpRequest();
  var url = 'https://www.mtbproject.com/data/get-trails?lat='+lat+'&lon='+long+'&maxDistance=10&key='+key+'';
  request.open('GET', url, true);
  request.addEventListener("load", responseHandler);
  request.send();
  request.onerror = function() {
    //error of some sort
    console.log('error of a sort')
  };
}

// STORE THE DATA FROM THE CLICK
function responseHandler() {

  if (this.status >= 200 && this.status < 400) {
    //Success!
    var data = JSON.parse(this.responseText);

      //PHOTO DISPLAY
      var trailPhoto = document.createElement("img");
      trailPhoto.src = data.trails[0].imgSqSmall;
      trailPhoto.id = "picture";
      var tag = document.getElementById("trailFindLeft");
      var rating = document.getElementById("rating");
     
      
      //TEXT DISPLAY
      console.log(data.trails[0]);
      var trailName = data.trails[0].name;
      var trailUrl = data.trails[0].url;
      var trailStars = data.trails[0].stars;
      var starPhoto = document.createElement("img");
      starPhoto.id = "star"
      
      if (trailStars > 4.5) {
              starPhoto.src= "images/stars/5.png";
              rating.appendChild(starPhoto);
          } 
        else if (trailStars > 4 && trailStars <= 4.5) {
              starPhoto.src= "images/stars/4.5.png";
              rating.appendChild(starPhoto);
          } 
        else if (trailStars > 3.5 && trailStars <= 4) {
              starPhoto.src= "images/stars/4.png";
              rating.appendChild(starPhoto);
          } 
        else if (trailStars > 3 && trailStars <= 3.5) {
              starPhoto.src= "images/stars/3.5.png";
              rating.appendChild(starPhoto);
          } 
        else if (trailStars > 2.5 && trailStars <= 3) {
              starPhoto.src= "images/stars/3.png";
              rating.appendChild(starPhoto);
          } 


      var trailDifficulty = data.trails[0].difficulty;
      var trailLocation = data.trails[0].location;
      var trailDescription = data.trails[0].summary;


      tag.appendChild(trailPhoto);

      document.getElementById("trailName").innerHTML = trailName;
      document.getElementById("trailUrl").href = trailUrl;
      document.getElementById("trailDescription").innerHTML = trailDescription;
      document.getElementById("trailLocation").innerHTML = "<i>" +trailLocation + "</i>"



      
      


      console.log(trailName);
      console.log(trailStars);
      console.log(trailUrl);
      console.log(trailDifficulty);


      return;

  }

  else {
    console.log('server reached, returns error')
  }
}
