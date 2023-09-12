function getIsIntersects(select_x, select_y, select_r) {
    const req = new XMLHttpRequest();
    const urlParams =
        new URLSearchParams({"x-select": select_x, "y-select": select_y, "r-select": select_r});
    console.log(urlParams.toString());
    req.open("GET",
        "./actions/check-hit.php?" + urlParams.toString(),
        true);
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            if (req.status === 200 || req.status === 400) {
                const values = req.responseText.split(';');
                console.log("Got data! " + values);
                addToTable(values[0], values[1], values[2], values[3], values[4], values[5]);
            } else {
                console.error("Error loading page / " + req.statusText + " " + req.readyState + "\n");
            }
        }
    };
    req.send(null);
}