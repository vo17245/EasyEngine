let EZ_LAST_UUID=0;
function EZ_GetUUID(){
    EZ_LAST_UUID+=1;
    return EZ_LAST_UUID;
}