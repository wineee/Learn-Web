function displayDate(){
    document.getElementById("Time").innerHTML=Date();
}

function updataCnt(){
    let cnt = [0,373,367,6];
    document.getElementById("header_danger").innerHTML = "<h1>"+cnt[0]+"<h1>";
    document.getElementById("header_warning").innerHTML = "<h1>"+cnt[1]+"<h1>";
    document.getElementById("header_success").innerHTML = "<h1>"+cnt[2]+"<h1>";
    document.getElementById("header_dark").innerHTML = "<h1>"+cnt[3]+"<h1>";
}