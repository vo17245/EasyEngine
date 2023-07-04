class EZ_Window{
    constructor(x,y,width,height,name,mountId){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.mount=document.getElementById(mountId);
        
        this.name=name;
        //在挂载点下添加用于控件渲染的div
        let str=`<div id="${this.name}_gui"></div>\r\n`;
        //添加canvas
        str=str+`<canvas id="${this.name}_canvas"></canvas>\r\n`;
        //添加文本输入区域,用于实现文本输入
        str=str+`<input id="${this.name}_input">\r\n`;
        
        

        this.mount.innerHTML=str;
        this.gui=document.getElementById(this.name+"_gui");
        this.canvas=document.getElementById(this.name+"_canvas");
        this.input=document.getElementById(this.name+"_input");
        this.input.style.position='absolute';
        this.input.style.width='1px';
        this.input.style.height='1px';
        this.input.addEventListener("input",function(){EZ_EventDispather.Push(new EZ_TextInputEvent());});
        this.input.addEventListener("blur",function(){EZ_EventDispather.Push(new EZ_InputBlurEvent());});
        //创建渲染器
        this.renderer2D=new EZ_Renderer2D(this.canvas);

        //事件
        this.RegisterEventHandler("mousedown",function(event){EZ_EventDispather.eventList.push(new EZ_MousePressEvent(event.offsetX,event.offsetY,event.button));});
        this.RegisterEventHandler("mouseup",function(event){EZ_EventDispather.eventList.push(new EZ_MouseReleaseEvent(event.offsetX,event.offsetY,event.button));});

    }
    SetInputPos(x,y){
        this.input.style.left=x+"px";
        this.input.style.top=y+"px";
    }
    SetInputValue(val){
        this.input.value=EZ_Copy(val);
    }
    GetInputValue(){
        return EZ_Copy(this.input.value);
    }
    InputFocus(){
        this.input.focus();
    }
    InputBlur(){
        this.input.blur();
    }
    SetInputSize(width,height){
        this.input.style.width=width;
        this.input.style.height=height;
    }
    RegisterEventHandler(eventName,func){
        this.canvas.addEventListener(eventName, func);
    }

    GetCanvas(){
        return this.canvas;
    }
    GetRenderer2D(){
        return this.renderer2D;
    }
    SetClearColor(r,g,b){
        this.clear_color_r=r;
        this.clear_color_g=g;
        this.clear_color_b=b;
    }
    
}

