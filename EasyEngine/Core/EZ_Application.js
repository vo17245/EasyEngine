class EZ_Application{
    constructor(x,y,width,height,name,mountId){
        this.window=new EZ_Window(x,y,width,height,name,mountId);
        
        var inputElement = document.createElement('input');
        this.window.GetCanvas().appendChild(inputElement);
            
        inputElement.addEventListener('input', function(event) {
           let text = event.target.value;
           console.log(text);
        });
        
    }
    Run(){
        //阻止浏览器对右键的响应
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
        //
        let ez_window=this.window;
        EZ_RepeatCall(500,function(){
            ez_window.OnGuiEvent();
            ez_window.OnEvent();
            
            EZ_EventDispather.Clear();
            ez_window.OnRender();
            ez_window.OnHtmlElementRender();
            ez_window.OnGuiElementRender();
        });
    }
}