$(document).ready(function() {
    let currentUser = $("#currentUser").text();

    $(".deleteButton").on("click", e => {
        let messageID = $(e.target).attr("id");
        deleteMessage(messageID);
        console.log(messageID);
    });

    $(".replyButton").on("click", e => {
        let receiver_username = $(e.target).siblings("p.username").text();
        let message = prompt(`What would you like to say to ${receiver_username}?`);
        console.log(message)
        replyMessage(receiver_username, message);
    });

    $("#returnButton").on("click", e => {
        window.location.replace("/profile/" + currentUser);
    });

    function deleteMessage(messageID) {
        $.post("/deleteMessage", {
            id: messageID
        }).then(() => {
            window.location.reload();
        });
    }

    function replyMessage(receiver_username, message) {
        $.post("/replyMessage", {
            receiver_username: receiver_username,
            message: message,
            senderUsername: currentUser
        });
    }
});