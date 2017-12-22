//app.js
var jsonUtil = require('utils/jsonutil.js');
var server_path = "http://localhost:8080/MedicineBox/";
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var _this =  this;
    // 登录
    wx.login({
      success: res => {
        console.info("app login");
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //小程序唯一标识
              appid: 'wx8723c746ba822cd7',
              //小程序的 app secret
              secret: '6c0b8a7c7e01fe5fbe01dc91f9a27bb0',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              console.info("app getOpenID");
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              wx.setStorage({
                key: "openId",
                data: openIdRes.data.openid
              });
              // 判断openId是否获取成功
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                wx.getUserInfo({
                  success: function (info) {
                    // 自定义操作
                    // 绑定数据，渲染页面

                    console.info("app getUserInfo");
                    _this.globalData.userInfo = info.userInfo;
                    wx.request({
                      url: server_path + "user/add.do",
                      data: {
                        avatarUrl: info.userInfo.avatarUrl,
                        city: info.userInfo.city,
                        userName: info.userInfo.nickName,
                        nickName: info.userInfo.nickName,
                        openId: openIdRes.data.openid
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (user) {
                        console.info("app add user");
                        if (jsonUtil.stringToJson(user.data).code == 0) {
                          var userData = jsonUtil.stringToJson(user.data).data;
                          console.info("用户注册成功");
                          wx.setStorage({
                            key: "user",
                            data: userData
                          });
                        }
                      }
                    });
                  },
                  fail: function (failData) {
                    console.info("用户拒绝授权");
                  }
                })
              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    }
    )
  },
  globalData: {
    userInfo: null
  }
})