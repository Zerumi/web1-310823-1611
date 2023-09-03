const form = document.querySelector("form");
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");
const y_error = y_select.nextElementSibling;
const r_error = r_select.nextElementSibling;

const numberRegExp = /^\d+$/;

window.addEventListener("load", () => {
    const isValidY = y_select.value.length === 0 || numberRegExp.test(y_select.value);
    y_select.className = isValidY ? "valid" : "invalid";

    const isValidR = y_select.value.length === 0 || numberRegExp.test(r_select.value);
    r_select.className = isValidR ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
y_select.addEventListener("input", () => {
    const isValid = y_select.value.length === 0 || numberRegExp.test(y_select.value);
    if (isValid) {
        y_select.className = "valid";
        y_error.textContent = "";
        y_error.className = "error";
    } else {
        y_select.className = "invalid";
    }
});

r_select.addEventListener("input", () => {
    const isValid = r_select.value.length === 0 || numberRegExp.test(r_select.value);
    if (isValid) {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";
    } else {
        r_select.className = "invalid";
    }
});

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // todo: known issue: overflow looks ugly, fix css

    const isValidY = y_select.value.length === 0 || numberRegExp.test(y_select.value);
    if (!isValidY) {
        y_select.className = "invalid";
        y_error.textContent = "Expected an number";
        y_error.className = "error active";
    } else {
        y_select.className = "valid";
        y_error.textContent = "";
        y_error.className = "error";
    }

    const isValidR = r_select.value.length === 0 || numberRegExp.test(r_select.value);
    if (!isValidR) {
        r_select.className = "invalid";
        r_error.textContent = "Expected an number";
        r_error.className = "error active";
    } else {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";
    }
});