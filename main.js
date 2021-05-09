function add_events(){
    let sign_up_norm = document.getElementById("create_ac_portal");
    let sign_in_port = document.getElementById("sign_in_portal");

    sign_up_norm.addEventListener("click", sign_up_norm);
    sign_in_port.addEventListener("click", sign_in_port);

    return false;
}

function sign_up_norm(e){
    alert("Sign Up");
    return false;
}

function sign_in_port(e){
    alert("Sign In");
    return false;
}

$(document).ready(() => {
    add_events();
    // console.log("Finished");
});