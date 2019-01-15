"use strict";
cc._RF.push(module, '8d53675rGpJ9oO+ZjF3CWLq', 'fishPrefabs');
// scripts/fishPrefabs.js

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
        fish_001: {
            default: null,
            modelName: "fish_10001",
            type: cc.Prefab
        },
        fish_002: {
            default: null,
            modelName: "fish_10002",
            type: cc.Prefab
        },
        fish_003: {
            default: null,
            modelName: "fish_10003",
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        for (var index in this.properties) {
            cc.log("hey,the name is ", this.properties[index].modelName);
        }
        for (var index in this) {
            cc.log("I'm here");
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();