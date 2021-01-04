$(document).ready(function() {
    let currentUser = $("#username").text();
    console.log(currentUser);

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
        }).then(function(){
            window.location.replace("/profile/" + currentUser)
        });
    }

});