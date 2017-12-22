const formatDateTime = date => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute
  }
  if (second < 10) {
    second = "0" + second
  }
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if(hour < 10) {
    hour = "0" + hour;
  }
  if(minute < 10) {
    minute = "0" + minute
  }
  if(second < 10) {
    second = "0" + second
  }

  return [hour, minute, second].map(formatNumber).join(':')
}

const getToday = n => {
  var today = new Date();
  var year = today.getFullYear;
  var month = today.getMonth + 1;
  var day = today.getDate;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;

}

module.exports = {
  formatDateTime: formatDateTime,
  formatTime: formatTime,
  formatDate: formatDate
}
