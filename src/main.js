import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 懒加载插件
import VueLazyload from 'vue-lazyload';
import path from "path";
// 导入axios模块 可以在所有组件中使用
import axios from "axios";
// 引入商品详情页
import goodsInfo from './components/goodlist.vue';
// 引入ivue框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// vuex
import Vuex from 'vuex'
// 引入购物车
import buycar from "./components/buycar.vue";
// 引入结算页
import payorder from "./components/payOrder.vue";
// 引入登录页 
import login from "./components/login.vue";

// 设置网站的基地址
axios.defaults.baseURL = "http://47.106.148.205:8899";
// 让axios发送请求时携带cookie
axios.defaults.withCredentials = true;
// 挂载到vue原型上-》Vue实例化出来的对象 共用vue-resource this.$http
Vue.prototype.axios = axios;
// 使用路由中间件
Vue.use(VueRouter);
// 引入element中间件
Vue.use(ElementUI);
// 注册ivue路由
Vue.use(iView)
// vuex
Vue.use(Vuex)
// 引入ivue中间件
Vue.use(iView);
// 引入css
import './assets/statics/site/css/style.css';
import moment from 'moment';
// 使用懒加载的中间件
Vue.use(VueLazyload, {
  // 懒加载图片 当作资源来引入
  loading: require("./assets/statics/img/01.gif")
})
// 注册路由
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    // 增加路由规则 关联goodsInfo组件 ：id是传递得数据
    {
      path: "/goodsInfo/:id",
      component: goodsInfo
    },
    // 使用购物车中间件
    {
      path: "/buycar",
      component: buycar
    },
    {
      path: "/payorder",
      component: payorder
    },
    {
      path: "/login",
      component: login
    },
  ]
}) ;
// router.beforeEach((to, from, next) => {
  
// })

// 注册全局管道函数
Vue.filter('cuttime', function (value) {
  return moment(value).format("YYYY-MM-DD")
});


Vue.config.productionTip = false

// 取值并判断 
let buylist = JSON.parse(window.localStorage.getItem('buylist')) || {};

// 实例化一个vuex的数据库 
const store = new Vuex.Store({
  state: {
    // buylist:{}
    // 快速赋值 
    buylist,
    // 判断是否登录 
    isLogin: false,
    // 记录来时的路由 
    frompath:''
  },
  // 使用getter计算属性(vuex方法)类似于computed
  getters: {
    totalcount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buylist) {
        // 累加总数\
        num += parseInt(state.buylist[key]);
      }
      return num;
    }
  },
  mutations: {
    // increment (state) {
    //   // 每次只能加一
    //   state.count++
    // }
    // 商品信息应该包括购买的数量以及商品id
    // info的格式为{goodid:xx;goodnum:xx}
    buygood(state, info) {
      if (state.buylist[info.goodid]) {
        // pasrseInt字符串转数组
        let oldnum = parseInt(state.buylist[info.goodid]);
        oldnum += parseInt(info.goodnum);
        // 重新赋值
        state.buylist[info.goodid] = oldnum;
      } else {
        // 没有数据直接赋值 vue不会跟踪属性
        // state.buylist[info.goodid]=info.goodnum
        // 使用Vue.set(obj, 'newProp', 123)替代
        Vue.set(state.buylist, info.goodid, parseInt(info.goodnum))
      }
    },
    // 直接更新某个id对应的数值
    // info{goodid:xxx,goodnum:xxx}
    changecount(state, info) {
      state.buylist[info.goodid] = info.goodnum;
    },
    // 删除商品的逻辑 
    delgodbyid(state, id) {
      // 删除对象 delete obj[key]
      // delete state.buylist[id]
      // 告诉vue已经删除了属性 
      Vue.delete(state.buylist, id)
    },
    // 将修改登录状态的变量暴露出去 
    changelogin(state, isLogin) {
      // 直接赋值
      state.isLogin = isLogin
    },
    // 将改变来时地址的变量暴露出去
    rememberfrompath(state,path){
      state.frompath = path;
    }
  },
});


// 使用导航守卫 boforeEach可以当做是一个回调函数 不是立即触发 所以这里的顺序不调整是可以的 判断是否登录
router.beforeEach((to, from, next) => {
  // 保存来时的路由 
  store.commit('rememberfrompath',from.path) ;
  // 去订单页之前判断是否登录
  if (to.path == '/payorder') {
    axios.get("/site/account/islogin")
      .then(response => {
        console.log(response);
        if (response.data.code == 'nologin') {
          // 进到这里则说明未登录 打回到登录页 使用编程式导航
          // console.log('未登录');
          next('/login')
        } else {
          // 已经登录
          next()
        }
      })
      .catch(err => {
        console.log(err);
      })
  }else{
    next();
  };
});

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  store,
  // 进入任何页面之前先判断用户的登录状态 以改变登录状态的标记
  created(){
    this.axios.get('site/account/islogin')
    .then(response=>{
      console.log(response);
      if(response.data.code=='logined'){
        this.$store.commit('changelogin',true)
      }else{
        this.$store.commit('changelogin',false)
      }
    })
  }
})
// 实现数据常驻 
// 在浏览器关闭之前 
window.onbeforeunload = function () {
  window.localStorage.setItem("buylist", JSON.stringify(store.state.buylist));
}