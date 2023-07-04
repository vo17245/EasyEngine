class EZ_ButtonClickEvent extends EZ_Event{
    constructor(buttonId){
        super(EZ_EVENT_TYPE.BUTTON_CLICK_EVENT);
        this.buttonId=EZ_Copy(buttonId);
    }
}