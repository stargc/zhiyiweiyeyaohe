//app.js
var jsonUtil = require('utils/jsonutil.js');
var server_path = "https://www.zhiyiweiye.cn/MedicineBox/";
// var server_path = "http://localhost:7080/MedicineBox/";
App({
  globalData: {
    server_path: "https://www.zhiyiweiye.cn/MedicineBox/",
    // server_path: "http://localhost:7080/MedicineBox/",
    userInfo: null,//微信用戶信息
    user: null,//后台服务用户信息:userId,userName
    openId: null,
    session_key: null,
    access_token: null
  },
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
            url: server_path + 'WeXinAgent/queryOpenId.do',
            data: {
              loginCode: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (serverResult) {
              var openIdRes = serverResult.data.data;
              console.info("app getOpenID");
              console.info("登录成功返回的openId：" + openIdRes.openid);
              _this.globalData.openId = openIdRes.openid;
              _this.globalData.session_key = openIdRes.session_key;
              wx.setStorage({
                key: "openId",
                data: openIdRes.openid
              });
              wx.setStorage({
                key: "session_key",
                data: openIdRes.session_key
              });
              _this.startUpdateAccessToken();
              // 判断openId是否获取成功
              if (openIdRes.openid != null & openIdRes.openid != undefined) {
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
                        openId: openIdRes.openid
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (user) {
                        console.info("app add user");
                        if (user.data.code == 0) {
                          var userData = user.data.data;
                          console.info("用户注册成功");
                          _this.globalData.user = userData;
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
  startUpdateAccessToken : function() {
    var _this = this;
    
    wx.request({
      url: server_path + 'WeXinAgent/queryToken.do',
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (resultdata) {
        var tokendata = resultdata.data.data;
        if (tokendata.access_token == undefined){
          console.info("error : { code : " + tokendata.code + ", errmag : " + tokendata.msg + "}");
          setTimeout(function () {
            _this.startUpdateAccessToken();
          }, 1000);
          return;
        }
        console.info("access_token: " + tokendata.access_token);
        console.info("access_token expires time : " + tokendata.expires_in);
        wx.setStorage({
          key: "access_token",
          tokendata: tokendata.access_token
        });
        _this.globalData.access_token = tokendata.access_token;
        setTimeout(function () {
          _this.startUpdateAccessToken();
        }, (tokendata.expires_in-1) * 1000);
      },
      fail: function (error) {
        console.info(error);
        setTimeout(function () {
          _this.startUpdateAccessToken();
        }, 1000);
      }
    })
  }
})