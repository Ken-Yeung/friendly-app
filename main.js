let $body = $(document.body);
let scrollPosition = 0;
let pressTimer;
let activeTimers;

function current_date(){
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
    return date;//"31-1-2021";
}

async function get_api(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function create_calendar(current_date){
    let main_data_lst = [];
    await get_api(`https://beagleetech.ga/calendar_dates?date=${current_date}`).then(res=>{
        main_data_lst = res["details"];
        localStorage.setItem("create-calendar", JSON.stringify(main_data_lst));
        main_data_lst = localStorage.getItem("create-calendar");
        main_data_lst = JSON.parse(main_data_lst);
    });
    create_calendar_cell(main_data_lst, "create");
    return false;
}

async function create_calendar_cell(lst, mode){
    const month_mask = document.querySelectorAll(`#${mode}-calendar-wrapper`);
    const month_head = document.querySelectorAll(`#${mode}-month-head`);
    const calendar_month = document.querySelectorAll(`#${mode}-months`);
    const slide_dot = document.getElementsByClassName("w-slider-dot");
    // const test_only = document.getElementsByClassName("log-in-btn");
    console.log(lst);
    // append month & year
    for(let i = 0; i < month_mask.length; i++){
        let month = lst[i]["month"][0];
        let month_index = lst[i]["month"][1];
        let year = lst[i]["year"];
        month_mask[i].remove();

        let calendar_wrapper = document.createElement("DIV");
        calendar_wrapper.className = "t_g_calendar_wrapper";
        await calendar_month[i].appendChild(calendar_wrapper);
        calendar_wrapper = document.getElementsByClassName("t_g_calendar_wrapper");

        let len_week = lst[i]["weeks"].length;
        for (let ii = 0; ii < len_week; ii++){
            let days = lst[i]["weeks"][ii]["days"];
            let calendar_row = document.createElement("DIV");
            calendar_row.className = "t_g_calendar_row";
            calendar_row.id = `${mode}-${year}-${month_index}-${ii}`;
            await calendar_wrapper[i].appendChild(calendar_row);
            calendar_row = document.getElementById(`${mode}-${year}-${month_index}-${ii}`);

            for (let iii = 0; iii < days.length; iii++){ //Every Day!
                let day = days[iii]["day"];
                let is_today = days[iii]["today"]
                let day_status = days[iii]["this"];
                let cell = document.createElement("DIV");
                let this_id = days[iii]["id"];
                let cell_txt = document.createElement("DIV");
                let available = days[iii]["available"];
                cell_txt.className = "t_g_c_today";
                cell.className = "t_g_calendar_cell";

                if (day_status && !is_today && available){
                    if (iii == 0){
                        cell.className = "t_g_calendar_cell sun";
                    }
                    this_id = `${mode}-cell-${this_id}`;

                } else if (!day_status && !available) {

                    cell.className = "t_g_calendar_cell grey";
                    this_id = `${mode}-false-${this_id}`;

                } else if (day_status && is_today){

                    this_id = `${mode}-cell-${this_id}`;
                    cell_txt.className = "t_g_c_today today";

                } else if (day_status && !available){

                    this_id = `${mode}-passed-${this_id}`;
                    cell.className = "t_g_calendar_cell grey";

                }
                ////!
                cell.id = this_id;
                await calendar_row.appendChild(cell);
                cell = document.getElementById(this_id);
                cell_txt.innerText = day;
                await cell.appendChild(cell_txt);
                cell.addEventListener("click", foo_start_click);
                // cell.addEventListener("mousedown", start_click);
                // cell.addEventListener("mouseup", end_click);
                // cell.addEventListener("touchstart", start_click);
                // cell.addEventListener("touchend", end_click);
            }
        }
        month_head[i].innerText = `${month} ${year}`;

        let flag_count = 0;
        switch (mode){
            case "create":
                flag_count = 0;
                break;
            default:
                flag_count = 0;
                console.log("Default");
        }
        let dot_id = `${mode}-dot-${month_index}-${year}`;
        slide_dot[i + flag_count].id = dot_id;

        //test only
        // test_only[i].innerText = `${month_index}/${year}`
        // test_only[i].addEventListener("click", (e)=>{
        //     let test_test1 = document.getElementById(dot_id);
        //     test_test1.click();
        // });
        //End test
    }
    // end append month & year
    return false;
}

function foo_start_click(e){
    this_foo_id = this.id.split(/-(.+)/);
    let check_available = this_foo_id[1].split(/-(.+)/)[0];
    check_available = check_available == "cell";
    let class_status = $(this).children("div").hasClass("selecting");
    // alert(`${this_foo_id[0]}: ${this_foo_id[1]}`);
    if (!class_status && check_available){
        $(this).children("div").addClass("selecting");
    } else if (check_available) {
        $(this).children("div").removeClass("selecting");
    }
}

// function end_click(e){
//     clearTimeout(pressTimer);
//     if (activeTimers){
//         this_foo_id = this.id.split(/-(.+)/);
//         let check_available = this_foo_id[1].split(/-(.+)/)[0];
//         check_available = check_available == "cell";
//         let class_status = $(this).children("div").hasClass("selecting");
//         // alert(`${this_foo_id[0]}: ${this_foo_id[1]}`);
//         if (!class_status && check_available){
//             $(this).children("div").addClass("selecting", 1234, "easeOutBounce");
//         } else if (check_available) {
//             $(this).children("div").removeClass("selecting", 1234, "easeOutBounce");
//         }
//     }
//     // Clear timeout
//     if (e.cancelable) {e.preventDefault();}
//     return false;
// }
// function start_click(e){
//     // Set timeout
//     activeTimers = true;
//     pressTimer = window.setTimeout(() => {
//         this_foo_id = this.id.split(/-(.+)/);
//         alert(`Holded for ${this_foo_id[0]}: ${this_foo_id[1]}`);
//         //End
//         activeTimers = false;
//     },549);
//     // clearTimeout(pressTimer);
//     if (e.cancelable) {e.preventDefault();}
//     return false;
// }

function add_events(){
    const sign_up_norm = document.querySelectorAll("#create_ac_portal");
    const sign_in_port = document.querySelectorAll("#sign_in_portal");
    const to_login_home = document.querySelectorAll("#to_login_home");
    const to_create_event_page = document.querySelectorAll("#to_create_event_page");
    
    const clear = document.getElementById("create-clear");
    const sign_up_port = document.getElementById("sign_up_port");
    const create_calendar = document.getElementById("create-calendar");
    const create_sub_tab_link1 = document.getElementById("create-sub-tab-link1");
    const create_sub_tab_link2 = document.getElementById("create-sub-tab-link2");
    const create_confirm = document.getElementById("create-confirm");

    create_sub_tab_link1.addEventListener("click", create_sub_tab_link1_func);
    create_sub_tab_link2.addEventListener("click", create_sub_tab_link2_func);
    sign_up_port.addEventListener("click", sign_up_port_func);
    create_calendar.addEventListener("click", create_calendar_func);
    clear.addEventListener("click", clear_func);
    create_confirm.addEventListener("click", create_confirm_func);

    for (let i = 0; i < sign_up_norm.length; i++){
        sign_up_norm[i].addEventListener("click", sign_up_norm_fuc);
    }
    for (let i = 0; i < sign_in_port.length; i++){
        sign_in_port[i].addEventListener("click", sign_in_port_fuc);
    }
    for (let i = 0; i < to_login_home.length; i++){
        to_login_home[i].addEventListener("click", to_login_home_func);
    }
    for (let i = 0; i < to_create_event_page.length; i++){
        to_create_event_page[i].addEventListener("click", to_create_event_page_func);
    }

    return false;
}

function create_confirm_func(e){
    const date_cell = document.getElementsByClassName("t_g_c_today");
    let selected_arr = [];
    for (let i = 0; i < date_cell.length; i++){
        let check_selecting = date_cell[i].classList.contains("selecting");
        if (check_selecting){
            let cell = date_cell[i].parentElement.id;
            let check_cell = cell.split("-"); //.split(/-(.+)/);
            let cell_date = `${check_cell[2]}-${check_cell[3]}-${check_cell[4]}`;
            if(check_cell[1] == "cell"){
                selected_arr.push(cell_date);
            }
        }
    }
    calendar_add_user("create", selected_arr);
    console.log(selected_arr);
    // clear_func(e);
    return false;
}

function calendar_add_user(mode, selected_lst){
    let calendar_details = localStorage.getItem(`${mode}-calendar`);
    calendar_details = JSON.parse(calendar_details);
    let user_name = localStorage.getItem("user_info");
    for(let i = 0; i < selected_lst.length; i++){ // selected lst
        let selected_dates = selected_lst[i];

        for(let ii = 0; ii < calendar_details.length; ii++){ // New calendar
            let weeks = calendar_details[ii]["weeks"];

            for(let iii = 0; iii < weeks.length; iii++){ //weeks
                let days = weeks[iii]["days"];

                for(let iv = 0; iv < days.length; iv++){ // days
                    let lst_id = days[iv]["id"] == selected_dates;
                    if(lst_id){
                        days[iv]["participant"].push(user_name);
                        break;
                    } //not end yet`
                } //end days
            } //end weeks
        } // end calendar
    } // end selected
    console.log(calendar_details);
    return false;
}

function create_sub_tab_link1_func(e){
    const link1_img = document.getElementById("create-sub-tab-link1-img");
    const link2_img = document.getElementById("create-sub-tab-link2-img");
    link1_img.style.backgroundColor = "#ff9900";
    link2_img.style.backgroundColor = "white";
    return false;
}

function create_sub_tab_link2_func(e){
    const link1_img = document.getElementById("create-sub-tab-link1-img");
    const link2_img = document.getElementById("create-sub-tab-link2-img");
    link2_img.style.backgroundColor = "#ff9900";
    link1_img.style.backgroundColor = "white";
    return false;
}

function clear_func(e){
    let cls = ".t_g_c_today"
    let cls_status = $(cls).hasClass("selecting");
    if (cls_status){
        $(cls).removeClass("selecting");
    }
    return false;
}

async function create_calendar_func(e){
    const to_create_calendar = document.getElementById("t-5");
    let today = current_date().toString();
    await create_calendar(today);
    to_create_calendar.click();
    return false;
}

function to_create_event_page_func(e){
    const to_create_event = document.getElementById("t-4");
    to_create_event.click();
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
    localStorage.setItem("user_info", "Ken")
    add_events();
    //initial
    document.getElementById("create-sub-tab-link1").click();
    // console.log("Finished");
});

//14/5/2021
//1 create gen ID for event in server (activate after create-confirm button request)
//2 local storage create-calendar
//3 Get all available dates ID
//4 push user ID into calendar json