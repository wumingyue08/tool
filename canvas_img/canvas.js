(function(){
    var picture = '';//生成的图片以base64形式导出
    function canvas1(width,height,font){
        this.width = width;
        this.height = height;
        this.font = font;
        this.el = document.getElementById('canvas');
    }
    canvas1.prototype.draw = function(){
        var self = this;
        var img = new Image();
        img.src= 'http://localhost:8083/canvas_img/Sharepic_bg.jpg'; //图片地址必须与页面地址一直
        img.setAttribute("crossOrigin", 'Anonymous');
        img.onload = function() {
            var ctx = self.el.getContext('2d');
            canvas.width = self.width;
            canvas.height = self.height;
            var rem = self.rem();
            ctx.drawImage(img, 0, 0, self.width, self.height);
            ctx.font = "16px Arial";
            ctx.fillStyle = '#fff';
            ctx.fillText(self.font, rem * 158, rem * 110);
            picture = self.el.toDataURL("image/png");  //导出图片
        }
    }
    canvas1.prototype.rem = function(){
        stageWidth = document.documentElement.clientWidth;
        stageHeight = document.documentElement.clientHeight;
        stageScale = stageWidth / 750;
        canvas.style.width = 750 * stageScale + 'px';
        canvas.style.height = 1206 * stageScale + 'px';
        return stageScale;
    }
    var drawImg = new canvas1("720","1060","你好"); //new 一个实例
    drawImg.draw(); //生成图片
})()