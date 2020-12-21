$(document).ready(function(){


    $("#signup-form").on("submit", (event) => {
        event.preventDefault();
        let userData = {
            email: $.trim($("#email").val()),
            password: $.trim($("#password").val()),
            username: $.trim($("#username").val())
        }
        if(!userData.email || !userData.password || !userData.username){
            return;
        }
        signupUser(userData.email, userData.password, userData.username);
        $("#email").val("");
        $("#password").val("");
        $("#username").val("");
    });


    function signupUser(email, password, username){
        $.post("/signup", {
            email: email,
            password: password,
            username: username
        })
        .then(function(data){
            window.location.replace("/profile");
        })
    }

});