class EZ_HtmlGuiElement{//所有用于绘制html 交互控件的EZ类的父类
    constructor(id){
        this.id=id;
    }
    GetHtmlElement(){
        return document.getElementById(this.id);
    }
    //子类中实现
    CreateHTML(){

    }
}


class EZ_HtmlInput extends EZ_HtmlGuiElement{
    constructor(x,y,width,height,id){
        super(id);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    CreateHTML(){
        return `<input style=" position: absolute;left: ${this.x}px;top: ${this.y}px;width:${this.width}px;height:${this.height}px" id="${this.id}">`;
    }
    GetValue(){
        return this.GetHtmlElement().value;
    }
    SetValue(val){
        this.GetHtmlElement().value=val;
    }
}