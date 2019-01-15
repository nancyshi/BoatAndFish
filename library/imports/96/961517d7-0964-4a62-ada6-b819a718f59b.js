"use strict";
cc._RF.push(module, '96151fXCWRKYq2muBmnGPWb', 'loadingMgr');
// scripts/loadingMgr.js

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
        minumStayTime: 3,
        hasChangedScene: {
            default: false,
            visible: false
        },
        dataCenter: null,
        flag: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.dataCenter = require("dataCenter");

        this.flag = this.dataCenter.setUpPlayerDataFromServer();
        this.dataCenter.configs.refreshConfig = this.dataCenter.getJsonObjFromServerByJsonFileName("refreshRuleConfig");
        this.dataCenter.configs.fishConfig = this.dataCenter.getJsonObjFromServerByJsonFileName("fishConfig");
    },
    start: function start() {},
    setUpPrefabs: function setUpPrefabs() {},

    // loadRes(dataCenter,refreshConfig,fishConfig){

    //     var currentAreaLevel = dataCenter.playerData.currentAreaLevel;
    //     var refreshRule = dataCenter.getRefreshRuleByAreaLevel(currentAreaLevel,refreshConfig);

    //     var fishIds = [];
    //     for (var index in refreshRule) {
    //         fishIds[index] = refreshRule[index].fishId;
    //     }
    //     var fishDetailConfigs = [];
    //     for (var index in fishIds) {
    //         fishDetailConfigs[index] = dataCenter.getFishConfigByFishId(fishIds[index],fishConfig);
    //     }
    //     var modelNames = []
    //     for (var index in fishDetailConfigs) {
    //         var oneConfig = fishDetailConfigs[index];
    //         modelNames[index] = oneConfig[0];
    //     }
    //     //load models 

    // },
    loadPrefabs: function loadPrefabs() {
        var prefabNames = this.dataCenter.getFishPrefabNamesByAreaLevel();
        for (var index in prefabNames) {
            cc.loader.loadRes(prefabNames[index], function (err, prefab) {});
        }
    },
    update: function update(dt) {
        if (this.flag && this.dataCenter.configs.refreshConfig && this.dataCenter.configs.fishConfig) {}
    }
});

cc._RF.pop();