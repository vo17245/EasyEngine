class EZ_EventDispather{
    static eventList=[];
    static nextTickEventList=[];
    constructor(){
        

    }
    static Clear(){
        EZ_EventDispather.eventList=EZ_EventDispather.nextTickEventList;
        EZ_EventDispather.nextTickEventList=[];
    }
    static Push(event){
        EZ_EventDispather.eventList.push(event);
    }
    static PushToNextTick(event){
        EZ_EventDispather.nextTickEventList.push(event);
    }
}