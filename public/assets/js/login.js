$(document).ready(function() {
    let loginForm = $("#login-form");
    let userName = $("#username");
    let userPass = $("#password");

    $(document).on("submit","form", function(event) {
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
        $.ajax({
            type: "POST",
            url: "/login",
            data: { username: username, password: password },
            success: function(res){
                console.log("** SUCCESSFUL POST!");
                window.location.replace("/profile/" + username);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
});