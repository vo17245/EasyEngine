class EZ_TableBlock{
    //@param
    //         
    //  param:  |text    |backgroundColor |fontColor   |
    //  type:   |string  |EZ_Color        |EZ_Color    |
    //
    constructor(text,backgroundColor,fontColor,fontSize){

        this.text=text;
        this.backgroundColor=backgroundColor;
        this.fontColor=fontColor;
        this.fontSize=fontSize;
    }
    GetText(){
        return this.text;
    }
    SetText(text){
        this.text=text;
    }
    GetBackGroundColor(){
        return this.backgroundColor;
    }
    SetBackGroundColor(backgroundColor){
        this.backgroundColor=backgroundColor;
    }
    GetFontColor(){
        return this.fontColor;
    }
    SetFontColor(fontColor){
        this.fontColor=fontColor;
    }
    SetFontSize(fontSize){
        this.fontSize=fontSize;
    }
    GetFontSize(){
        return this.fontSize;
    }

}

class EZ_TableColumn{
    constructor(width){
        this.width=width;
        this.blockList=[];
    }
    SetIndex(index){
        this.index=index;
    }
    GetIndex(){
        return this.index;
    }
    SetWidth(width){
        this.width=width;
    }
    GetWidth(){
        return this.width;
    }
    PushBlock(block){
        this.blockList.push(block);
    }
    PopBlock(block){
        EZ_PopElementFromList(block,this.blockList);
    }
    GetId(){
        return this.id;
    }
    GetBlockList(){
        return this.blockList;
    }
    
}

class EZ_TableRow{
    constructor(height){
        this.height=height;
    }
    SetHeight(height){
        this.height=height;
    }
    GetHeight(){
        return this.height;
    }
}

class EZ_Table{
    constructor(name){
        this.name=name;
        this.columnList=[];
        this.rowList=[];
    }
    PushColumn(col){
        this.columnList.push(col);
    }
    PopColumn(col){
        EZ_PopElementFromList(col,this.columnList);
    }
    PushRow(row){
        this.rowList.push(row);
    }
    PopRow(row){
        EZ_PopElementFromList(row,this.rowList);
    }
    GetColumnList(){
        return this.columnList;
    }
    GetRowList(){
        return this.rowList;
    }
    SetRowList(rowList){
        this.rowList=rowList;
    }
    SetColumnList(colList){
        this.columnList=colList;
    }

    static CreateColumnNameByIndex(i){
        if (i <= 0 || typeof i !== 'number') {
            return 'Invalid input';
          }
        
          let letter = '';
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
          while (i > 0) {
            let remainder = (i - 1) % 26;
            letter = alphabet.charAt(remainder) + letter;
            i = Math.floor((i - 1) / 26);
          }
          return letter;
    }
    static CreateNewTable(){
        //table
        let tableId='0';
        let table=new EZ_Table(tableId.toString(),"default");
        //每个单元格的大小
        let indexColumnWidth=48;
        let headerRowHeight=30;
        let width=80;
        let height=40;
        //行列数量
        let rowCnt=65;
        let colCnt=27;
        //单元格的颜色
        let backgroundColor1=new EZ_Color(255,255,255);//用于普通单元格的背景颜色
        let backgroundColor2=new EZ_Color(234,235,236);//用于表头和序列的单元格的背景颜色
        //单元格字体
        let fontColor=new EZ_Color(0,0,0);//字体颜色
        let fontSize=30;//字体大小
        //添加第一列
        table.PushColumn(new EZ_TableColumn(indexColumnWidth));
        //添加colCnt-1个列
        for(let i=0;i<colCnt-1;i++)
        {
            table.PushColumn(new EZ_TableColumn(width));
        }   
        //添加第一行
        table.PushRow(new EZ_TableRow(headerRowHeight));
        //再添加rowCnt-1行
        for(let i=0;i<rowCnt;i++){
            table.PushRow(new EZ_TableRow(height))
        }
        //为第一列添加block
        table.GetColumnList()[0].PushBlock(new EZ_TableBlock('',backgroundColor1,fontColor,fontSize));
        for(let i=1;i<rowCnt;i++){
            table.GetColumnList()[0].PushBlock(new EZ_TableBlock(i.toString(),backgroundColor2,fontColor,fontSize));
        }
        //给[1,colCnt)列的第一行添加block
        for(let i=1;i<colCnt;i++){
            table.GetColumnList()[i].PushBlock(new EZ_TableBlock(EZ_Table.CreateColumnNameByIndex(i),backgroundColor2,fontColor,fontSize));
        }
        //给[1,colCnt)列的[1,rowCnt)行添加block
        for(let i=1;i<colCnt;i++){
            for(let j=1;j<rowCnt;j++){
                table.GetColumnList()[i].PushBlock(new EZ_TableBlock('',backgroundColor1,fontColor,fontSize));
            }
        }
        return table;
    }
}

class EZ_TableLayer extends EZ_Layer{
    static MODE={NORMAL:0,EDIT:1};
    constructor(renderer,table,window){
        super();
        this.table=table;
        this.renderer=renderer;
        this.boxColor=new EZ_Color(184,185,186);//表格框的颜色
        this.boxWidth=0;
        this.boxHeight=0;
        this.window=window;
        // 新增列按钮
        this.addColumnButton=new EZ_Button(0,0,1,1,"add column",this.window);
        //模式
        this.mode=EZ_TableLayer.MODE.NORMAL;
        //NORMAL EDIT 模式
        this.selectedRow=-1;
        this.selectedCol=-1;
        this.selectedXMin=-1;
        this.selectedYMin=-1;
        this.selectedXMax=-1;
        this.selectedYMax=-1;
        this.input=new EZ_Input(0,0,1,1,this.window);

    }
    
    ComputeBoxSize(){
        let rowList=this.table.GetRowList();
        let colList=this.table.GetColumnList();
        //获得表格 框(box)大小
        let width=0;
        let height=0; 
        for(let i=0;i<rowList.length;i++){
            height+=rowList[i].GetHeight();
        }
        for(let i=0;i<colList.length;i++){
            width+=colList[i].GetWidth();
        }
        this.boxWidth=width;
        this.boxHeight=height;
    }
    SetViewportByTableSize(){
        let width=this.boxWidth;
        let height=this.boxHeight;

        //根据表格大小调整视口大小
        this.renderer.SetViewport(width,height);
    }
    DrawBox(){
        let width=this.boxWidth;
        let height=this.boxHeight;
        let rowList=this.table.GetRowList();
        let colList=this.table.GetColumnList();
        // 绘制边框
        let heightOff=0;
        for(let i=0;i<rowList.length;i++)
        {
            // 绘制行
            heightOff+=rowList[i].GetHeight();
            this.renderer.DrawLine(this.boxColor.r,this.boxColor.g,this.boxColor.b,0,heightOff,width,heightOff);
        }
        
        let widthOff=0;
        for(let i=0;i<colList.length;i++){
            // 绘制列
            widthOff+=colList[i].GetWidth();
            this.renderer.DrawLine(this.boxColor.r,this.boxColor.g,this.boxColor.b,widthOff,0,widthOff,height);
        }
    }
    DrawBackgroundColor(){
        let rowList=this.table.GetRowList();
        let colList=this.table.GetColumnList();
        //绘制每个单元格的背景颜色 并填入文字
        let x=0;//单元格左上角x

        for(let i=0;i<colList.length;i++)
        {
            let blockList=colList[i].GetBlockList();
            //获得单元格的宽度
            let width=colList[i].GetWidth();
            let y=0;//单元格左上角y
            for(let j=0;j<blockList.length;j++)
            {
                //获得单元格的高
                let height=rowList[j].GetHeight();
                //单元格的颜色
                let color=blockList[j].GetBackGroundColor();
                //填充颜色
                this.renderer.DrawRect(color.r,color.g,color.b,x,y,width,height);
                //填充文字
                let block=blockList[j];
                
                this.renderer.DrawText(block.GetText(),x,y+height,block.GetFontColor(),block.GetFontSize());
                
                y+=height;

                
            }
            x+=width;
        }
    }
   
    OnRender(){
        this.ComputeBoxSize();
        this.SetViewportByTableSize();
        this.DrawBackgroundColor();
        this.DrawBox();
        if(this.mode===EZ_TableLayer.MODE.NORMAL){
            this.renderer.DrawLine(0,0,255,this.selectedXMin,this.selectedYMin,this.selectedXMax,this.selectedYMin,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMin,this.selectedYMin,this.selectedXMin,this.selectedYMax,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMax,this.selectedYMax,this.selectedXMax,this.selectedYMin,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMax,this.selectedYMax,this.selectedXMin,this.selectedYMax,2);
        }
        else if(this.mode===EZ_TableLayer.MODE.EDIT){
            this.renderer.DrawLine(0,0,255,this.selectedXMin,this.selectedYMin,this.selectedXMax,this.selectedYMin,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMin,this.selectedYMin,this.selectedXMin,this.selectedYMax,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMax,this.selectedYMax,this.selectedXMax,this.selectedYMin,2);
            this.renderer.DrawLine(0,0,255,this.selectedXMax,this.selectedYMax,this.selectedXMin,this.selectedYMax,2);
            
        }
        
    }
    GetBlockPosByClickPos(x,y){
        let rowList=this.table.GetRowList();
        let colList=this.table.GetColumnList();
        let row=0;
        let col=0;
        let xMin=0;
        let xMax=0;
        let yMin=0;
        let yMax=0;
        //确定所在的行
        let a=0;
        let b=0;
        for(let i=0;i<rowList.length;i++){
            
            b+=rowList[i].GetHeight();
            
            if(a<=y && y<=b){
                row=i;
                yMin=a;
                yMax=b;
           
                break;
            }
            a=b;
        }
        
        //确定所在列
        a=0;
        b=0;
        for(let i=0;i<colList.length;i++){
            b+=colList[i].GetWidth();
            if(a<=x && x<=b){
                col=i;
                xMin=a;
                xMax=b;
                break;
            }
            a=b;
        }
        
        this.selectedCol=col;
        this.selectedRow=row;
        this.selectedXMax=xMax;
        this.selectedXMin=xMin;
        this.selectedYMax=yMax;
        this.selectedYMin=yMin;

        
    }
    OnEvent(event){
        //普通模式
        if(this.mode===EZ_TableLayer.MODE.NORMAL)
        {
            //鼠标按下事件
            if(event.IsOnCategory(EZ_EVENT_TYPE.MOUSE_PRESS_EVENT)){
                if(event.key===EZ_MOUSE_KEY.LEFT){
                    //左键按下
                    //查看点击位置和上次是否同一个单元格
                    let lastSelectRow=this.selectedRow;
                    let lastSelectCol=this.selectedCol;
                    this.GetBlockPosByClickPos(event.x,event.y);
                    if(lastSelectCol===this.selectedCol && lastSelectRow===this.selectedRow){
                        // 如果相同进入编辑模式
                        this.mode=EZ_TableLayer.MODE.EDIT;
                        // 插入输入框
                        //let input=new EZ_Input(this.selectedXMin,this.selectedYMin,this.selectedXMax-this.selectedXMin,this.selectedYMax-this.selectedYMin,this.window)
                        this.input.x=this.selectedXMin;
                        this.input.y=this.selectedYMin;
                        this.input.width=this.selectedXMax-this.selectedXMin;
                        this.input.height=this.selectedYMax-this.selectedYMin;
                        this.input.value=this.table.columnList[lastSelectCol].GetBlockList()[lastSelectRow].text;
                        //input.value=this.table.columnList[lastSelectCol].GetBlockList()[lastSelectRow].text;
                        this.PushGuiElement(this.input);
                        // 激活输入框
                        EZ_EventDispather.PushToAppEventList(new EZ_MousePressEvent(this.selectedXMin+2,this.selectedYMin+2,EZ_MOUSE_KEY.LEFT));
                        
                      
                    }
                }
                
            }
            
        }
        //编辑模式
        else if(this.mode==EZ_TableLayer.MODE.EDIT){
            //鼠标按下事件
            if(event.IsOnCategory(EZ_EVENT_TYPE.MOUSE_PRESS_EVENT)){
                
                if(event.key===EZ_MOUSE_KEY.LEFT){
                    //左键按下
                    //查看点击位置和上次是否同一个单元格
                    let lastSelectRow=this.selectedRow;
                    let lastSelectCol=this.selectedCol;
                    
                    this.GetBlockPosByClickPos(event.x,event.y);
                    if(lastSelectCol===this.selectedCol && lastSelectRow===this.selectedRow){
                        
                    }else{
                        // 如果不相同
                        //将文本填入单元格
                        this.table.columnList[lastSelectCol].GetBlockList()[lastSelectRow].text=this.GetGuiElementList()[0].value;
          
                        //进入普通模式
                        this.mode=EZ_TableLayer.MODE.NORMAL;
                        this.PopGuiElement(this.input);
                       
                    }
                }
                
            }
        }
        
        
    }
    
}