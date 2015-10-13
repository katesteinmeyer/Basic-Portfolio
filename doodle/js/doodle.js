
           var  fillColor1 = "#1537FF";
(function() {
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
        ctx.clearTo(fillColor || "");

        // bind mouse events
        canvas.node.onmousemove = function(e) {
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 10; 
			ctx.globalAlpha= 0.05;
			ctx.globalCompositeOperation = 'multiply';
			ctx.beginPath();
            ctx.fillCircle(x, y, radius, fillColor1);
			ctx.closePath();
			ctx.fill();
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

//Different colors

function undoLast() {
    points.pop();
    redrawAll();
}

$("#colorone").click(function () {
     fillColor1 = "#FF6AC9";
});
$("#colortwo").click(function () {
    fillColor1 = "#FF850B";
});
$("#colorthree").click(function () {
    fillColor1 = "#0F0FF7";
});
$("#colorfour").click(function () {
    fillColor1 = "#000000";
});
$("#colorfive").click(function () {
    fillColor1 = "#24FF43";
});
$("#colorsix").click(function () {
    fillColor1 = "#A803FF";
});
$("#colorseven").click(function () {
    fillColor1 = "#1FAD8B";
});
$("#coloreight").click(function () {
    fillColor1 = "#FF0000";
});
$("#colornine").click(function () {
    fillColor1 = "#EDFF00";
});
$("#colorten").click(function () {
    fillColor1 = "#EDFF00";
});
var interval;
$("#undo").mousedown(function () {
    interval = setInterval(undoLast, 10);
}).mouseup(function () {
    clearInterval(interval);
});
