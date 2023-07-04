function EZ_PopElementFromList(element,list){
    let t=[];
    for(let i=0;i<list.length;i++){
        if(list[i]===element){

        }else{
            t.push(list[i]);
        }
    }
    return t;
}

function EZ_WaitAndCall(time_ms,func){
    setTimeout(()=>{func();},time_ms);
}

function EZ_RepeatCall(time_ms,func){
    let t = window.setInterval(func,time_ms);
}

function EZ_Copy(obj){
    return JSON.parse(JSON.stringify(obj)); 

}

function EZ_Now(){
    return Number(new Date());
}