class EZ_Layer{
    constructor(){
        this.htmlElementList=[];
        this.guiElementList=[];
    }
    OnRender(){}//在子类中实现
    OnEvent(event){}//在子类中实现
    GetHtmlElementList(){
        return this.htmlElementList;
    }
    PushHtmlElement(element){
        this.htmlElementList.push(element);
    }
    PopHtmlElement(element){
        if(element===undefined){
            if(this.htmlElementList.length==0){
                return;
            }
            element=this.htmlElementList[this.htmlElementList.length-1];
        }
        this.htmlElementList=EZ_PopElementFromList(element,this.htmlElementList);
    }
    PushGuiElement(element){
        this.guiElementList.push(element);
    }
    PopGuiElement(element){
        if(element===undefined){
            if(this.guiElementList.length===0){
                return;
            }
            element=this.guiElementList[this.guiElementList.length-1];
        }
        this.guiElementList=EZ_PopElementFromList(element,this.guiElementList);
    }
    GetGuiElementList(){
        return this.guiElementList;
    }
    
}