var WaveDrawer = function () {
    var canvas,
        canvasID,
        WIDTH,
        HEIGHT,
        WAVEPOSITION,
        ctx,
        wave;


    function init() {
        canvas = document.getElementById(canvasID);
        ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.fillStyle = '#42A5F5';
        ctx.lineJoin = 'round';

        wave = new sineWave();
        if (WIDTH <= 640)
            wave.VALUE = Math.PI / 100;

        window.requestAnimationFrame(draw);
    }

    function setCanvasID(id) {
        canvasID = id;
    }

    function setCanvasSize(width, height) {
        WIDTH = width;
        HEIGHT = height;
    }

    function setWavePostion(position) {
        WAVEPOSITION = position;
    }

    function setAmplitude(amplitude) {
        wave.amplitude = amplitude;
    }

    function random(max, min) {
        min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sineWave() {
        this.lineWidth = WIDTH / 100;
        this.amplitude = 30;
        this.counter = 1;
        this.VALUE = 2 * Math.PI/WIDTH;
        this.boatY1 =0;
        this.boatY =0;
        this.boatY2 =0;
        this.boatAngle =0;
    }

    sineWave.prototype.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.translate(0,WAVEPOSITION);
        for (var x = 0; x < WIDTH; x +=5) {
            var xpos = x,
                ypos = Math.sin(this.VALUE * x + this.counter / 100) * this.amplitude;
            ctx.lineTo(xpos, ypos);
            if(x === 100){
                this.boatY1= ypos;
            }
            else if(x === 125){
                this.boatY = ypos;
            }
            else if(x === 150)
                this.boatY2 =ypos;
        }
        ctx.lineTo(WIDTH, HEIGHT);
        ctx.lineTo(0, HEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        this.counter++;
        this.boatAngle = -Math.atan((this.boatY1-this.boatY2)/50);
    };

    function drawBoat() {
        ctx.save();
        ctx.translate(125,WAVEPOSITION+wave.boatY);
        ctx.rotate(wave.boatAngle);
       console.log(wave.boatAngle);
        
        ctx.beginPath();
        ctx.moveTo(-25, 0);
        ctx.quadraticCurveTo(-37, 0, -50, -20);
        ctx.lineTo(55, -20);
        ctx.quadraticCurveTo(37, 0, 25, 0);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-37, -25);
        ctx.quadraticCurveTo(-13, -50, 0, -100);
        ctx.lineTo(0, -25);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(5, -25);
        ctx.lineTo(5, -75);
        ctx.quadraticCurveTo(10, -55, 37, -25);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wave.draw();
        drawBoat();
        window.requestAnimationFrame(draw);
    }

    function resize(width, height) {
        setCanvasSize(width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = '#42A5F5';

    }

    return {
        init: init,
        setCanvasID: setCanvasID,
        setCanvasSize: setCanvasSize,
        setWavePosition: setWavePostion,
        setAmplitude: setAmplitude,
        resize: resize
    };
};