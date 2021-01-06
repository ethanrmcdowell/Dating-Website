$(document).ready(function() {

    $(".deleteButton").on("click", e => {
        let messageID = $(e.target).attr("id");
        deleteMessage(messageID);
        console.log(messageID);
    });

    function deleteMessage(messageID) {
        $.post("/deleteMessage", {
            id: messageID
        }).then(() => {
            window.location.reload();
        });
    }

});