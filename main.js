function add_events(){
    let sign_up_norm = document.getElementById("create_ac_portal");

    sign_up_norm.addEventListener("click", (e) => {
        alert("Sign Up");
    });
    return false;
}

$(document).ready(() => {
    console.log("Finished");
});