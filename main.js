function add_events(){
    const sign_up_norm = document.querySelectorAll("#create_ac_portal");
    const sign_in_port = document.querySelectorAll("#sign_in_portal");
    const to_login_home = document.querySelectorAll("#to_login_home");

    const sign_up_port = document.getElementById("sign_up_port");

    sign_up_port.addEventListener("click", sign_up_port_func);

    for (let i = 0; i < sign_up_norm.length; i++){
        sign_up_norm[i].addEventListener("click", sign_up_norm_fuc);
    }
    for (let i = 0; i < sign_in_port.length; i++){
        sign_in_port[i].addEventListener("click", sign_in_port_fuc);
    }
    for (let i = 0; i < to_login_home.length; i++){
        to_login_home[i].addEventListener("click", to_login_home_func);
    }

    return false;
}

function to_login_home_func(e){
    const to_log_home = document.getElementById("t-1");
    to_log_home.click();
    return false;
}

function sign_up_port_func(e){
    const to_create_port = document.getElementById("t-4");
    to_create_port.click();
    return false;
}

function sign_up_norm_fuc(e){
    const to_sign_up = document.getElementById("t-2");

    to_sign_up.click();
    // alert("Sign Up");
    return false;
}

function sign_in_port_fuc(e){
    const sign_in_page = document.getElementById("t-3");
    sign_in_page.click();
    return false;
}

$(document).ready(() => {
    add_events();
    // console.log("Finished");
});