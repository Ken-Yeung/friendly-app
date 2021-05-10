let $body = $(document.body);
let scrollPosition = 0;
let pressTimer;
let activeTimers;

function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
function disable_scroll() {
    var oldWidth = $body.innerWidth();
    scrollPosition = window.pageYOffset;
    $body.css('overflow', 'hidden');
    $body.css('position', 'fixed');
    $body.css('top', `-${scrollPosition}px`);
    $body.width(oldWidth);
    return;
}

function enable_scroll() {
    if ($body.css('overflow') != 'hidden') { scrollPosition = window.pageYOffset; }
    $body.css('overflow', '');
    $body.css('position', '');
    $body.css('top', '');
    $body.width('');
    $(window).scrollTop(scrollPosition);
    return;
}

function add_click_effect(elm){
    elm.addEventListener("click", () => {
        elm.animate([
            { transform: 'scale(1)', offset: 0 },
            { transform: 'scale(.72)', offset: .6 },
            { transform: 'scale(1)', offset: .9 }
        ], {
            duration: 333,
            easing: 'ease',
            delay: 12,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        });
    });
    return;
}

function append_events(long){
    try{
        let append_event = document.getElementById("event-append");
        for(let i = 0; i<long; i++){
            let eve_bar = document.createElement("DIV");
            eve_bar.className = "t_g_bar event";
            eve_bar.id = `test${i}`; //change

            append_event.appendChild(eve_bar);
        
            eve_bar = document.getElementById(`test${i}`);
            const eve_t = document.createElement("H3");
            eve_t.className = "t_g_hd event";
            eve_t.id = `H_test${i}`; //change
            eve_t.innerText = `Event(${i+1})`;
    
            eve_bar.appendChild(eve_t);

            add_click_effect(eve_bar);
        }
    }catch(e){
        console.log(e);
        alert(e);
    }
    return;
}

function filtering(){
    var projectsGrid = new FsLibrary('#event-append')
	// define our filter group(s)
	var myFilters = [
        {
            filterWrapper: "#filters-wrapper",
            filterType: "exclusive"
        }
    ]
    projectsGrid.filter({
        filterArray: myFilters,
        animation: {
            enable: true,
            duration: 333,
            easing: 'ease-out',
            effects: 'fade translate(0px,20px)'
        }
    });
}

function addEvent(){
    const start_create = document.getElementById("open-create");
    const close_create = document.getElementById("close-create");

    start_create.addEventListener("click", () => {
        disable_scroll();
        sleep(1234);
        start_create.click();
    });
    close_create.addEventListener("click", enable_scroll);
}

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

async function calendar(){
    let main_data_lst = [];
    await get_api(`https://beagleetech.ga/calendar_dates?date=${current_date().toString()}`).then(res=>{
        main_data_lst = res["details"];
    });
    create_calendar_cell(main_data_lst);
    return;
}

async function create_calendar_cell(lst){
    const month_mask = document.getElementsByClassName("t_g_calendar_wrapper");
    const month_head = document.getElementsByClassName("t_g_hd mid calendar");
    const calendar_month = document.getElementsByClassName("t_g_months");
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
            calendar_row.id = `${year}-${month_index}-${ii}`;
            await calendar_wrapper[i].appendChild(calendar_row);
            calendar_row = document.getElementById(`${year}-${month_index}-${ii}`);

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
                    this_id = `cell-${this_id}`;

                } else if (!day_status && !available) {

                    cell.className = "t_g_calendar_cell grey";
                    this_id = `false-${this_id}`;

                } else if (day_status && is_today){

                    this_id = `cell-${this_id}`;
                    cell_txt.className = "t_g_c_today today";

                } else if (day_status && !available){

                    this_id = `passed-${this_id}`;
                    cell.className = "t_g_calendar_cell grey";

                }
                ////!
                cell.id = this_id;
                await calendar_row.appendChild(cell);
                cell = document.getElementById(this_id);
                cell_txt.innerText = day;
                await cell.appendChild(cell_txt);
                this_foo_id = this_id.split(/-(.+)/);
                cell.addEventListener("mousedown", start_click);
                cell.addEventListener("mouseup", end_click);
                cell.addEventListener("touchstart", start_click);
                cell.addEventListener("touchend", end_click);
            }
        }
        month_head[i].innerText = `${month} ${year}`;
    }
    // end append month & year
    return;
}

function end_click(e){
    clearTimeout(pressTimer);
    if (activeTimers){
        alert(`${this_foo_id[0]}: ${this_foo_id[1]}`);
    }
    // Clear timeout
    if (e.cancelable) {
        e.preventDefault();
    }
    return false;
}
function start_click(e){
    // Set timeout
    activeTimers = true;
    pressTimer = window.setTimeout(() => {
        alert(`Holded for ${this_foo_id[0]}: ${this_foo_id[1]}`);
        //End
        activeTimers = false;
    },1000);
    // clearTimeout(pressTimer);
    if (e.cancelable) {
        e.preventDefault();
    }
    return false;
}

$(document).ready(() => {
    const device_mode = window.getComputedStyle(document.getElementById("device-mode"), null).display;
    if (device_mode == "none"){
        append_events(10);
        filtering();
        addEvent();
        calendar();
    } else {alert("Message: Moblie only")}
});