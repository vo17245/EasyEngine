class EZ_Vec2{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

class EZ_Vec3{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }
}

class EZ_Color{
    constructor(r,g,b){
        this.r=r;
        this.g=g;
        this.b=b;
    }
    ToCssString(){
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}