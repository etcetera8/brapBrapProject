//ONLOAD PREPARE
addEventListener("load", clickHandleSetUp);
addEventListener("load", latLong);

//GEOLOCATION
if ("geolocation" in navigator) {
  console.log("geolocation attained")
} else {
  console.log("geolocation not attained")
}

function latLong () {
  if (!navigator.geolocation) {
    alert("Geolocation not supported, some features may not work");
    return;
  }

function success(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(lat);
  console.log(long);
}

function error() {
  console.log("geolocation error");
}

navigator.geolocation.getCurrentPosition(success, error);

}


//CLICK HANDLER SETUP
function clickHandleSetUp() {
  var key = '200021803-8942a6c5fbed31eeee08f074613141b1';
  var url = 'https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200021803-8942a6c5fbed31eeee08f074613141b1';
  var button= document.getElementById("magic");
  button.addEventListener("click", clickHandler);
};

// CLICK HANDLER EVENT / THE CLICK
function clickHandler(event) {
  var request = new XMLHttpRequest();
  var url = 'https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200021803-8942a6c5fbed31eeee08f074613141b1';
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
    console.log(data)
  } else {
    console.log('server reached, returns error')
  }
}
