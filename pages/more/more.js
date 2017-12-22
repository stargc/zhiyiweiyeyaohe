// pages/more/more.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxname: "",
    hasBox: false,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //TODO: 从服务器获取是否存在药盒
    this.setData({
      hasBox: false,
      boxname: ""
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   
  onPullDownRefresh: function () {
  
  },*/

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {
  
  },*/

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },*/
  clickAddMedicine: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res);
        var keys = new Array();
        keys = res.result.split(":");
        if (keys.length >= 4 && keys[0] == "ZHIYIMWDICINE") {
          this.setData({
            hasBox: true,
            boxname: "药盒-" + keys[4]
          });
          wx.showModal({
            title: "智医药盒欢迎你",
            content: "成功绑定您的专属药盒",
            showCancel: false,
            confirmText: "确认"
          });
        } else {
          wx.showModal({
            title: "二维码扫描结果",
            content: "请选择智医为您提供的专属药盒",
            showCancel: false,
            confirmText: "确认"
          });
        }
      },
      fail: (res) => {
        this.setData({
          hasBox: false,
          boxname: ""
        });
        wx.showModal({
          title: "请选择正确的二维码进行扫描",
          content: "",
          showCancel: false,
          confirmText: "确认"
        });
      }
    })
  },
  clickAddMedicineAgain: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res);
        
      },
      fail: (res) => {
        wx.showModal({
          title: "二维码数据报错",
          content: "请选择正确的二维码进行扫描",
          showCancel: false,
          confirmText: "确认"
        });
      }
    })
  },
  clickFamilyRecord: function () {
    wx.showModal({
      title: "敬请期待！",
      content: "功能正在紧张制作研发中...",
      showCancel: false,
      confirmText: "确认"
    })
    /* wx.navigateTo({
      url: 'familyrecord/familyrecord',
    }) */
  },
  clickbuyMedicine: function () {
    wx.showModal({
      title: "敬请期待！",
      content: "功能正在紧张制作研发中...",
      showCancel: false,
      confirmText: "确认"
    })
  },
  clickhelp: function () {
    wx.showModal({
      title: "敬请期待！",
      content: "功能正在紧张制作研发中...",
      showCancel: false,
      confirmText: "确认"
    })
  },
  clickSendMedicine: function () {
    wx.showModal({
      title: "敬请期待！",
      content: "功能正在紧张制作研发中...",
      showCancel: false,
      confirmText: "确认"
    })
  },
  clickNearbyClinic: function () {
    wx.showModal({
      title: "敬请期待！",
      content: "功能正在紧张制作研发中...",
      showCancel: false,
      confirmText: "确认"
    })
  },
  clickSetting: function () {
    wx.showModal({
      title: "关于我们",
      content: "Version： 1.0.0.1",
      showCancel: false,
      confirmText: "确认"
    })
  }
})