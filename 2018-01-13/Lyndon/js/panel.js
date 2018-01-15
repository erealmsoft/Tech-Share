function rn(s,e){
    var start = s ? s : 0 ;
    var end = e ? e : 255 ;
    var i = end - start ;
    var color =  parseInt(start+Math.random()*i);
    return color;
}

function rc(opacity){
    var op = opacity ? opacity : 1 ;
    return 'rgba('+rn()+','+rn()+','+rn()+','+op+')'
}
// 主方法，创建canvasDraw实现draw方法
function CanvasDraw(elem){
    //创建核心div
    //设置主构建属性;
    this.panel  = elem; 
    var canvas = this.panel.getContext("2d");
    var maxw = elem.width ;
    var maxh = elem.height ;
    //polyDiv.style.outline = "3px solid #666";
    //设置每个原点属性；
    this.drawCurve = function(cfg){
        var _cfg = [];
        for(var i = 0; i<cfg.length ; i++){
            _cfg[i] = cfg[i]
        }
        //把点整理好
        var nextPoint = [];
        var prePiont = [];
        for(var i = 0 ; i < _cfg.length ; i++ ){
            // 移动到第一点
            if(i === 0){
                canvas.moveTo(_cfg[i][0],_cfg[i][1]);
            }
            // 移动到第一点
            if(i > 0){
                if(typeof _cfg[i] === "number"){
                    console.log(_cfg[i])
                    nextPoint = _cfg[i+1];
                    prePiont = _cfg[i-1];
                    var x = prePiont[0] + ( nextPoint[0] - prePiont[0] )*_cfg[i];
                    var y = prePiont[1] + ( nextPoint[1] - prePiont[1] )*_cfg[i];
                    _cfg[i] = [x,y];
                    
                }
            }
        }
        for(var i = 0 ; i < _cfg.length ; i++ ){
            this.drawBall(_cfg[i][0],_cfg[i][1],10,'#f93')
        }
        canvas.beginPath()
        for(var i = 0 ; i < _cfg.length ; i++ ){
            
            if(i%2 === 0){
                if(i===0){
                    canvas.moveTo(_cfg[i][0],_cfg[i][1])
                }else{
                    canvas.quadraticCurveTo(_cfg[i-1][0],_cfg[i-1][1],_cfg[i][0],_cfg[i][1])
                } 
            }
        }
        canvas.strokeStyle = "#999";
        canvas.stroke()
        return this
    }
    this.drawBall = function(x,y,radius,color){
        canvas.beginPath()
        canvas.arc(x,y,radius,0,Math.PI*2);
        canvas.fillStyle = color;
        canvas.fill()
        return this
    }
    this.drawRing = function(x,y,radius,lineWidth,color){
        canvas.beginPath()
        canvas.arc(x,y,radius,0,Math.PI*2);
        canvas.strokeStyle = color;
        canvas.lineWidth = lineWidth;
        canvas.stroke()
        return this
    }
    this.drawLine = function(x1,y1,x2,y2,color){
        canvas.beginPath();
        canvas.moveTo(x1,y1)
        canvas.lineTo(x2,y2);
        canvas.strokeStyle = color;
        canvas.stroke()
        return this
    }
    this.drawImg = function(img,x,y,w,h){
        canvas.drawImage(img,x,y,w,h);
        return this
    }
    this.drawText = function(text,x,y,font,align){
        canvas.font = font ? font : '微软雅黑 16px';
        canvas.textAlign = align ? align : 'center';
        canvas.fillText(text,x,y);
    }
    this.drawHeart = function(x,y,r,d,color){
        canvas.beginPath()
        canvas.moveTo(x,y);
        canvas.bezierCurveTo(
            x-d/6,y-r/2,
            x-d,y-r/2,
            x-d,y
        );
        canvas.bezierCurveTo(
            x-d,y+r/2,
            x-d/6,y+r-r/4,
            x,y+r
        );
        canvas.bezierCurveTo(
            x+d/6,y+r-r/4,
            x+d,y+r/2,
            x+d,y
        );
        canvas.bezierCurveTo(
            x+d,y-r/2,
            x+d/6,y-r/2,
            x,y
        );
        canvas.fillStyle = color;
        canvas.closePath();
        canvas.fill()
        return this
    }
    this.drawPixel = function(x,y,color){
        canvas.fillStyle = color;
        canvas.fillRect(x,y,1,1);
    }
    this.drawRect = function(x,y,w,h,color){
        canvas.fillStyle = color;
        canvas.fillRect(x,y,w,h);
    }
    this.cxt = canvas;
    this.clear = function(x,y){
        var cx = x ? x : maxw;
        var cy = y ? y : maxh;
        canvas.clearRect(0,0,cx,cy)
        return this
    }
}