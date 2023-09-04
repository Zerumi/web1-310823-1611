const canvas = document.getElementById("graph");

// Define axis labels
const xAxisLabel = "X";
const yAxisLabel = "Y";

// Define the axis scale
const xAxisScale = 10; // Adjust the scale value as needed
const yAxisScale = 10; // Adjust the scale value as needed

function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // Define the canvas dimensions
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

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
        ctx.font = '7px Arial';
        ctx.fillText(xAxisLabel, canvas.width - 10, canvas.height / 2 - 5);
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

draw();