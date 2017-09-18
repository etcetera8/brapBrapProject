//global variables
var lat = 0;
var long = 0;
var key = '200021803-8942a6c5fbed31eeee08f074613141b1';
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


      var photo = document.createElement("img");
      photo.src = data.trails[0].imgSmallMed;
      photo.id = "picture"
      var tag = document.getElementById("trailFindLeft");
      tag.appendChild(photo);
      return;

  }

  else {
    console.log('server reached, returns error')
  }
}
