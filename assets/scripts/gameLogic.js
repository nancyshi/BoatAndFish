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
        catchedFishAnimTime: 0.5,
        getFishNodeOriginPosition: {
            default: null,
            visible: false,
        },
        
        fishesNode: {
            default: null,
            type: cc.Node,
        },
        getFishNode: {
            default: null,
            type: cc.Node,
        },
        dollorLabelesNode: {
            default: null,
            type: cc.Node,
        },
        catchedFishesNode: {
            default: null,
            type: cc.Node,
        },
        currentDollorLabel: cc.Label,

        dataCenter: {
            default: null,
            visible: false
        },

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.dataCenter = require("dataCenter");
        this.dataCenter.setUpPlayerDataFromServer();
        this.setUpPerformanceByData();

        this.node.on("touchstart",this.touchBegan,this);
        this.node.on("touchmove",this.touchMoved,this);
        this.node.on("touchend",this.touchEnd,this);
        this.node.on("touchcancel",this.touchCancel,this);

        this.schedule(function(){
            this.spwanOneFish();
        },this.spawnFishDt);

        this.getFishNodeOriginPosition = this.getFishNode.getPosition();

     },

    start () {
    },
    touchBegan(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));

        this.getFishNode.setPosition(location.x,location.y);
        var motionComponent = this.getFishNode.getComponent(cc.MotionStreak);
        motionComponent.enabled = true;

    },
    touchMoved(event){
        var x = event.getLocationX();
        var y = event.getLocationY();
        var location = this.node.convertToNodeSpaceAR(cc.v2(x,y));
        this.getFishNode.setPosition(location.x,location.y);
    },
    touchEnd(event){
        var motion = this.getFishNode.getComponent(cc.MotionStreak);
        motion.enabled = false;
        this.getFishNode.setPosition(this.getFishNodeOriginPosition);

    },
    touchCancel(event){
        this.touchEnd();
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
        this.fishesNode.addChild(newFish);

        //let fish to face to it's target
        var targetPositon = this.getOneRandomPositionBySpawnArea(targetSpawnAreaNum);
        var helper = require("helper");
        helper.turnOneNodeToOnePosition(newFish,targetPositon);

        //add animation of fish
        var swimLeft = cc.rotateBy(0.5,30);
        var leftBack = cc.rotateBy(0.5,-30);
        var swimRight = cc.rotateBy(0.5,-30);
        var rightBack = cc.rotateBy(0.5,30);
        var swimAction = cc.sequence(swimLeft,leftBack,swimRight,rightBack);
        var swimAnimation = cc.repeatForever(swimAction);
        newFish.runAction(swimAnimation);

        //let fish to move to it's target
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
        var fishes = this.fishesNode.children;
        var helper = require("helper");
        if (fishes.length > 0){
            for(var x in fishes){
                if (helper.isOneNodeInAnotherNode(this.getFishNode,fishes[x]) == true){ // catch one fish
                    //data things
                    this.dataCenter.playerData.currentDollor += 22;
                    this.dataCenter.storePlayerData();
                    this.setUpPerformanceByData();
                    //remove selected fish
                    var position = fishes[x].getPosition();
                    fishes[x].removeFromParent();

                    //setup catchedFish
                    var catchedFish = cc.instantiate(this.fishPrefab);
                    var catchedFishTargetPosition = cc.v2(0,-151);
                    var jumpAction = cc.jumpTo(this.catchedFishAnimTime,catchedFishTargetPosition,50,1);
                    var scaleUpAction = cc.scaleTo(0.3 * this.catchedFishAnimTime,1.5,1.5);
                    var scaleDownAction = cc.scaleTo(0.7 * this.catchedFishAnimTime,0.5,0.5);
                    var scalAction = cc.sequence(scaleUpAction,scaleDownAction,cc.removeSelf());
                    var action = cc.spawn(jumpAction,scalAction);

                    catchedFish.position = position;
                    helper.turnOneNodeToOnePosition(catchedFish,catchedFishTargetPosition);
                    this.catchedFishesNode.addChild(catchedFish);
                    catchedFish.runAction(action);
                    
                    //setup dollorLabel
                    var newLabel = cc.instantiate(this.dollorLabelPrefab);
                    newLabel.setPosition(position);
                    this.dollorLabelesNode.addChild(newLabel);
                    var fadeOut = cc.fadeOut(1.0);
                    var action = cc.sequence(fadeOut,cc.removeSelf());
                    newLabel.runAction(action);
                    break;
                }
            }
        } 
    },

    setUpPerformanceByData(){
        //currentDollorLabel
        var currentDollor = this.dataCenter.playerData.currentDollor;
        var helper = require("helper");
        var text = helper.formatNumberShowStyle(currentDollor);

        this.currentDollorLabel.string = "$ " + text;
    }
});
