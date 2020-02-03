import Vue from 'vue'
import axios from 'axios'
import Config from '@/assets/config/index'
// import store from '@/stores/index.js';
import router from '@/router/index.js'

// 将请求参数由对象转化成form-data
function transformRequest(data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.split('')
    ret.pop()
    ret = ret.join('')
    return ret
}

axios.defaults.baseURL = Config.apiUrl;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;


// 响应拦截器输出错误
axios.interceptors.response.use(function (response) {
  if (response['data']['message'] == '你没有操作权限') {
    router.push('/login');
  }
  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
})

function post(url, request, type) {
  switch(type) {
    case 'form-data':
      request = transformRequest(request)
      break;
    case 'row':
      request = JSON.stringify(request)
      break;
  }
  return axios.post(url, request)
    .then(response => {
      return response['data']
    })
}

export default {
  post
}
