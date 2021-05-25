function takeshot() {
    let div = document.getElementById('save_me');
    html2canvas(div).then(
        function (canvas) {
            document.body.appendChild(canvas);
        })
}

$(document).ready(()=>{
    console.log("Upload Successful!");
    $("#takeshot").click(()=>{
        takeshot();
    });
});