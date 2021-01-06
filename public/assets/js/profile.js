$(document).ready(function() {
    let currentUser = $("#username").text();
    $("#updateProfile").on("click", () => {
        window.location.replace("/settings/" + currentUser);
    });

    $("#viewMessagesButton").on("click", () => {
        window.location.replace("/messages/" + currentUser);
    });

    $(".messageUserButton").on("click", (e) => {
        let receiver_username = $(e.target).attr("value");
        let message = prompt(`What would you like to say to ${receiver_username}?`);
        sendMessage(receiver_username, message);
    });

    function sendMessage(receiver_username, message) {
        $.post("/replyMessage", {
            receiver_username: receiver_username,
            message: message,
            senderUsername: currentUser
        });
    }
});