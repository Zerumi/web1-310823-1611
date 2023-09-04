const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Define axis labels
const xAxisLabel = "X";
const yAxisLabel = "Y";

let xAxisScale;
let yAxisScale;

function draw() {
    if (canvas.getContext) {
        ctx.fillStyle = "rgb(0,0,0)";

        // Define the canvas dimensions
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        xAxisScale = canvasWidth / 10;
        yAxisScale = canvasHeight / 10;

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
            ctx.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
        }

        for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
            let scalePos = axesToCanvasCoordinates(0, j, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x - 5, scalePos.y);
            ctx.lineTo(scalePos.x + 5, scalePos.y);
            ctx.stroke();
            ctx.fillText(rescaleYAxesCoordinate(j), scalePos.x + 10, scalePos.y + 5);
        }
    }
}

function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
    // Define the origin point for the axes
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    // Calculate the canvas coordinates
    let canvasX = originX + xAxes;
    let canvasY = originY - yAxes; // Subtract yAxes since the y-axis is inverted in canvas

    return { x: canvasX, y: canvasY };
}

function rescaleXAxesCoordinate(coordinate) {
    return coordinate / xAxisScale;
}

function rescaleYAxesCoordinate(coordinate) {
    return coordinate / yAxisScale;
}

function scaleXAxesCoordinate(coordinate) {
    return coordinate * xAxisScale;
}

function scaleYAxesCoordinate(coordinate) {
    return coordinate * yAxisScale;
}

function drawShapesByR(r) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    draw();

    // literally (0;0)

    let startPointInAxes = { x: 0, y: 0 };
    let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);

    // draw square

    let endPointInAxes = {x: r, y: r};
    let endScaledPointInAxes = {x: scaleXAxesCoordinate(endPointInAxes.x), y: scaleYAxesCoordinate(endPointInAxes.y)};
    //let endPointInCanvas = axesToCanvasCoordinates(endScaledPointInAxes.x, endScaledPointInAxes.y, canvas);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.beginPath();
    ctx.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);
    //console.log(endScaledPointInAxes.x, -endScaledPointInAxes.y);

    // draw triangle
    let secondTrianglePointInAxes = {x: r, y: 0};
    let thirdTrianglePointInAxes = {x: 0, y: -r};
    drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);

    // draw 1/4 circle
    let calculatedRadius = scaleXAxesCoordinate(r/2);

    ctx.beginPath();
    ctx.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, 3 * Math.PI / 2, Math.PI, true);
    ctx.fill();

    // draw missing triangle
    let secondTrianglePointInAxesM = {x: -r/2, y: 0};
    let thirdTrianglePointInAxesM = {x: 0, y: r/2};
    drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxesM, thirdTrianglePointInAxesM);
}

function drawTriangle (ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) {
    let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
    let secondScaledTrianglePointInAxes = {x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
        y: scaleYAxesCoordinate(secondTrianglePointInAxes.y)}
    let thirdScaledTrianglePointInAxes = {x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
        y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y)};
    let secondTrianglePointInCanvas = axesToCanvasCoordinates
    (secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y, canvas);
    let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates
    (thirdScaledTrianglePointInAxes.x, thirdScaledTrianglePointInAxes.y, canvas);

    ctx.beginPath();
    ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
    ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
    ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
    ctx.fill();
}

draw();

/*
let canvasPoint = { x: 400, y: 100 }; // Replace with your desired canvas coordinates
let axesPoint = canvasToAxesCoordinates(canvasPoint.x, canvasPoint.y, canvas);

// Now, axesPoint contains the scaled axes coordinates of the canvas point
console.log('Axes Coordinates: x = ' + axesPoint.x + ', y = ' + axesPoint.y);

let pointInAxes = { x: 150, y: 150 }; // Replace with your desired coordinates
let pointInCanvas = axesToCanvasCoordinates(pointInAxes.x, pointInAxes.y, canvas);

// Now, pointInCanvas contains the canvas coordinates of the point in the axes system
console.log('Canvas Coordinates: x = ' + pointInCanvas.x + ', y = ' + pointInCanvas.y);
*/
