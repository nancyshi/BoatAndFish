// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dataCenter = {
    playerData: {
        currentDollor: 0,
        currentAreaLevel: 1,
        currentEquips: [],
        gotEquips:[]
    
    },

    setUpPlayerDataFromServer(){
        //it should to get datas from server, now we will just read local data
        var localPlayerData = JSON.parse(cc.sys.localStorage.getItem("playerData"));
        if (localPlayerData != null) {
            this.playerData = localPlayerData;
        }
    },
    
    changePlayerData(key,value){
        this.playerData.key = value;
    },
    storePlayerData(){
        //it will not be used when server start to deal with data
        cc.sys.localStorage.setItem("playerData",JSON.stringify(this.playerData));
    },
    getRefreshRuleFromServerByAreaLevel(givenLevel){
        cc.loader.loadRes("refreshRuleConfig",function(err,refreshConfig){
            if (err) {
                cc.log(err);
            }
            else {
                for (var index in refreshConfig.json) {
                    if (refreshConfig.json[index].areaId == givenLevel) {
                        return refreshConfig.json[index];
                    }
                }
            }
        })
    },
    getFishConfigByFishId(givenId) {
        cc.loader.loadRes("fishConfig",function(err,fishConfig){
            var fishModelName = null
            var fishDollor = null
            for(var index in fishConfig.json) {
                if (fishConfig.json[index].fishId == givenId) {
                    fishModelName = fishConfig.json[index].fishModelName;
                    fishDollor = fishConfig.json[index].fishDollor;
                    break;
                }
            }
            if (fishModelName != null && fishDollor != null) {
                return [fishModelName, fishDollor];
            }
            else {
                return null
            }
        })
    },

}

module.exports = dataCenter;
