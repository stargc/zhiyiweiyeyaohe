// pages/alarm/addalarm.js
var dateUtil = require('../../../utils/dateutil.js');
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    alarmtime: "00:00",
    num_array: ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9'],
    num_index: 0,
    info_image: "../../../images/alarm/alarm_extra_info_ch.png",
    medicine_items: [1],
    alarmStartDate: "",
    alarmEndDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = dateUtil.formatDate(new Date());
    this.setData({
      alarmEndDate:today,
      alarmStartDate:today
    });

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

  }, */

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {

  },*/

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {

  },*/
  bindStartDateChange: function (e) {
    this.setData({
      alarmStartDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      alarmEndDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      alarmtime: e.detail.value
    })
  },
  bindNumberChange: function (e) {
    this.setData({
      num_index: e.detail.value
    })
  },
  addinfo: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9 
      sizeType: ['compressed'], //建议压缩图 
      sourceType: ['album', 'camera'], // 来源是相册、相机 
      success: function (res) {
        _this.setData({
          info_image: res.tempFilePaths[0]
        })
      }
    });
  },
  addMedicine: function () {
    var _item = new Array(this.data.medicine_items.length + 1);
    for (var i = 0; i < _item.length; i++) {
      _item[i] = i;
    }
    this.setData({
      medicine_items: _item
    })
  },
  save: function () {
    
    wx.navigateBack({})
  }
})