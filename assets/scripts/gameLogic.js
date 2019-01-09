// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        spawnFishDt: 5,
        fishPrefab: {
            default:null,
            type: cc.Prefab,
        },
        fishMoveDuration: 5,
        dollorLabelPrefab: {
            default:null,
            type: cc.Prefab,
        },

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.node.on("touchstart",this.touchBegan,this);
        this.node.on("touchmove",this.touchMoved,this);
        this.node.on("touchend",this.touchEnd,this);
        this.node.on("touchcancel",this.touchCancel,this);

        this.schedule(function(){
            this.spwanOneFish();
        },this.spawnFishDt);
     },

    start () {
    },
    touchBegan(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));

        var getFishNode = cc.find("Canvas/getFishNode");
        getFishNode.setPosition(location.x,location.y);

    },
    touchMoved(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));

        var getFishNode = cc.find("Canvas/getFishNode");
        getFishNode.setPosition(location.x,location.y);
    },
    touchEnd(event){
        
    },
    touchCancel(event){

    },

    onDestroy(){
        this.node.off("touchstart",this.touchBegan,this);
        this.node.off("touchmove",this.touchMoved,this);
        this.node.off("touchend",this.touchEnd,this);
        this.node.off("touchcancel",this.touchCancel,this); 
    },
    spwanOneFish(){
        var newFish = cc.instantiate(this.fishPrefab);
        //select one spwan area. There are 4 areas for spwan , which are distributed of the screen's left,right,top and bottom
        //0 -> left
        //1 -> right
        //2 -> top
        //3 -> bottom
        var spawnAreaNum = Math.random() * 4;
        spawnAreaNum = Math.floor(spawnAreaNum);
        var targetSpawnAreaNum = null;
        switch(spawnAreaNum) {
            case 0:
                targetSpawnAreaNum = 1;
                break;
            case 1:
                targetSpawnAreaNum = 0;
                break;
            case 2:
                targetSpawnAreaNum = 3;
                break;
            case 3:
                targetSpawnAreaNum = 2;
                break;
        }

        //fish spwan position
        var spawnPosition = this.getOneRandomPositionBySpawnArea(spawnAreaNum);
        newFish.setPosition(spawnPosition);
        var fishesNode = cc.find("Canvas/fishesNode");
        fishesNode.addChild(newFish);

        //let fish to move to it's target
        var targetPositon = this.getOneRandomPositionBySpawnArea(targetSpawnAreaNum);
        var moveAction = cc.moveTo(this.fishMoveDuration,targetPositon);
        var fishAction = cc.sequence(moveAction,cc.removeSelf());

        newFish.runAction(fishAction);

    },
    getOneRandomPositionBySpawnArea(spawnAreaNum){
        var spawnX = null;
        var spawnY = null;
        var newFish = cc.instantiate(this.fishPrefab);
        if(spawnAreaNum == 0) {
             spawnX = -1 * this.node.width/2 - newFish.width/2;
             spawnY = Math.random() * this.node.height - this.node.height/2;
        }
        else if(spawnAreaNum == 1){
            spawnX = this.node.width/2 + newFish.width/2;
            spawnY = Math.random() * this.node.height - this.node.height/2;
        }
        else if(spawnAreaNum == 2) {
            spawnY = this.node.height/2 + newFish.height/2;
            spawnX = Math.random() * this.node.width - this.node.width/2;
        }
        else if(spawnAreaNum == 3) {
            spawnY = -this.node.height/2 - newFish.height/2;
            spawnX = Math.random() * this.node.width - this.node.width/2;
        }
        return cc.v2(spawnX,spawnY);
    },
    update (dt) {
        var fishesNode = cc.find("Canvas/fishesNode");
        var getFishNode = cc.find("Canvas/getFishNode");
        var fishes = fishesNode.children;
        var helper = require("helper");
        var dollorLabelesNode = cc.find("Canvas/dollorLabelesNode");
        if (fishes.length > 0){
            for(var x in fishes){
                if (helper.isOneNodeInAnotherNode(getFishNode,fishes[x]) == true){
                    //do something
                    var position = fishes[x].getPosition();
                    fishes[x].removeFromParent();
                    var newLabel = cc.instantiate(this.dollorLabelPrefab);
                    newLabel.setPosition(position);
                    dollorLabelesNode.addChild(newLabel);
                    var fadeOut = cc.fadeOut(1.0);
                    var action = cc.sequence(fadeOut,cc.removeSelf());
                    newLabel.runAction(action);
                    break;
                }
            }
        } 
    },
});
