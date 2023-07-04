const EZ_MOUSE_KEY={
    LEFT:0,
    RIGHT:2,
}

class EZ_MouseEvent extends EZ_Event{
    constructor(x,y,key,type){
        super(type)
        this.x=x;
        this.y=y;
        this.key=key;
    }
}

class EZ_MousePressEvent extends EZ_MouseEvent{
    constructor(x,y,key){
        super(x,y,key,EZ_EVENT_TYPE.MOUSE_PRESS_EVENT)
    }
}

class EZ_MouseReleaseEvent extends EZ_MouseEvent{
    constructor(x,y,key){
        super(x,y,key,EZ_EVENT_TYPE.MOUSE_RELEASE_EVENT);
    }
}
