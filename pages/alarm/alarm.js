//index.js
var jsonUtil = require('../../utils/jsonutil.js');
//获取应用实例
const app = getApp();
var server_path = app.globalData.server_path;

Page({
  data: {
    server_path: server_path,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    alarms: ""
  },
  gotoAddAlarm: function () {
    wx.navigateTo({
      url: "addalarm/addalarm"
    })
  },
  gotoAddBox: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res);
        wx.showModal({
          title: "此药盒没有记录在案",
          content: res.result,
          showCancel: false,
          confirmText: "取消"
        });
      },
      fail: (res) => {
        wx.showModal({
          title: "二维码数据报错",
          content: res.result,
          showCancel: false,
          confirmText: "取消"
        });
      }
    })
  },
  hideLoadingToast: function () {
    var _this = this;
    if (app.globalData.userInfo && app.globalData.user) {
      _this.getAlarm();
      wx.hideLoading();
    } else {
      setTimeout(function () {
        _this.hideLoadingToast();
      }, 1000);
    }
    
  },
  onShow: function () {
    var _this = this;
    this.setData({
      alarms:null
    });
    wx.showLoading({
      title: '加载中',
      mask: true,
    });

    setTimeout(function () {
      _this.hideLoadingToast();
    }, 3000);
  },
  onLoad: function () {
    var _this = this;
    console.info("alarm onload");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.info("alarm userInfoReadyCallback");
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo;
        _this.storeUserInfo(res);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.info("alarm getUserInfo again");
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          app.globalData.userInfo = res.userInfo;
          _this.storeUserInfo(res);
        }
      })
    }
  },
  gotoMedicine: function (event) {
    wx.navigateTo({
      url: 'medicineInfo/medicineInfo?medId=' + event.currentTarget.dataset.medid + 
            '&alarmId=' + event.currentTarget.dataset.alarmid +
            '&dosage=' + event.currentTarget.dataset.dosage,
    })
  },
  storeUserInfo: function (res) {
    var _this = this;
    wx.request({
      url: server_path + "user/add.do",
      data: {
        avatarUrl: res.userInfo.avatarUrl,
        city: res.userInfo.city,
        username: res.userInfo.nickName,
        nickName: res.userInfo.nickName,
        openId: res.userInfo.openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (user) {
        if (user.data.code == 0) {
          var userData = user.data.data;
          console.info("用户注册成功");
          wx.setStorage({
            key: "user",
            data: userData
          });
          app.globalData.user = userData;
        }
      },
      fail: function (failData) {
        console.info("用户拒绝授权");
      }
    })
  },
  getAlarm: function () {
    var _this = this;
    console.info("alarm getAlarm");
    wx.request({
      url: server_path + "viewalarm/findAlarmByUserAndDate.do",
      data: {
        userId: app.globalData.user.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.info("alarm getalarm data result " + res.data.code);
        _this.setData({
          alarms: res.data.data
        });
      },
      fail: function (error) {
        console.info("alarm getalarm data result error: " + error);
      }
    })
  }
})
