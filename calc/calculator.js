
//CALCULATOR 
function c(val)
{
document.getElementById("display").value=val;
}
function v(val)
{
document.getElementById("display").value+=val;
}
function e() 
{ 
try 
{ 
  c(eval(document.getElementById("display").value)) 
} 
catch(e) 
{
  c('Error') 
} 
}

$(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 49) {
            $("#one").click();
        } else if (keycode === 50) {
            $("#two").trigger('click');
        } else if (keycode === 51) {
            $("#three").trigger('click');
        } else if (keycode === 52) {
            $("#four").trigger('click');
        } else if (keycode === 53) {
            $("#five").trigger('click');
        } else if (keycode === 54) {
            $("#six").trigger('click');
        } else if (keycode === 55) {
            $("#seven").trigger('click');
        } else if (keycode === 56) {
            $("#eight").trigger('click');
        } else if (keycode === 57) {
            $("#nine").trigger('click');
        } else if (keycode === 48) {
            $("#zero").trigger('click');
        } else if (keycode === 97) {
            $("#clearall").trigger('click');
        } else if (keycode === 99) {
            $("#clear").trigger('click');
        } else if (keycode === 61) {
            $("#equals").trigger('click');
        } else if (keycode === 43) {
            $("#plus").trigger('click');
        } else if (keycode === 45) {
            $("#minus").trigger('click');
        } else if (keycode === 42 || keycode === 120) {
            $("#multiply").trigger('click');
        } else if (keycode === 47) {
            $("#divide").trigger('click');
        } 
    });



//DATE

var d = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.getElementById("date").innerHTML = days[d.getDay()];


//UPLOAD

document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById('uploadit').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}

//RESET TEXT FORM
function myFunction() {
    document.getElementById("myForm").reset();
}


