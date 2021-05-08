let $body = $(document.body);
let scrollPosition = 0;

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
    return date;
}

async function get_api(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function calendar(){
    let main_data_lst = {};
    await get_api(`https://beagleetech.ga/calendar_dates?date=${current_date().toString()}`).then(res=>{
        main_data_lst = res;
    });
    let lst = main_data_lst["details"];

    create_calendar_cell(lst);
    return;
}

function create_calendar_cell(lst){
    const month_mask = document.getElementsByClassName("t_g_months");
    const month_head = document.getElementsByClassName("t_g_hd mid calendar");
    console.log(lst);
    // append month & year
    for(let i = 0; i < month_mask.length; i++){
        let month = lst[i]["month"][0];
        let year = lst[i]["year"];
        month_head[i].innerText = `${month} ${year}`;
    }
    // end append month & year
    return;
}

$(document).ready(() => {
    const device_mode = window.getComputedStyle(document.getElementById("device-mode"), null).display;
    if (device_mode == "none"){
        append_events(6);
        filtering();
        addEvent();
        calendar();
    } else {alert("Message: Moblie only")}
});