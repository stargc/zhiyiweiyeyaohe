//app.js
var jsonUtil = require('utils/jsonutil.js');
var server_path = "https://www.zhiyiweiye.cn/MedicineBox/";
// var server_path = "http://localhost:8080/MedicineBox/";
App({
  globalData: {
    server_path: "https://www.zhiyiweiye.cn/MedicineBox/",
    // server_path: "http://localhost:8080/MedicineBox/",
    userInfo: null,
    user: null,
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
            url: server_path + 'winXinAgent/queryOpenId.do',
            data: {
              loginCode: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (serverResult) {
              var openIdRes = jsonUtil.stringToJson(serverResult.data);
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
                        if (jsonUtil.stringToJson(user.data).code == 0) {
                          var userData = jsonUtil.stringToJson(user.data).data;
                          console.info("用户注册成功");
                          _this.globalData.user = userData[0];
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
      url: server_path + 'winXinAgent/queryToken.do',
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (resultdata) {
        var data = jsonUtil.stringToJson(resultdata.data);
        if (data.access_token == undefined){
          console.info("error : { code : " + data.errcode + ", errmag : " + data.errmsg + "}");
          setTimeout(function () {
            _this.startUpdateAccessToken();
          }, 1000);
          return;
        }
        console.info("access_token: " + data.access_token);
        console.info("access_token expires time : " + data.expires_in);
        wx.setStorage({
          key: "access_token",
          data: data.access_token
        });
        _this.globalData.access_token = data.access_token;
        setTimeout(function () {
          _this.startUpdateAccessToken();
        }, (data.expires_in-1) * 1000);
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