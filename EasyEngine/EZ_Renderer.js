// 渲染使用的坐标系
//  +-------> x
//  |
//  |
// \|/
//  |
//  y

// 使用的坐标范围是 y属于[-1,1] x属于[-1,1] (浮点类型 Number) 
class EZ_Renderer2D{
    constructor(canvas){
        //获取画布元素
        this.canvas = canvas;
        //获取2d上下文
        this.ctx = this.canvas.getContext("2d");
        
    }
    
    
    // 关于视口大小的函数
    GetHeight(){
        return this.canvas.height;
    }
    GetWidth(){
        return this.canvas.width;
    }
    SetHeight(height){
        this.canvas.height=height;
    }
    SetWidth(width){
        this.canvas.width=width;
    }
    SetViewport(width,height){
        this.canvas.height=height;
        this.canvas.width=width;
    }
    //清屏
    Clear(r,g,b){
        this.ctx.fillStyle = `rgb(${r},${g},${b})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // 绘制
    // 绘制一条(x1,y1) 到(x2,y2)的线段
    DrawLine(r,g,b,x1,y1,x2,y2,width){
        if(width===undefined){
            width=1;
        }
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = `rgb(${r},${g},${b})`;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }
    //绘制长方形
    DrawRect(r,g,b,x,y,width,height){
        this.ctx.fillStyle = `rgb(${r},${g},${b})`;
        this.ctx.fillRect(x, y, width, height);
    }
    //绘制文字
    // x y是第一个字的左下角
    DrawText(text,x,y,color,size){
        this.ctx.fillStyle = color.ToCssString();
        this.ctx.font = `${size}px Arial`;
        this.ctx.fillText(text,x,y);
    }
}





