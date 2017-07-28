var WaveDrawer = function () {
    var canvas,
        canvasID,
        WIDTH,
        HEIGHT,
        WAVEPOSITION,
        fillStyle,
        ctx,
        wave;

    // Initialize the canvas
    function init(opts) {
        canvas = document.getElementById(opts.id);
        ctx = canvas.getContext('2d');

        setCanvasSize(opts.width,opts.height);

        fillStyle = opts.fillStyle;
        ctx.fillStyle = fillStyle;

        ctx.lineJoin = 'round';

        WAVEPOSITION = opts.wave_position;

        wave = new sineWave();

        // If the screen size is less than 640 px, decrease the frequency of the sine function
        if (WIDTH <= 640) {
            wave.FREQUENCY = Math.PI / WIDTH;
        }

        window.requestAnimationFrame(draw);
    }


    function setCanvasSize(width, height) {
        WIDTH = width;
        HEIGHT = height;

        canvas.width = width;
        canvas.height = height;
    }

    function setAmplitude(amplitude) {
        wave.amplitude = amplitude;
    }
    /*
        function random(max, min) {
            min = arguments[1] || 0;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    */

    // Sine wave object
    function sineWave() {
        this.amplitude = 30;
        this.counter = 1;
        this.FREQUENCY = 2 * Math.PI / WIDTH;
        this.boatY1 = 0;
        this.boatY = 0;
        this.boatY2 = 0;
        this.boatAngle = 0;
    }


    // Draw the sine wave by calculating the points' positions on the canvas. f(x) = amplitude * sin(frequency * x + phase shift)
    sineWave.prototype.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.translate(0, WAVEPOSITION);
        for (var x = 0; x <= WIDTH + 5; x += 5) {
            var xpos = x,
                ypos = Math.sin(this.FREQUENCY * x + this.counter / 100) * this.amplitude;
            ctx.lineTo(xpos, ypos);

            // Save the y-positions of the current frame to calculate the angle of rotation for the boat
            if (x === 100) {
                this.boatY1 = ypos;
            } else if (x === 125) {
                this.boatY = ypos;
            } else if (x === 150) {
                this.boatY2 = ypos;
            }

        }

        ctx.lineTo(WIDTH, HEIGHT);
        ctx.lineTo(0, HEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        this.counter++;

        // Reset counter
        if (this.counter >= 628) {
            this.counter = 1;
        }

        this.boatAngle = -Math.atan((this.boatY1 - this.boatY2) / 50);
    };

    function drawBoat() {
        ctx.save();
        ctx.translate(125, WAVEPOSITION + wave.boatY);
        ctx.rotate(wave.boatAngle);

        // Draw the body of the boat
        ctx.beginPath();
        ctx.moveTo(-25, 0);
        ctx.quadraticCurveTo(-37, 0, -50, -20);
        ctx.lineTo(55, -20);
        ctx.quadraticCurveTo(37, 0, 25, 0);
        ctx.closePath();
        ctx.fill();

        // Draw the larger triangle
        ctx.beginPath();
        ctx.moveTo(-37, -25);
        ctx.quadraticCurveTo(-13, -50, 0, -100);
        ctx.lineTo(0, -25);
        ctx.closePath();
        ctx.fill();

        // Draw the smaller triangle
        ctx.beginPath();
        ctx.moveTo(5, -25);
        ctx.lineTo(5, -75);
        ctx.quadraticCurveTo(10, -55, 37, -25);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }


    // Draw the graph for the current frame
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wave.draw();
        drawBoat();
        window.requestAnimationFrame(draw);
    }

    // Call the function when the size of the canvas is changed
    function resize(width = window.innerWidth, height = window.innerHeight) {
        setCanvasSize(width, height);
        ctx.fillStyle = fillStyle;
    }

    // Expose only the public functions to the user
    return {
        init: init,
        setAmplitude: setAmplitude,
        resize: resize
    };
};
