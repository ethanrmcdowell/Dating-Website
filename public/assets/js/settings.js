$(document).ready(function() {
    let currentUser = $("#username").text();

    $("#personalStatementForm").on("submit", event => {
        event.preventDefault();
        let personalStatement = $("#PersonalStatement").val().trim();
        console.log(personalStatement);
        updatePersonalStatement(personalStatement);
    })

    function updatePersonalStatement(personalStatement) {
        $.post("/updatePersonalStatement", {
            username: currentUser,
            personalStatement: personalStatement
        }).then(() => {
            window.location.replace("/profile/" + currentUser);
        });
    }

    $("#updateAvatarForm").on("submit", event => {
        event.preventDefault();
        let newAvatar = [];
        $("#updateAvatarForm").children().filter('input:checked').each(function() {
            newAvatar.push(this.value)
        })
        if (newAvatar.length != 1) {
            return alert("Please select one avatar");
        } else {
            updateAvatar(newAvatar[0])
        }
    });

    function updateAvatar(url){
        $.post("/updateAvatar", {
            username: currentUser,
            avatarURL: url
        }).then(() => {
            window.location.replace("/profile/" + currentUser);
        });
    }

});