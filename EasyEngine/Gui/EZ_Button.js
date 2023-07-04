class EZ_Button extends EZ_GuiElement{
    constructor(x,y,width,height,text,window){
        super();
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.id=EZ_GetUUID();
        this.backgroundColor=new EZ_Color(184,185,186);
        this.fontColor=new EZ_Color(0,0,0);
        this.text=text;
        this.fontSize=30;
        this.window=window;
        this.renderer=this.window.GetRenderer2D();
    }
    OnEvent(event){
        if(event.IsOnCategory(EZ_EVENT_TYPE.MOUSE_PRESS_EVENT)){//响应鼠标按下事件
            if(event.key==EZ_MOUSE_KEY.LEFT){//左键按下
                //检查是否在按钮范围内
                if(this.x<=event.x && event.x <= this.x+this.width && this.y <= event.y && event.y<=this.y+this.height){
                    //在范围内
                    //发出按钮点击事件
                    EZ_EventDispather.PushToAppEventList(new EZ_ButtonClickEvent(this.id));
                }
            }
        }
        
    }
    OnRender(){
        //渲染背景色
        this.renderer.DrawRect(this.backgroundColor.r,this.backgroundColor.g,this.backgroundColor.b,this.x,this.y,this.width,this.height);
        //渲染字体
        this.renderer.DrawText(this.text,this.x,this.y+this.height,this.fontColor,this.fontSize);
        
    }
    OnUpdate(deltaTime){
    }

}
