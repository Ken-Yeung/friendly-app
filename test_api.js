function takeshot() {
    let div = document.getElementById('save_me');
    html2canvas(div, {
        dpi: 144,
        onrendered: myRenderFunction
    });
}

function myRenderFunction(canvas){
    let src = canvas.toDataURL("image/jpeg", .9);
    console.log(src);
    let img = document.createElement("img");
    img.src = src;
    img.className = "test-img";
    document.body.appendChild(img);
}

$(document).ready(()=>{
    console.log("Upload Successful!");
    $("#takeshot").click(()=>{
        takeshot();
    });
});