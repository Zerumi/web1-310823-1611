const VALID_CLASS_ID = "valid";
const INVALID_CLASS_ID = "invalid";
const ERROR_CLASS_ID = "error";
const ERROR_CLASS_ID_ACTIVATE = "error active";
const STRING_EMPTY = "";

const form = document.querySelector("form");
const x_select = document.getElementById("x-select");
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");

const y_error = y_select.nextElementSibling;
const r_error = r_select.nextElementSibling;

function containsNumberAfterDecimal(inputString) {
    // Define a regular expression pattern that matches a decimal point followed by a number from 1 to 9.
    const regex = /\.0+([1-9])/;

    // Use the test() method of the regular expression to check if the pattern exists in the inputString.
    return regex.test(inputString);
}

window.addEventListener("load", () => {
    const isValidY = y_select.value.length === 0 || !Number.isNaN(+y_select.value);
    y_select.className = isValidY ? VALID_CLASS_ID : INVALID_CLASS_ID;

    const isValidR = y_select.value.length === 0 || !Number.isNaN(+r_select.value);
    r_select.className = isValidR ? VALID_CLASS_ID : INVALID_CLASS_ID;
});

// This defines what happens when the user types in the field
// nit: place single event handler on parent element // ???
y_select.addEventListener("input", () => {
    const y = +y_select.value;

    console.log(y_select.value.includes("3.") && containsNumberAfterDecimal(y_select.value));

    const isValid = y_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(y) && y >= -5 && y <= 3)
        && !(y_select.value.includes("3.") && containsNumberAfterDecimal(y_select.value))
        && !(y_select.value.includes("-5.") && containsNumberAfterDecimal(y_select.value));
    if (isValid) {
        y_select.className = VALID_CLASS_ID;
        y_error.textContent = STRING_EMPTY;
        y_error.className = ERROR_CLASS_ID;
    } else {
        y_select.className = INVALID_CLASS_ID;
    }
});

r_select.addEventListener("input", () => {
    const r = +r_select.value;

    const isValid = r_select.value.length === 0 || y_select.value === "-"
        || (!Number.isNaN(r) && r >= 2 && r <= 5)
        && !(r_select.value.includes("2.") && containsNumberAfterDecimal(r_select.value))
        && !(r_select.value.includes("5.") && containsNumberAfterDecimal(r_select.value));
    if (isValid) {
        r_select.className = VALID_CLASS_ID;
        r_error.textContent = STRING_EMPTY;
        r_error.className = ERROR_CLASS_ID;

        drawShapesByR(r); // different logic intended
    } else {
        r_select.className = INVALID_CLASS_ID;
    }
});

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
    const y = +y_select.value;
    const r = +r_select.value;

    // no default sending data to form (it will be done using xmlhttp if js is activated)
    event.preventDefault();

    const isValidY = y_select.value.length === 0 || !Number.isNaN(y);
    const isAcceptableY = y >= -5 && y <= 3
        && !(y_select.value.includes("3.") && containsNumberAfterDecimal(y_select.value))
        && !(y_select.value.includes("-5.") && containsNumberAfterDecimal(y_select.value));
    if (!isValidY) {
        y_select.className = INVALID_CLASS_ID;
        y_error.textContent = "Expected as number, like -1";
        y_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else if (!isAcceptableY) {
        y_select.className = INVALID_CLASS_ID;
        y_error.textContent = "Number should be between -5 and 3";
        y_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else {
        y_select.className = VALID_CLASS_ID;
        y_error.textContent = STRING_EMPTY;
        y_error.className = ERROR_CLASS_ID;
    }

    const isValidR = r_select.value.length === 0 || !Number.isNaN(r);
    const isAcceptableR = r >= 2 && r <= 5
        && !(r_select.value.includes("2.") && containsNumberAfterDecimal(r_select.value))
        && !(r_select.value.includes("5.") && containsNumberAfterDecimal(r_select.value));
    if (!isValidR) {
        r_select.className = INVALID_CLASS_ID;
        r_error.textContent = "Expected as number, like 3";
        r_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else if (!isAcceptableR) {
        r_select.className = INVALID_CLASS_ID;
        r_error.textContent = "Number should be between 2 and 5";
        r_error.className = ERROR_CLASS_ID_ACTIVATE;
    } else {
        r_select.className = VALID_CLASS_ID;
        r_error.textContent = STRING_EMPTY;
        r_error.className = ERROR_CLASS_ID;
    }

    if (isValidY && isValidR && isAcceptableY && isAcceptableR) {
        drawPoint(x_select.value, y, r);
        getIsIntersects(x_select.value, y_select.value, r_select.value);
    }
});