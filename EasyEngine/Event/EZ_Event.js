const EZ_EVENT_TYPE={
    MOUSE_PRESS_EVENT:0,
    MOUSE_RELEASE_EVENT:1,
    TEXT_INPUT_EVENT:2,
    INPUT_BLUR_EVENT:3,
}


class EZ_Event{
    constructor(type){
        this.type=type;
        this.IsHandled=false;
    }
    IsOnCategory(type){
        if(this.type===type){
            return true;
        }
        return false;
    }
}


