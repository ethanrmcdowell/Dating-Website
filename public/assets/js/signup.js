$(document).ready(function(){


    $("#signup-form").on("submit", (event) => {
        event.preventDefault();
        let confirmPassword = $.trim($("#passwordConfirm").val());
        let userData = {
            password: $.trim($("#password").val()),
            username: $.trim($("#username").val())
        }
        if(!userData.password || !userData.username){
            return;
        }
        if (userData.password === confirmPassword) {
            signupUser(userData.password, userData.username);
        } else {
            $("#message").text("Password confirm does not match");
        }
        $("#password").val("");
        $("#username").val("");
        $("#passwordConfirm").val("");
    });


    function signupUser(password, username){
        $.post("/signup", {
            password: password,
            username: username
        })
        .then(function(data){
            window.location.replace("/profile");
        });
    }
});