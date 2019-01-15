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
    currentRes: {
        prefabs: [cc.Prefab]
    },
    configs: {
        refreshConfig: null,
        fishConfig: null
    },

    setUpPlayerDataFromServer: function setUpPlayerDataFromServer() {
        //it should to get datas from server, now we will just read local data
        var localPlayerData = JSON.parse(cc.sys.localStorage.getItem("playerData"));
        if (localPlayerData != null) {
            this.playerData = localPlayerData;
        }
        return true;
    },
    changePlayerData: function changePlayerData(key, value) {
        this.playerData.key = value;
    },
    storePlayerData: function storePlayerData() {
        //it will not be used when server start to deal with data
        cc.sys.localStorage.setItem("playerData", JSON.stringify(this.playerData));
    },
    getRefreshRuleByAreaLevel: function getRefreshRuleByAreaLevel(givenLevel, refreshConfig) {
        if (refreshConfig == null) {
            refreshConfig = this.configs.refreshConfig;
        }
        for (var index in refreshConfig) {
            if (refreshConfig[index].areaId == givenLevel) {
                return refreshConfig[index].rules;
            }
        }
    },
    getFishDetailConfigByFishId: function getFishDetailConfigByFishId(givenId, fishConfig) {
        if (fishConfig == null) {
            fishConfig = this.configs.fishConfig;
        }
        var fishModelName = null;
        var fishDollor = null;
        for (var index in fishConfig) {
            if (fishConfig[index].fishId == givenId) {
                fishModelName = fishConfig[index].fishModelName;
                fishDollor = fishConfig[index].fishDollor;
                break;
            }
        }
        if (fishModelName != null && fishDollor != null) {
            return [fishModelName, fishDollor];
        }
    },
    getFishPrefabNamesByAreaLevel: function getFishPrefabNamesByAreaLevel(givenAreaLevel) {
        if (givenAreaLevel == null) {
            givenAreaLevel = this.dataCenter.currentAreaLevel;
        }
        var refreshRules = this.getRefreshRuleByAreaLevel(givenAreaLevel);
        var fishIds = [];
        for (var index in refreshRules) {
            fishIds[index] = refreshRules[index].fishId;
        }
        var fishDetailConfigs = [];
        for (var index in fishIds) {
            fishDetailConfigs[index] = this.getFishDetailConfigByFishId(fishIds[index]);
        }

        var prefabNames = [];
        for (var index in fishDetailConfigs) {
            var oneDetailConfig = fishDetailConfigs[index];
            prefabNames[index] = oneDetailConfig[0];
        }
        return prefabNames;
    },
    getJsonObjFromServerByJsonFileName: function getJsonObjFromServerByJsonFileName(givenName) {
        cc.loader.loadRes(givenName, function (err, obj) {
            if (err) {
                cc.log(err);
            } else {
                return obj.json;
            }
        });
    }
};

module.exports = dataCenter;

cc._RF.pop();