"use strict";
cc._RF.push(module, '2d0a08CuKVPZ77EF3WgVaP9', 'dataCenter');
// scripts/dataCenter.js

"use strict";

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
        gotEquips: []

    },

    setUpPlayerDataFromServer: function setUpPlayerDataFromServer() {
        //it should to get datas from server, now we will just read local data
        var localPlayerData = JSON.parse(cc.sys.localStorage.getItem("playerData"));
        if (localPlayerData != null) {
            this.playerData = localPlayerData;
        }
    },
    changeData: function changeData() {},
    storePlayerData: function storePlayerData() {
        //it will not be used when server start to deal with data
        cc.sys.localStorage.setItem("playerData", JSON.stringify(this.playerData));
    }
};

module.exports = dataCenter;

cc._RF.pop();