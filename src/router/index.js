// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import routes from "@/router/routes";
// 引入store
import store from "@/store";

// 先把VueRouter原型对象的push保存一份
// 先把VueRouter原型对象的replace保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数，告诉原来的push方法，你往哪里跳转（传递的是什么参数）
// 第二个参数，成功的回调
// 第三个参数，失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y:0，代表的是滚动条在最上方
        return {
            y: 0,
        };
    },
});

// 全局路由守卫：前置
router.beforeEach(async (to, from, next) => {
    // 获取仓库中的token----可以确定用户是登录了
    let token =store.state.user.token;
    let name =store.state.user.userInfo.name;
    // 用户登录了
    if(token){
        // 登录了而且还想去login---不行
        if(to.path=='/login'||to.path=='/register'){
            next('/home');
        }else{
            // 已经登录，而且访问的是非login和register
            if(name){
                // 登录了，而且拥有用户的信息
                next();
            }else{
                // 登录了，但没有用户的信息
                try{
                    // 在路由跳转之前获取用户信息，有用户的信息再放行
                    await store.dispatch('getUserInfo');
                    next();
                }catch(error){
                    // token失效了，要重新登录，但要先清除用户的相关的数据
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        // 未登录不能去交易相关的页面，不能去支付相关的【pay|paysuxxess】,不能去个人中心
        // 未登录，去上面的这些路由，应该跳转到登录页
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录的时候想去但没去成的信息，存储于地址栏中【路由】
            next('/login?redirect='+toPath);
        }else{
            // 去的不是上面的这些路由（home|search|shopCart）---放行
            next();
        }
        

    }
});

export default router;