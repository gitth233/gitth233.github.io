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
        ctx.fillStyle = '#BBDEFB';
        ctx.lineJoin = 'round';

        wave = new sineWave();
        if(WIDTH <=640)
            wave.VALUE = Math.PI /100;
        
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
        this.VALUE = 2 * Math.PI / 100;
    }

    sineWave.prototype.draw = function () {
        ctx.beginPath();
        ctx.moveTo(0, WAVEPOSITION);
        for (var x = 0; x < WIDTH; x += 1) {
            var xpos = x * this.lineWidth,
                ypos = WAVEPOSITION + Math.sin(this.VALUE * x + this.counter / 100) * this.amplitude;
            ctx.lineTo(xpos, ypos);
        }
        ctx.lineTo(WIDTH, HEIGHT);
        ctx.lineTo(0, HEIGHT);
        ctx.closePath();
        ctx.fill();

        this.counter++;
    };

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wave.draw();
        window.requestAnimationFrame(draw);
    }

    function resize(width, height) {
        setCanvasSize(width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = '#BBDEFB';

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