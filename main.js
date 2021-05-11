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
    });
    create_calendar_cell(main_data_lst, "create");
    return false;
}

async function create_calendar_cell(lst, mode){
    const month_mask = document.querySelectorAll(`#${mode}-calendar-wrapper`);
    const month_head = document.querySelectorAll(`#${mode}-month-head`);
    const calendar_month = document.querySelectorAll(`#${mode}-months`);
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
                // cell.addEventListener("click", foo_start_click);
                cell.addEventListener("mousedown", start_click);
                cell.addEventListener("mouseup", end_click);
                cell.addEventListener("touchstart", start_click);
                cell.addEventListener("touchend", end_click);
            }
        }
        month_head[i].innerText = `${month} ${year}`;
    }
    // end append month & year
    return false;
}

function end_click(e){
    clearTimeout(pressTimer);
    clearTimeout(clicked_timers);
    if (activeTimers && clicked_status){
        this_foo_id = this.id.split(/-(.+)/);
        alert(`${this_foo_id[0]}: ${this_foo_id[1]}`);
    }
    // Clear timeout
    if (e.cancelable) {e.preventDefault();}
    return false;
}
function start_click(e){
    // Set timeout
    clicked_status = false;
    activeTimers = true;
    clicked_timers = window.setTimeout(() => {
        clicked_status = true;
    },99);
    pressTimer = window.setTimeout(() => {
        this_foo_id = this.id.split(/-(.+)/);
        alert(`Holded for ${this_foo_id[0]}: ${this_foo_id[1]}`);
        //End
        activeTimers = false;
    },549);
    // clearTimeout(pressTimer);
    if (e.cancelable) {e.preventDefault();}
    return false;
}

function add_events(){
    const sign_up_norm = document.querySelectorAll("#create_ac_portal");
    const sign_in_port = document.querySelectorAll("#sign_in_portal");
    const to_login_home = document.querySelectorAll("#to_login_home");
    const to_create_event_page = document.querySelectorAll("#to_create_event_page");

    const sign_up_port = document.getElementById("sign_up_port");
    const create_calendar = document.getElementById("create-calendar");

    sign_up_port.addEventListener("click", sign_up_port_func);
    create_calendar.addEventListener("click", create_calendar_func);

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
    add_events();
    // console.log("Finished");
});