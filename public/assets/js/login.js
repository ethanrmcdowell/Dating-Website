$(document).ready(function() {
    let loginForm = $("#login-form");
    let userName = $("#user-name");
    let userPass = $("#user-pass");

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
            },
            error: function(err){
                console.log(err);
            }
        });
    }
});