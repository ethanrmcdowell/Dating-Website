$(document).ready(function(){


    $("#signup-form").on("submit", (event) => {
        event.preventDefault();
        let userData = {
            password: $.trim($("#password").val()),
            username: $.trim($("#username").val())
        }
        if(!userData.password || !userData.username){
            return;
        }
        signupUser(userData.password, userData.username);
        $("#password").val("");
        $("#username").val("");
    });


    function signupUser(password, username){
        $.post("/signup", {
            password: password,
            username: username
        })
        .then(function(data){
            window.location.replace("/profile");
        })
    }
});