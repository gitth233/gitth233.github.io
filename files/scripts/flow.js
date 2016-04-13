var FlowDrawer = function () {
    var canvas,
        canvasID,
        WIDTH,
        HEIGHT,
        ctx,
        objNum = 0,
        objList = [],
        resolution = [],
        strokeStyle = '#42A5F5',
        lineWidth = 3,
        toDegree = Math.PI / 180;

    // Circle Object, moveY is the object's moving speed on the y-axis
    function Circle(x, y, radius, moveY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.moveY = moveY;
    }

    // Circle Object's Draw Method
    Circle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    };

    // Square Object, moveY is the object's moving speed on the y-axis, angle is the initial rotation the object has
    function Square(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }

    // Square Object's Draw Method
    Square.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * toDegree);
        ctx.strokeRect(-this.length / 2, -this.length / 2, this.length, this.length);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    // Triangle Object, moveY is the object's moving speed on the y-axis, angle is the initial rotation the object has
    function Triangle(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;

        // The distance from the centre of the object to the origin of the canvas
        this.xFromOrigin = this.length / 2;
        this.yFromOrigin = Math.sqrt(3) / 4 * this.length;
    }

    // Triangle Object's Draw Method
    Triangle.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * toDegree);

        ctx.beginPath();
        ctx.moveTo(-this.xFromOrigin, -this.yFromOrigin);
        ctx.lineTo(this.xFromOrigin, -this.yFromOrigin);
        ctx.lineTo(0, this.yFromOrigin);
        ctx.closePath();
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    function setCanvasID(id) {
        canvasID = id;
    }

    function setCanvasSize(width, height) {
        WIDTH = width;
        HEIGHT = height;
    }

    // Call the function when the size of the canvas is changed
    function resize(width, height) {
        var check;
        setCanvasSize(width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        // Check if the canvas requires to change the number of the objects
        check = changeObjNumOnResize();
        if (objNum != check) {
            objNum = check;
        }
    }


    // If the width of the current canvas is larger than 1366px, use the first element in the resolution array, if it's between 1366px and 640px, use the second element, if it's less than 640px, use the third element
    function changeObjNumOnResize() {
        if (WIDTH > 1366) {
            return 0;
        } else if (WIDTH > 640) {
            return 1;
        } else {
            return 2;
        }
    }

    // Return the number of objects drawn on the canvas
    function getObjNum() {
        return resolution[objNum];
    }

    // Set the number of objects to be drawn on the canvas. Three parameters for three differernt screen resolution; larger than 1366, between 1366px and 640px, and less than 640px 
    function setObjNum(num1, num2, num3) {
        resolution[0] = num1;
        resolution[1] = num2;
        resolution[2] = num3;
    }

    function getStrokeStyle() {
        return strokeStyle;
    }

    function setStrokeStyle(color) {
        strokeStyle = color;
    }

    function getLineWidth() {
        return lineWidth;
    }

    function setLineWidth(width) {
        lineWidth = width;
    }

    // Return an integer random number; min value is optional (default is set to 0) 
    function randomNum(max, min) {
        min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Return either 0 or 1; used to indicate the direction of rotation
    function getDirection() {
        return randomNum(2) === 0 ? -1 : 1;
    }

    // Initailze the canvas
    function init() {
        canvas = document.getElementById(canvasID);
        ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        // Create the objects based on the current size of the canvas
        objNum = changeObjNumOnResize(WIDTH);
        for (var x = 0; x < resolution[objNum]; x++) {
            createNewObj();
        }
        window.requestAnimationFrame(draw);
    }

    // Create Objects function
    function createNewObj() {
        objList.push(new Square(randomNum(WIDTH), randomNum(HEIGHT), 20, 2, randomNum(0, 90), randomNum(1, 3) * getDirection()));

        objList.push(new Circle(randomNum(WIDTH), randomNum(HEIGHT), 10, 2));

        objList.push(new Triangle(randomNum(WIDTH), randomNum(HEIGHT), 20, 2, randomNum(0, 90), randomNum(1, 3) * getDirection()));
    }

    // Update the graph with objects' current status
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var x = 0; x < resolution[objNum] * 3; x++) {
            var obj = objList[x];
            if (!obj) {
                createNewObj();
                obj = objList[x];
            }
            obj.y -= obj.moveY;
            if (!(obj instanceof Circle)) {
                obj.angle += obj.angularSpeed;
            }
            if (obj.y < -20) {
                obj.y = HEIGHT;
                obj.x = randomNum(WIDTH);
                //obj.moveY = randomNum(1, 4);
            }

            obj.draw();
        }
        window.requestAnimationFrame(draw);
    }

    // Expose only the public functions to the user
    return {
        setCanvasID: setCanvasID,
        setCanvasSize: setCanvasSize,
        getObjNum: getObjNum,
        setObjNum: setObjNum,
        getStrokeStyle: getStrokeStyle,
        setStrokeStyle: setStrokeStyle,
        getLineWidth: getLineWidth,
        setLineWidth: setLineWidth,
        init: init,
        resize: resize
    };
};