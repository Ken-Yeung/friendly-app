function add_events(){
    let sign_up_norm = document.getElementById("create_ac_portal");
    let sign_in_port = document.getElementById("sign_in_portal");

    sign_up_norm.addEventListener("click", (e) => {
        alert("Sign Up");
    });

    sign_in_port.addEventListener("click", (e) => {
        alert("Sign In");
    });

    return false;
}

$(document).ready(() => {
    add_events();
    // console.log("Finished");
});