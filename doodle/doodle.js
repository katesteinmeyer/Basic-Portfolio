/* (function() {
    // Creates a new canvas element and appends it as a child
    // to the parent element, and returns the reference to
    // the newly created canvas element


    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);
        var ctx = canvas.context;
        // define a custom fillCircle method
        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        // bind mouse events
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 40; // or whatever
            var fillColor = "#1537FF";
			ctx.globalAlpha= 0.04;
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
        };
    }

    var container = document.getElementById('canvas');
    init(container, 1500, 700, 'transparent');

})();

*/
 

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var lastX;
var lastY;
var strokeColor = "red";
var strokeWidth = 2;
var mouseX;
var mouseY;
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var isMouseDown = false;
var brushSize = 20;
var brushColor = "#ff0000";
ctx.lineJoin = "round";

// command pattern -- undo
var points = [];


function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    ctx.beginPath();
    if (ctx.lineWidth != brushSize) {
        ctx.lineWidth = brushSize;
    }
    if (ctx.strokeStyle != brushColor) {
        ctx.strokeStyle = brushColor;
    }
    ctx.moveTo(mouseX, mouseY);
    points.push({
        x: mouseX,
        y: mouseY,
        size: brushSize,
        color: brushColor,
        mode: "begin"
    });
    lastX = mouseX;
    lastY = mouseY;
    isMouseDown = true;
}

function handleMouseUp(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mouseup stuff here
    isMouseDown = false;
    points.push({
        x: mouseX,
        y: mouseY,
        size: brushSize,
        color: brushColor,
        mode: "end"
    });
}


function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // mousemove
    if (isMouseDown) {
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        lastX = mouseX;
        lastY = mouseY;
        // command pattern stuff
        points.push({
            x: mouseX,
            y: mouseY,
            size: brushSize,
            color: brushColor,
            mode: "draw"
        });
    }
}

$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});


function redrawAll() {

    if (points.length == 0) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length; i++) {

        var pt = points[i];

        var begin = false;

        if (ctx.lineWidth != pt.size) {
            ctx.lineWidth = pt.size;
            begin = true;
        }
        if (ctx.strokeStyle != pt.color) {
            ctx.strokeStyle = pt.color;
            begin = true;
        }
        if (pt.mode == "begin" || begin) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
        }
        ctx.lineTo(pt.x, pt.y);
        if (pt.mode == "end" || (i == points.length - 1)) {
            ctx.stroke();
        }
    }
    ctx.stroke();
}

function undoLast() {
    points.pop();
    redrawAll();
}

$("#brush5").click(function () {
    brushSize = 1;
});
$("#brush10").click(function () {
    brushSize = 5;
});


$("#colorone").click(function () {
    brushColor = "#FF6AC9";
			ctx.globalAlpha= 0.04;
            ctx.fillCircle(x, y, radius, fillColor);
});
$("#colortwo").click(function () {
    brushColor = "#FF850B";
			ctx.globalAlpha= 0.04;
            ctx.fillCircle(x, y, radius, fillColor);
});
$("#colorthree").click(function () {
    brushColor = "#0F0FF7";
			ctx.globalAlpha= 0.04;
            ctx.fillCircle(x, y, radius, fillColor);
});
$("#colorfour").click(function () {
    brushColor = "#000000";
			ctx.globalAlpha= 0.04;
            ctx.fillCircle(x, y, radius, fillColor);
});

var interval;
$("#undo").mousedown(function () {
    interval = setInterval(undoLast, 10);
}).mouseup(function () {
    clearInterval(interval);
});