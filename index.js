function test(){
  console.log("click working")
}

addEventListener("load", clickHandleSetUp);

function clickHandleSetUp() {
  var key = '200021803-8942a6c5fbed31eeee08f074613141b1';
  var url = 'https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200021803-8942a6c5fbed31eeee08f074613141b1';
  var button= document.getElementById("magic");
  button.addEventListener("click", clickHandler);
};

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

function responseHandler() {
  if (request.status >= 200 && request.status < 400) {
    //Success!
    var data = JSON.parse(request.responseText);
    console.log(data)
  } else {
    console.log('server reached, returns error')
  }
}
