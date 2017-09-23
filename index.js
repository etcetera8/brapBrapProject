//GLOBAL VARIABLES
var lat = 0;
var long = 0;
var difficulty = "";
var tag = "";
var allTrails = [];
var noTrails = [];
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

    for (var i = 0; i < trails.length; i++) {
      if (difficulty != trails[i].difficulty) {
        noTrails.push(trails[i]);
      } 
      else if (noTrails.length == 10) {
        console.log(noTrails);
        console.log("there are no trails of this difficulty in the area");
        document.getElementById("trailPicture").innerHTML = "no trails to display at this difficulty";
        return;
      }
      else if (trails[i].difficulty == difficulty) {
        allTrails.push(trails[i]);  
      }
        else {
    console.log('server reached, returns error')
      }
    }
      console.log(allTrails);
      //PHOTO DISPLAY
      var trailPhoto = document.getElementById("trailPicture");
      trailPhoto.src = allTrails[0].imgSqSmall;
      trailPhoto.alt = "Picture of Trail";
     
      
      //TEXT DISPLAY
      var trailName = allTrails[0].name;
      var trailUrl = allTrails[0].url;
      
      //TRAIL STAR RATING//
      var rating = document.getElementById("rating");
      var trailStars = allTrails[0].stars;
      
      if (trailStars > 4.5) {
              rating.src= "images/stars/5.png";
          } 
        else if (trailStars > 4 && trailStars <= 4.5) {
              rating.src= "images/stars/4.5.png";
          } 
        else if (trailStars > 3.5 && trailStars <= 4) {
              rating.src= "images/stars/4.png";
          } 
        else if (trailStars > 3 && trailStars <= 3.5) {
              rating.src= "images/stars/3.5.png";
          } 
        else if (trailStars > 2.5 && trailStars <= 3) {
              rating.src= "images/stars/3.png";
          } 


      //SAVE ELEMENTS TO VARS THEN DISPLAY TO DOM    
      var trailDifficulty = allTrails[0].difficulty;
      var trailLocation = allTrails[0].location;
      var trailDescription = allTrails[0].summary;

      document.getElementById("trailName").innerHTML = trailName;
      document.getElementById("trailUrl").href = trailUrl;
      document.getElementById("trailDescription").innerHTML = trailDescription;
      document.getElementById("trailLocation").innerHTML = "<i>" +trailLocation + "</i>"
      }
    }

//CLEARING ALL ELEMTENTS FROM THE DOM AND THE TRAILS ARRAY
    function clearElements() {
      noTrails = [];
      allTrails = [];
      document.getElementById("trailPicture").innerhHTML="";
      document.getElementById("trailName").innerHTML = "";
      document.getElementById("trailUrl").href = "";
      document.getElementById("trailDescription").innerHTML = "";
      document.getElementById("trailLocation").innerHTML = "";
      document.getElementById("rating").innerHTML = "";     
    }

