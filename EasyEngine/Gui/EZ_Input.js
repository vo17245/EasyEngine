class EZ_Input extends EZ_GuiElement{
    static STATE={
        BLUR:0,
        FOCUS:1,
    }
    constructor(x,y,width,height,window){
        super();
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.window=window;
        this.value="";
        this.renderer=this.window.GetRenderer2D();
        this.backgroundColor=new EZ_Color(255,255,255);
        this.fontColor=new EZ_Color(0,0,0);
        this.fontSize=30;
        this.state=EZ_Input.STATE.BLUR;
    }
    OnEvent(event){
        
        if(event.IsOnCategory(EZ_EVENT_TYPE.MOUSE_PRESS_EVENT)){//响应鼠标按下事件
            //左键按下事件
            if(event.key===EZ_MOUSE_KEY.LEFT){
                //查看按下事件是否发生在输入框内
                if(this.x<=event.x && event.x<=this.x+this.width && this.y<=event.y && event.y<=this.y+this.height){
                    //将html输入框移动到输入元素的位置
                    this.window.SetInputPos(this.x,this.y);
                    this.window.SetInputSize(this.width,this.height);
                    this.window.SetInputValue(this.value);
                    this.window.InputFocus();
                    //阻止事件传递
                    event.IsHandled=true;
                    //将自己的状态标记为focus
                    this.state=EZ_Input.STATE.FOCUS;
                }
            }
        }
        else if(event.IsOnCategory(EZ_EVENT_TYPE.TEXT_INPUT_EVENT)){//响应文本输入事件
            //如果是focus状态
            if(this.state===EZ_Input.STATE.FOCUS){
                //跟新value
                this.value=this.window.GetInputValue();
              
                
            }
        }
        else if(event.IsOnCategory(EZ_EVENT_TYPE.INPUT_BLUR_EVENT)){//响应输入框移除事件
            if(this.state===EZ_Input.STATE.FOCUS){
                this.state=EZ_Input.STATE.BLUR;
        
            }
        }
    }
    OnRender(){
        this.renderer.DrawRect(this.backgroundColor.r,this.backgroundColor.g,this.backgroundColor.b,this.x,this.y,this.width,this.height);//渲染背景
        this.renderer.DrawText(this.value,this.x,this.y+this.height,this.fontColor,this.fontSize);//渲染字体
        //TODO 渲染光标
        
    }
}