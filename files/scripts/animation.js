var CanvasDrawer = (function () {
    var canvas = document.getElementById('canvas'),
        WIDTH,
        HEIGHT,
        ctx = canvas.getContext('2d'),
        squareList = [],
        circleList = [],
        triangleList = [],
        objNum = 8,
        strokeStyle = '#42A5F5',
        lineWidth = 3;

    function Circle(x, y, radius, moveY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.moveY = moveY;
    }

    Circle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    };

    function Square(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }

    Square.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.strokeRect(-this.length / 2, -this.length / 2, this.length, this.length);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    function Triangle(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }

    Triangle.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(-this.length / 2, -Math.sqrt(3) / 4 * this.length);
        ctx.lineTo(this.length / 2, -Math.sqrt(3) / 4 * this.length);
        ctx.lineTo(0, Math.sqrt(3) / 4 * this.length);
        ctx.closePath();
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    function getObjNum() {
        return objNum;
    }

    function setObjNum(num) {
        objNum = num;
    }

    function setStrokeStyle(color) {
        strokeStyle = color;
    }

    function setLineWidth(width) {
        lineWidth = width;
    }

    function randomNum(max, min) {
        min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getDirection() {
        return randomNum(2) === 0 ? -1 : 1;
    }

    function init() {
        WIDTH = $('#canvas').parent().innerWidth();
        HEIGHT = $('#canvas').parent().innerHeight();
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        for (var x = 0; x < objNum; x++) {
            squareList.push(new Square(randomNum(WIDTH), randomNum(HEIGHT), randomNum(20, 25), randomNum(1, 4), randomNum(0, 90), randomNum(1, 3) * getDirection()));

            circleList.push(new Circle(randomNum(WIDTH), randomNum(HEIGHT), randomNum(10, 13), randomNum(1, 4)));

            triangleList.push(new Triangle(randomNum(WIDTH), randomNum(HEIGHT), randomNum(20, 25), randomNum(1, 4), randomNum(0, 90), randomNum(1, 3) * getDirection()));
        }
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var x = 0; x < objNum; x++) {
            var square = squareList[x];
            square.y -= square.moveY;
            square.angle += square.angularSpeed;
            if (square.y < -20) {
                square.y = HEIGHT;
                square.x = randomNum(WIDTH);
                square.moveY = randomNum(1, 4);
            }
            var circle = circleList[x];
            circle.y -= circle.moveY;
            if (circle.y < -20) {
                circle.y = HEIGHT;
                circle.x = randomNum(WIDTH);
                circle.moveY = randomNum(1, 4);
            }
            var triangle = triangleList[x];
            triangle.y -= triangle.moveY;
            triangle.angle += triangle.angularSpeed;
            if (triangle.y < -20) {
                triangle.y = HEIGHT;
                triangle.x = randomNum(WIDTH);
                triangle.moveY = randomNum(1, 4);
            }

            squareList[x].draw();
            circleList[x].draw();
            triangleList[x].draw();
        }
        window.requestAnimationFrame(draw);
    }

    function loadCanvas() {
        init();
        window.requestAnimationFrame(draw);
    }

    return {
        getObjNum: getObjNum,
        setObjNum: setObjNum,
        setStrokeStyle: setStrokeStyle,
        setLineWidth: setLineWidth,
        init: init,
        loadCanvas: loadCanvas
    };
})();