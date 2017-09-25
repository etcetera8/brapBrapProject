//GLOBAL VARIABLES
var lat = 0;
var long = 0;
var difficulty = "";
var dist = 50;
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
  } 
  else {
    console.log("geolocation not attained")
  }

function success(position) {
  lat = Math.ceil( position.coords.latitude * 100 ) / 100;
  long = Math.ceil(position.coords.longitude * 100) / 100;
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
  dist = document.getElementById("distSelect").value;
  console.log(dist);
};


function trailList () {
  var ulList = document.getElementById("trailList");
  ulList.innerHTML = "";
  for (var j = 1; j <= 5; j++) {
    var listItem = document.createElement("li");
    listItem.setAttribute("id", ""+j+"");
    listItem.setAttribute("onClick", "clickName");
    var clickList = listItem.appendChild(document.createTextNode(allTrails[j].name));
    ulList.appendChild(listItem);
  }
  return ulList;
}

function clickName() {
 var elementName = document.getElementById(""+j+"");
 console.log(elementName);
}

// CLICK HANDLER EVENT / THE CLICK
function clickHandler(event) {
  var button = document.getElementById("apiCall");
  button.addEventListener("click", clickHandler);
  var request = new XMLHttpRequest();
  var url = 'https://www.mtbproject.com/data/get-trails?lat='+lat+'&lon='+long+'&maxDistance='+dist+'&maxResults=100&key='+key+'';
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
    //SUCCESS
    var data = JSON.parse(this.responseText);
      //RESET ARRAYS to 0
      noTrails.length = 0;
      allTrails.length = 0;

    //pushing trails to arrays and displaying
    var trails = data.trails;

    for (var i = 0; i < trails.length; i++) {
      if (difficulty != trails[i].difficulty) {
        noTrails.push(trails[i]);
      } 
      else if (trails[i].difficulty == difficulty) {
        allTrails.push(trails[i]);  
      }
      else {
        console.log('server reached, returns error')
      }
    }
    console.log(allTrails);

    trailList();


      //PHOTO DISPLAY
      var trailPhoto = document.getElementById("trailPicture");
      trailPhoto.src = allTrails[0].imgSmall;
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
      document.getElementById("trailPicture").src="";
      document.getElementById("trailName").innerHTML = "";
      document.getElementById("trailUrl").href = "";
      document.getElementById("trailDescription").innerHTML = "<i>No trails of that difficulty in this area, try a different difficulty or expanding the range of the search</i>";
      document.getElementById("trailLocation").innerHTML = "";
      document.getElementById("rating").src = "";  
      noTrails.length = 0;
      allTrails.length = 0;  
    }

