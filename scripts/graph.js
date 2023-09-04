const canvas = document.getElementById("graph");

// Define axis labels
const xAxisLabel = "X";
const yAxisLabel = "Y";

function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // Define the canvas dimensions
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        let xAxisScale = canvasWidth / 10;
        let yAxisScale = canvasHeight / 10;

        console.log(canvasWidth);
        console.log(canvasHeight);

        console.log(xAxisScale);
        console.log(yAxisScale);

        // Define the origin point for the axes
        let originX = canvasWidth / 2;
        let originY = canvasHeight / 2;

        // Draw the x-axis
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvasWidth, originY);
        ctx.stroke();

        // Draw the y-axis
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvasHeight);
        ctx.stroke();

        // Label the axes
        ctx.font = '14px Arial';
        ctx.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 5);
        ctx.fillText(yAxisLabel, canvas.width / 2 + 5, 15);

        // Draw scale markings on the axes
        for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
            let scalePos = axesToCanvasCoordinates(i, 0, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x, scalePos.y - 5);
            ctx.lineTo(scalePos.x, scalePos.y + 5);
            ctx.stroke();
            ctx.fillText(i, scalePos.x - 10, scalePos.y + 20);
        }

        for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
            let scalePos = axesToCanvasCoordinates(0, j, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x - 5, scalePos.y);
            ctx.lineTo(scalePos.x + 5, scalePos.y);
            ctx.stroke();
            ctx.fillText(j, scalePos.x + 10, scalePos.y + 5);
        }
    }
}

function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
    // Get the canvas context
    let ctx = canvas.getContext('2d');

    // Define the origin point for the axes
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    // Calculate the canvas coordinates
    let canvasX = originX + xAxes;
    let canvasY = originY - yAxes; // Subtract yAxes since the y-axis is inverted in canvas

    return { x: canvasX, y: canvasY };
}

function canvasToAxesCoordinates(canvasX, canvasY, canvas) {
    // Get the canvas context
    let ctx = canvas.getContext('2d');

    // Define the origin point for the axes
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    // Calculate the scaled axes coordinates
    let xAxes = canvasX - originX;
    let yAxes = -(canvasY - originY); // Invert yAxes to match the axes system

    return { x: xAxes, y: yAxes };
}

draw();

let canvasPoint = { x: 125, y: 125 }; // Replace with your desired canvas coordinates
let axesPoint = canvasToAxesCoordinates(canvasPoint.x, canvasPoint.y, canvas);

// Now, axesPoint contains the scaled axes coordinates of the canvas point
console.log('Axes Coordinates: x = ' + axesPoint.x + ', y = ' + axesPoint.y);
