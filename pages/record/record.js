// pages/record/record.js
const app = getApp();
var jsonUtil = require('../../utils/jsonutil.js');
var server_path = app.globalData.server_path;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordData: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var _this = this;
    wx.request({
      url: server_path + "viewrecord/findAlarmByUser.do",
      data: {
        userId: app.globalData.user.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.info("alarm get record data result " + res.data);
        _this.setData({
          recordData: res.data.data
        });
      }
    }) 
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
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})