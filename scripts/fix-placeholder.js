const inputs = document.getElementsByClassName("input-select");

let max_width = Number.MIN_VALUE;

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('placeholder').length > max_width)
        max_width = inputs[i].getAttribute('placeholder').length;
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('size', max_width.toString());
}