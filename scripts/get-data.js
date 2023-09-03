function getData(select_x, select_y, select_r) {
    const req = new XMLHttpRequest();
    req.open("GET",
        "../actions/check-hit.php?x-select=" + select_x + "&y-select=" + select_y + "&r-select=" + select_r,
        true);
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            if(req.status === 200)
                alert(req.responseText);
                let values = req.responseText.split(';');
                //addToTable();
            else
                console.error("Error loading page / " + req.statusText + "\n");
        }
    };
    req.send(null);
}