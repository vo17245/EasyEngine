class EZ_EventDispather{
    static eventList=[];
    static appEventList=[];
    constructor(){
        

    }
    static Clear(){
        EZ_EventDispather.eventList=EZ_EventDispather.appEventList;
        EZ_EventDispather.appEventList=[];
    }
    static Push(event){
        EZ_EventDispather.eventList.push(event);
    }
    static PushToAppEventList(event){
        EZ_EventDispather.appEventList.push(event);
    }
}