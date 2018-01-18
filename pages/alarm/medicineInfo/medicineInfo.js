// pages/alarm/medicineInfo/medicineInfo.js
var dateUtil = require('../../../utils/dateutil.js');
var jsonUtil = require('../../../utils/jsonutil.js');

const app = getApp();
var server_path = app.globalData.server_path;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server_path: server_path,
    medicineInfo: null,
    medId:0,
    alarmId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var _this = this;
    this.setData({
      medId: e.medId,
      alarmId: e.alarmId
    });
    wx.request({
      url: server_path + "medicine/findById.do",
      data: {
        medId: e.medId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.info("get medicine data===============");
        _this.setData({
          medicineInfo: jsonUtil.stringToJson(res.data).data[0]
        });
      }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '药品信息',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  done: function(e) {
    // console.info("formID：" + e.detail.formId);
    // this.sendMsg(e.detail.formId);
    wx.request({
      url: server_path + "viewalarm/updateStatus.do",
      data: {
        alarmId: this.data.alarmId,
        statusId: 2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.info("update status===============");
        wx.navigateBack({
          
        });
      }
    });
  },
  skip: function(e) {
    wx.request({
      url: server_path + "viewalarm/updateStatus.do",
      data: {
        alarmId: this.data.alarmId,
        statusId: 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.info("update status===============");
        wx.navigateBack({

        });
      }
    });
  },
  sendMsg: function (formid) {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + app.globalData.access_token,
      data: {
        touser: app.globalData.openId,
        template_id: "5wt1qqFKII37l1M2CmEglaeN9YYXxg6dsjHKMFMnEwQ",
        page: "medicineInfo",
        form_id: 1515142220615,
        data: {
          "keyword1": {
            "value": "339208499",
            "color": "#173177"
          },
          "keyword2": {
            "value": "2015年01月05日 12:30",
            "color": "#173177"
          },
          "keyword3": {
            "value": "粤海喜来登酒店",
            "color": "#173177"
          }
        }
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (data) {
        if (data.data.errcode != 0) {
          console.info("发送消息 error : { code : " + data.data.errcode + " }");
          return;
        }
        console.info("发送消息成功");
      },
      fail: function (error) {
        console.info(error.data.errcode);

      }
    })
  }
})