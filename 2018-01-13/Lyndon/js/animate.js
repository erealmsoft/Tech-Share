document.getElementById('animate-dom-1').onclick = function(){
    Tween.animate(0, 300, 1000, Tween.Expo.easeOut, function(value, time){
        document.getElementById('setInterval-dom-1').scrollTo(0, value);
    })
}

document.getElementById('animate-dom-2').onclick = function(){
    Tween.animate(20, 300, 1200, Tween.Bounce.easeOut, function(value, time){
        document.getElementById('setInterval-dom-2').style.top = value+'px';
    })
}

var image = new Image();
image.src = 'https://img.erealmsoft.com/tech-share/img/yeoman.png';
var timer;
document.getElementById('animate-dom-3').onclick = function(){
    // get canvas panel data & clear;
    var canvas = new CanvasDraw(panel);
    if(timer){
        clearInterval(timer);
    }
    var width = 200;
    var height = 120;
    canvas.clear();
    canvas.drawImg(image, 0, 0, width, height);
    var imageData = canvas.cxt.getImageData(0, 0, width, height);
    
    var pixels = [];
    var imgX = (canvas.panel.width-width)/2;
    var imgY =  (canvas.panel.height-height)/2

    // get rgba data
    imageData.data.forEach(function (data, index) {
        var location = parseInt(index / 4);
        pixels[location] = pixels[location] || {};
        switch (index % 4) {
            case 0:
                pixels[location].r = data;
                break;
            case 1:
                pixels[location].g = data;
                break;
            case 2:
                pixels[location].b = data;
                break;
            case 3:
                pixels[location].a = (pixels[location].r || pixels[location].g || pixels[location].a) ? 255 : 0;
                break;
        }
        pixels[location].x = location % width + imgX;
        pixels[location].y = parseInt(location / width) + imgY;
    })

    pixels = pixels.filter(function(pixel){
        return pixel.a != 0;
    })
    // get pixels start data x,y is random
    var startPixels = pixels.map(function (pixel) {
        var point = {
            x:parseInt(Math.random()*200),
            y:parseInt(Math.random()*200-200)
        }
        return point
    });

    // get current pixels data
    var currentPixels = startPixels.map(function (pixel, index) {
        var point = {
            x:pixel.x,
            y:pixel.y,
            r:pixels[index].r,
            g:pixels[index].g,
            b:pixels[index].b,
            a:0
        }
        return point
    });

    var animate = function (duration, tween) {
        var currentFrame = 0;
        var endFrame = duration / 1000 * 60;
        var interval = 1000 / 60;
        var update = function () {
            currentFrame++;
            currentPixels.forEach(function (pixel, index) {
                pixel.x = tween(currentFrame, pixel.x, pixels[index].x-pixel.x, endFrame);
                pixel.y = tween(currentFrame, pixel.y, pixels[index].y-pixel.y, endFrame);
                pixel.a = Tween.Quad.easeOut(currentFrame, 0, pixels[index].a || 0, endFrame);
            });
        }
        var render = function () {
            canvas.clear()
            currentPixels.forEach(function (pixel) {
                canvas.drawPixel(pixel.x, pixel.y, 'rgba(' + pixel.r + ',' + pixel.g + ',' + pixel.b + ',' + pixel.a / 255);
            });
        }
        render();
        timer = setInterval(function () {
            if(currentFrame<endFrame){
                render();
                update();
            }else{
                clearInterval(timer);
            }
        }, interval);
    }
    animate(4000, Tween.Cubic.easeIn);
}