var panel = document.getElementById('panel-num');
var maxw = document.body.offsetWidth;
var maxh = 700;
panel.setAttribute('width', maxw);
panel.setAttribute('height', maxh)
var numPanel = new CanvasDraw(panel);
var cxt = panel.getContext('2d');
var ballRadius = 15;
var ballMargin = 5;

var Ball = function(x, y, c, g){
    this.x = x;
    this.y = y;
    this.g = g || parseInt((Math.random() + 3)*100)/100;
    this.vx = parseInt((Math.random()*5 + 8)*100)/100 ;
    this.vy = -10;
    this.c = c;
    var _this = this;
    this.draw = function(){
        cxt.beginPath();
        cxt.arc(_this.x, _this.y, ballRadius, 0, Math.PI*2);
        cxt.fillStyle = _this.c;
        cxt.fill();
        cxt.closePath();
    }
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.g;
        if(this.y+ballRadius>=maxh){
            this.y = maxh - ballRadius;
            if(this.vy < 20){
                this.vy = 0;
            }else{
                this.vy = -1 * this.vy * 0.6;
            }
        }
    }
}

var oneBalls = [];
var tenBalls = [];
var timeBalls = [];
var sportBalls = [];
var seconds = 0;
var oneNum = 0;
var tenNum = 0;
var oldOneNum = 61;
var oldTenNum = 7;
var oldSeconds = 7;

function renderTime(){
    
    seconds = new Date().getSeconds();
    
    var marginLeft = 250;
    var marginTop = 200;
    var margin = 5;
    var timeMargin = 160;
    
    // 如果時間改變就推進新的小球
    if(seconds !== oldSeconds){
        var color = '#39f';
        var oneNum = seconds%10 || 0;
        var tenNum = parseInt(seconds/10) || 0;
        if(oldOneNum !== oneNum){
            oneBalls.forEach(function(ball){
                ball.c = rc();
            })
            oneBalls = [];
            num[oneNum].forEach(function(raw, y){
                raw.forEach(function(i, x){
                    if(i){
                        var ball = new Ball(marginLeft + timeMargin + x*(ballRadius*2+margin), marginTop + y*(ballRadius*2+margin), rc());
                        sportBalls.push(ball);
                    }
                })
            });
            num[oneNum].forEach(function(raw, y){
                raw.forEach(function(i, x){
                    if(i){
                        var ball = new Ball(marginLeft + timeMargin + x*(ballRadius*2+margin), marginTop + y*(ballRadius*2+margin), color);
                        oneBalls.push(ball);
                    }
                })
            });
        }
        if(oldTenNum !== tenNum){
            tenBalls.forEach(function(ball){
                ball.c = rc();
            })
            tenBalls = [];
            num[tenNum].forEach(function(raw, y){
                raw.forEach(function(i, x){
                    if(i){
                        var ball = new Ball(marginLeft  + x*(ballRadius*2+margin), marginTop + y*(ballRadius*2+margin), rc());
                        sportBalls.push(ball);
                    }
                })
            });
            num[tenNum].forEach(function(raw, y){
                raw.forEach(function(i, x){
                    if(i){
                        var ball = new Ball(marginLeft  + x*(ballRadius*2+margin), marginTop + y*(ballRadius*2+margin), color);
                        tenBalls.push(ball);
                    }
                })
            });
        }
        oldSeconds = seconds;
        oldOneNum = oneNum;
        oldTenNum = tenNum;
    }

    // 渲染頁面
    cxt.clearRect(0,0, maxw, maxh);
    oneBalls.forEach(function(ball){
        ball.draw();
    });
    tenBalls.forEach(function(ball){
        ball.draw();
    });
    sportBalls.forEach(function(ball){
        ball.draw();
        ball.update();
    });
    sportBalls = sportBalls.filter(function(ball){
        return ball.x > 0 && ball.x < maxw && ball.y > 0 && ball.y < maxh;
    })
}

function loop(){
    renderTime();
    setTimeout(function(){
        loop()
    }, 30)
}
loop()
