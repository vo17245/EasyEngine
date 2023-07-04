class EZ_Application{
    constructor(x,y,width,height,name,mountId){
        this.window=new EZ_Window(x,y,width,height,name,mountId);
        this.layerStack=[];
        //初始化clear color
        this.clear_color_r=114;
        this.clear_color_g=140;
        this.clear_color_b=153;
    }
    Run(){
        //阻止浏览器对右键的响应
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
        //视口大小
        //this.window.renderer2D.SetViewport(window.screen.width,window.screen.height);
        //循环
        let ez_window=this.window;
        let lastTimestamp=EZ_Now();
        let app=this;
        EZ_RepeatCall(500,function(){
            //Event
            app.OnEvent();
            app.OnGuiEvent();
            
            EZ_EventDispather.Clear();
            //Update
            let now=EZ_Now();
            let deltaTime=now-lastTimestamp;
            lastTimestamp=now;
            app.OnUpdate(deltaTime);
            app.OnGuiElementUpdate(deltaTime);
            //Render
            app.window.renderer2D.Clear(app.clear_color_r,app.clear_color_g,app.clear_color_b);
            app.OnRender();

            app.OnGuiElementRender();
        });
    }
    OnUpdate(deltaTime){
        for(let i=0;i<this.layerStack.length;i++){
            this.layerStack[i].OnUpdate(deltaTime);
            
        }
    }
    OnGuiElementUpdate(deltaTime){
        for(let i=0;i<this.layerStack.length;i++){
            let guiElementList=this.layerStack[i].GetGuiElementList();
         
            for(let j=0;j<guiElementList.length;j++){
                guiElementList[j].OnUpdate(deltaTime);
            }
        }
    }
    OnRender(){
        
        for(let i=this.layerStack.length-1;i>=0;i--){
            this.layerStack[i].OnRender();
        }        
        
    }

    OnGuiElementRender(){
        for(let i=this.layerStack.length-1;i>=0;i--){
            let guiElementList=this.layerStack[i].GetGuiElementList();
            for(let j=0;j<guiElementList.length;j++){
                guiElementList[j].OnRender();
            }
        }
    }
    OnEvent(){
        for(let i=0;i<EZ_EventDispather.eventList.length;i++){
            let event=EZ_EventDispather.eventList[i];
            if(event.IsHandled===true){
                continue;
            }
            for(let j=0;j<this.layerStack.length;j++){
                this.layerStack[j].OnEvent(event);
                if(event.IsHandled==true){
                    break;
                }
            }
        }
    }
    OnGuiEvent(){
        for(let i=0;i<EZ_EventDispather.eventList.length;i++){
            let event=EZ_EventDispather.eventList[i];
            if(event.IsHandled===true){
                continue;
            }
            for(let j=0;j<this.layerStack.length;j++){
                let flag=0;
                let guiElementList=this.layerStack[j].GetGuiElementList();
                for(let k=0;k<guiElementList.length;k++){
                    guiElementList[k].OnEvent(event);
                    if(event.IsHandled===true){
                        flag=1;
                        break;
                    }
                }
                if(flag===1){
                    break;
                }
            }
        }
    }
    PushLayer(layer){
        this.layerStack.push(layer);
    }
    PopLayer(layer){
        this.layerStack=EZ_PopElementFromList(layer,this.layerStack);
    }
}