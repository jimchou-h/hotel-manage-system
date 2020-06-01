import Vue from 'vue'

function getStandardTime(d) {
  try {
    let date =
      d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() <
        10 ? '0' : '') + d.getDate() + ' ' + (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() <
        10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    return date
  } catch (e) {
    Vue.prototype.$message.error('时间格式不正确')
  }
}

export default {
  getStandardTime
}
