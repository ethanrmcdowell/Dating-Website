$(document).ready(function() {
    let currentUser = $("#username").text();
    $("#updateProfile").on("click", () => {
        window.location.replace("/settings/" + currentUser);
    })
});