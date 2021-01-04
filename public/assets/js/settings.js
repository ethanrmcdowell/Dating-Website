$(document).ready(function() {
    let currentUser = $("#username").text();

    $("#personalStatementForm").on("submit", event => {
        event.preventDefault();
        let personalStatement = $("#PersonalStatement").val().trim();
        console.log(personalStatement);
        updatePersonalStatement(personalStatement);
    })

    $("#updateAvatarForm").on("submit", event => {
        event.preventDefault();
        let newAvatar = [];
        $("#updateAvatarForm").children().filter('input:checked').each(function() {
            newAvatar.push(this.value)
        });
        if (newAvatar.length != 1) {
            return alert("Please select one avatar");
        } else {
            updateAvatar(newAvatar[0])
        }
    });

    $("#updateHobbiesForm").on("submit", event => {
        event.preventDefault();
        let newHobbies = [];
        $("#updateHobbiesForm").children().filter('input:checked').each(function() {
            newHobbies.push(this.value)
        });
        if (newHobbies.length > 3) {
            return alert("Please select no more than 3 hobbies");
        } else if (newHobbies.length < 3) {
            while (newHobbies.length < 3) {
                newHobbies.push(null);
            }
        }
        updateHobbies(newHobbies);
    });

    $("#returnButton").on("click", event => {
        window.location.replace("/profile/" + currentUser);
    });

    function updatePersonalStatement(personalStatement) {
        $.post("/updatePersonalStatement", {
            username: currentUser,
            personalStatement: personalStatement
        }).then(() => {
            window.location.replace("/profile/" + currentUser);
        });
    }

    function updateAvatar(url){
        $.post("/updateAvatar", {
            username: currentUser,
            avatarURL: url
        }).then(() => {
            window.location.replace("/profile/" + currentUser);
        });
    }

    function updateHobbies(newHobbies) {
        $.post("/updateHobbies", {
            username: currentUser,
            hobby1id: newHobbies[0],
            hobby2id: newHobbies[1],
            hobby3id: newHobbies[2]
        }).then(() => {
            window.location.replace("/profile/" + currentUser);
        });
    }

});