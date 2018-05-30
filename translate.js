function loadJSON(callback, filename) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function translate(translate_json){
  var page = url.pathname.split('/').pop();
  for(key in translate_json[page]){
    console.log(key)
    document.getElementById(key).innerHTML = translate_json[page][key];
  }
}

var url_string = window.location;
var url = new URL(url_string);
var lang = url.searchParams.get("lang");
var translate_json
if (lang != null){
  loadJSON(function(response) {
    translate_json = JSON.parse(response);
  }, 'languages/'+lang+'.json');
}

window.onload = function(){
  if (translate_json != null){
    translate(translate_json)
    document.getElementById("numOfQuestions").innerHTML = questions.length;
  }
}
