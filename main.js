function add_events(){
    const sign_up_norm = document.getElementById("create_ac_portal");
    const sign_in_port = document.querySelectorAll("#sign_in_portal");

    sign_up_norm.addEventListener("click", sign_up_norm_fuc);

    for (let i = 0; i < sign_in_port.length; i++){
        sign_in_port[i].addEventListener("click", sign_in_port_fuc);
    }

    return false;
}

function sign_up_norm_fuc(e){
    const to_sign_up = document.getElementById("t-2");

    to_sign_up.click();
    // alert("Sign Up");
    return false;
}

function sign_in_port_fuc(e){
    const test_back = document.getElementById("t-1");

    test_back.click();
    return false;
}

$(document).ready(() => {
    add_events();
    // console.log("Finished");
});