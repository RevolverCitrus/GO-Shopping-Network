import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
// 注册共用组件Carousel为--全局组件
import Carousel from '@/components/Carousel';
// 注册分页器--全局组件
import Pagination from '@/components/Pagination';
import { MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入MockServer.js---mock虚拟数据
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/swiper-bundle.min.css';

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 引入接口
import * as API from '@/api';

// 引入插件
import VueLazyload from 'vue-lazyload';
import logo from '@/assets/logo.png'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:logo
});

// 引入表单校验插件
import '@/Plugins/validate';



new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  // 注册路由
  router,
  // 注册仓库
  store,
}).$mount('#app')
