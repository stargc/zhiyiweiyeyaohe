// pages/alarm/addalarm.js
var dateUtil = require('../../../utils/dateutil.js');
var jsonUtil = require('../../../utils/jsonutil.js');
//获取应用实例
const app = getApp();
var server_path = app.globalData.server_path;
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
      alarmStartDate:today,
      medicineName: ""      
    });
  },
  //*****************数据记录function start******** *//
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
  bindMedName: function (e) {
    this.setData({
      medicineName:e.detail.value
    })
  },
  //*****************数据记录function end******** *//

  addinfo: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, //张数， 默认9 
      sizeType: ['compressed'], //建议压缩图 
      sourceType: ['album', 'camera'], // 来源是相册、相机 
      success: function (res) {
        _this.setData({
          info_image: res.tempFilePaths[0]
        });
        
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
  save: function (e) {
    try {
      //记录一个fromID
      wx.request({
        url: server_path + "SendMessageParm/addParm.do",
        data: {
          openId: app.globalData.openId,
          userId: app.globalData.user.userId,
          formId: e.detail.formId,
          type: "FAMB"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.info("add user fromId result: " + res);
        }
      });
    } catch (err) {
      console.info(err);
    }
    if (this.data.info_image == "../../../images/alarm/alarm_extra_info_ch.png"){
      wx.showModal({
        title: "添加失败",
        content: "请添加药品详情图片",
        showCancel: false,
        confirmText: "确认"
      });
      return;
    }
    console.info("add alarm : " + this.data.medicineName);
    wx.uploadFile({
      url: server_path + "viewalarm/add.do",
      filePath: this.data.info_image,
      name: 'file',
      formData: {
        alarmTime: "2017-12-25 " + this.data.alarmtime + ":00",
        startDate: this.data.alarmStartDate + " 00:00:00",
        endDate: this.data.alarmEndDate + " 00:00:00",
        userId: app.globalData.user.userId,
        statusId: 1,
        dosage: parseInt(this.data.num_index) + 1,
        medName: this.data.medicineName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (result) {
        console.info(result.data);
        wx.navigateBack({
          
        });
      },
      fail: function (failData) {
        console.info(failData);
      }
    })
  }
})