//GLOBAL VARIABLES
var lat = 0;
var long = 0;
var difficulty = "";
var allTrails = [];
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

//GET VALUES FROM USER DIFFICULTY SELECT
function diffSave() {
  difficulty = document.getElementById('diffSelect').value;
  console.log(difficulty)
};


// CLICK HANDLER EVENT / THE CLICK
function clickHandler(event) {
  var button = document.getElementById("apiCall");
  button.addEventListener("click", clickHandler);
  var request = new XMLHttpRequest();
  var url = 'https://www.mtbproject.com/data/get-trails?lat='+lat+'&lon='+long+'&maxDistance=10&key='+key+'';
  request.open('GET', url, true);
  request.addEventListener("load", responseHandler);
  request.send();
  //ERROR
  request.onerror = function() {
    
    console.log('Error connecting to server');
  };
}

// STORE THE DATA FROM THE CLICK
function responseHandler() {

  if (this.status >= 200 && this.status < 400) {
    //Success!
    var data = JSON.parse(this.responseText);
    

    //USER SELECTED DIFFICULTY
    var trails = data.trails;
    console.log(trails.length);

    for (var i = 0; i < trails.length; i++) {
      if (trails[i].difficulty == difficulty){
        allTrails.push(trails[i]);  
      } else {
    console.log('server reached, returns error')
      }
    }
      console.log(allTrails);

      //PHOTO DISPLAY
      var trailPhoto = document.createElement("img");
      trailPhoto.src = data.trails[i].imgSmall;
      trailPhoto.id = "picture";
      var tag = document.getElementById("trailFindLeft");
      tag.appendChild(trailPhoto);
     
      
      //TEXT DISPLAY
      var trailName = data.trails[i].name;
      var trailUrl = data.trails[i].url;
      
      //TRAIL STAR RATING//
      var rating = document.getElementById("rating");
      var trailStars = data.trails[i].stars;
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


      //SAVE ELEMENTS TO VARS THEN DISPLAY TO DOM    
      var trailDifficulty = data.trails[i].difficulty;
      var trailLocation = data.trails[i].location;
      var trailDescription = data.trails[i].summary;

      document.getElementById("trailName").innerHTML = trailName;
      document.getElementById("trailUrl").href = trailUrl;
      document.getElementById("trailDescription").innerHTML = trailDescription;
      document.getElementById("trailLocation").innerHTML = "<i>" +trailLocation + "</i>"
      }
    }

