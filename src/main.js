// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

//引入使用
import echarts from 'echarts'
Vue.use(echarts,{
  transfer: true,
  size: 'large'
});

Vue.prototype.$axios = axios;
// axios.defaults.headers.common['Authorization']=AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http = axios;



axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  let pathname = location.pathname;
	if(sessionStorage.getItem('token')){
		config.headers.common['X-Token'] = sessionStorage.getItem('token');
	}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});




//引入使用view
import View from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(View,{
  transfer: true,
  size: 'large'
});

//vuex
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});


// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if ('window.sessionStorage.userName') { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
