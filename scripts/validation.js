const form = document.querySelector("form");
const x_select = document.getElementById("x-select");
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");

const y_error = y_select.nextElementSibling;
const r_error = r_select.nextElementSibling;

window.addEventListener("load", () => {
    const isValidY = y_select.value.length === 0 || !Number.isNaN(+y_select.value);
    y_select.className = isValidY ? "valid" : "invalid";

    const isValidR = y_select.value.length === 0 || !Number.isNaN(+r_select.value);
    r_select.className = isValidR ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
// nit: place single event handler on parent element
y_select.addEventListener("input", () => {
    const y = +y_select.value;

    const isValid = y_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(y) && y >= -5 && y <= 3);
    if (isValid) {
        y_select.className = "valid";
        y_error.textContent = "";
        y_error.className = "error";
    } else {
        y_select.className = "invalid";
    }
});

r_select.addEventListener("input", () => {
    const r = +r_select.value;

    const isValid = r_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(r) && r >= 2 && r <= 5);
    if (isValid) {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";

        drawShapesByR(r);
    } else {
        r_select.className = "invalid";
    }
});

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
    const y = +y_select.value;
    const r = +r_select.value;

    // no default sending data to form (it will be done using xmlhttp if js is activated)
    // FIXME:  extract "error active" to constant
    event.preventDefault();

    const isValidY = y_select.value.length === 0 || !Number.isNaN(y);
    const isAcceptableY = y >= -5 && y <= 3;
    if (!isValidY) {
        y_select.className = "invalid";
        y_error.textContent = "Expected as number, like -1";
        y_error.className = "error active";
    } else if (!isAcceptableY) {
        y_select.className = "invalid";
        y_error.textContent = "Number should be between -5 and 3";
        y_error.className = "error active";
    } else {
        y_select.className = "valid";
        y_error.textContent = "";
        y_error.className = "error";
    }

    const isValidR = r_select.value.length === 0 || !Number.isNaN(r);
    const isAcceptableR = r >= 2 && r <= 5;
    if (!isValidR) {
        r_select.className = "invalid";
        r_error.textContent = "Expected as number, like 3";
        r_error.className = "error active";
    } else if (!isAcceptableR) {
        r_select.className = "invalid";
        r_error.textContent = "Number should be between 2 and 5";
        r_error.className = "error active";
    } else {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";
    }

    if (isValidY && isValidR && isAcceptableY && isAcceptableR) {
        drawPoint(x_select.value, y, r);
        getData(x_select.value, y_select.value, r_select.value);
    }
});