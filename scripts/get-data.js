function getData(select_x, select_y, select_r) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET",
        "../actions/check-hit.php?x-select=" + select_x + "&y-select=" + select_y + "&r-select=" + select_r);
    req.send();
}

function reqListener() {
    alert(this.responseText);
}