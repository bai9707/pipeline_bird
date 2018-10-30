// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class index extends cc.Component {

    @property(cc.Sprite)
    bird_0:cc.Sprite=null;
    @property(cc.Sprite)
    bird_1:cc.Sprite=null;
    @property(cc.Sprite)
    bird_2:cc.Sprite=null;
    @property(cc.Node)
    bird:cc.Node=null;
    @property(cc.Node)
    bg_0:cc.Node=null;
    @property(cc.Node)
    bg_1:cc.Node=null;
    @property(cc.Node)
    pipe_0:cc.Node=null;
    @property(cc.Node)
    pipe_1:cc.Node=null;
    @property(cc.Node)
    pipe_2:cc.Node=null;
    @property(cc.Label)
    text:cc.Label=null;
    @property(cc.Node)
    icon:cc.Node=null;
    @property(cc.Sprite)
    start_icon:cc.Sprite=null;
    score:number=0;
    time:number=0;
    sort:boolean=true;
    speed:number=0;
    name:string="pipe_0";
    timer:number=0;
    is:boolean=false;
    onLoad(){}
    start(){
      this.pipe_0.y=this.random(-100,120);
      this.pipe_0.y=this.random(-100,120);
      this.pipe_0.y=this.random(-100,120);
    }
    update(dt:number){
      if(!this.is){
        return;
      }
      var timeT=this.time+dt;
      this.time=timeT;
      if(this.time>0.1){
        this.bird_0.node.active?this.flap(0):
        this.bird_1.node.active?this.flap(1):this.flap(2);
      }
      this.speed=this.speed-0.2;
      this.bird.y=this.bird.y+this.speed;
      this.bird.rotation=-this.speed*3;
      this.roll("bg_0",3,288,288,"");
      this.roll("bg_1",3,288,288,"");
      this.roll("pipe_0",2,220,350,"random");
      this.roll("pipe_1",2,220,350,"random");
      this.roll("pipe_2",2,220,350,"random");
      this.crash(this.bird,this.pipe_0,dt);
      this.crash(this.bird,this.pipe_1,dt);
      this.crash(this.bird,this.pipe_2,dt);
    }
    crash(bird,pipe,dt){
      this.timer+=dt;
      if((bird.x-17>pipe.x+26)||(bird.x+17<pipe.x-26)||(bird.y+12<pipe.y+50&&bird.y-12>pipe.y-50)){
        if(pipe.x<-140&&pipe.x>-150&&this.timer>3){
          this.text.string=""+(++this.score)+"";
          this.timer=0;
        };
        return;
      }
      this.onend();
    }
    flap(data){
      this["bird_"+data].node.active=false;
      this.sort?this["bird_"+(++data)].node.active=true:this["bird_"+(--data)].node.active=true;
      switch(data){
        case 2:this.sort=false;break;
        case 0:this.sort=true;break;
      }
      this.time=0;
    }
    roll(data,speed,distance,skip,fn){
      var x=this[data].x;
      this[data].x=x-speed;
      if(this[data].x<=-distance){
        this[data].x=skip;
        if(fn=="random"){
          var y=this.random(-100,120);
          this[data].y=y;
        }
      }
    }
    random(min,max){
      return Math.ceil(Math.random()*max+min);
    }
    onclick(){
      this.speed=4;
    }
    onstart(){
      this.is=true;
      this.icon.active=false;
      this.start_icon.node.active=false;
      this.base();
    }
    onend(){
      this.is=false;
      this.icon.active=true;
      this.start_icon.node.active=true;
    }
    base(){
      this.icon.active=false;
      this.start_icon.node.active=false;
      this.bird.x=-100;
      this.bird.y=-50;
      this.speed=0;
      this.pipe_0.y=this.random(-100,120);
      this.pipe_0.y=this.random(-100,120);
      this.pipe_0.y=this.random(-100,120);
      this.pipe_0.x=60;
      this.pipe_1.x=230;
      this.pipe_2.x=400;
      this.score=0;
      this.text.string="0";
    }
}
