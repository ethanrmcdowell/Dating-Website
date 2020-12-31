$(document).ready(function() {
    let loginForm = $("#login-form");
    let userName = $("#user-name");
    let userPass = $("#user-pass");

    loginForm.on("submit", function(event) {
        event.preventDefault();
        let userData = {
            username: userName.val().trim(),
            password: userPass.val().trim()
        }
        if (!userData.username || !userData.password){
            alert("Please enter your user information");
            return;
        }
        loginUser(userData.username, userData.password);
        userName.val("");
        userPass.val("");
    });
    function loginUser(username, password){
        $.post("/login", {
            username: username,
            password: password
        }).then(function(){
            console.log("HI: BEFORE REPLACE!");
            window.location.replace("/profile");
            console.log("HI! AFTER REPLACE!");
        });
    }
});