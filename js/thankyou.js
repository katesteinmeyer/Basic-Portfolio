function showPopup()
{
    var fullnameField = document.getElementById("fullname");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");
    
    
    if (fullnameField.value !== "" && emailField.value !== "") {
        document.getElementById("thanks").style.display = "block";
        
        ajaxPost(
            document.getElementById("myForm"),
            //line 14 is an object. It returns an association of field names to their values.
            {
                "name": fullnameField.value,
                "_replyTo": emailField.value,
                "message": messageField.value
            }
        );
        
        return false;
        
    }
}

function colorbutton() {
    
    var fullnameField = document.getElementById("fullname");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");
    var colorfulbttn = document.getElementById("button");
    
    if ( fullnameField.value !== "" && emailField.value !== ""){
        colorfulbttn.className = 'button2';
    
    }
}

/**
 * Takes a form node and sends it over AJAX.
 * @param {HTMLFormElement} form - Form node to send
 * @param {function} callback - Function to handle onload. 
 *                              this variable will be bound correctly.
 */

function ajaxPost (form, data) {
    var url = form.action,
        xhr = new XMLHttpRequest();

    // Converts the data from an object to a string so that 
    // it can be sent 
    var str = "";
    for (var key in data) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(data[key]);
    }
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-type", "application/x-form-urlencoded");
    //All preperations are clear, send the request!
    xhr.send(str);
}

function closePopup(){
  document.getElementById("thanks").style.display = "none";
  
    var fullnameField = document.getElementById("fullname");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");
    
    fullnameField.value = "";
    emailField.value = "";
    messageField.value ="";
    
    
}