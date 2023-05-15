// 路由配置信息

// 引入一级路由组件

// Home使用了路由懒加载，所以不用先引入
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由组件
import GroupOrder from '@/pages/Center/groupOrder'
import MyOrder from '@/pages/Center/myOrder'

export default[
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder,
            },
            // 二级路由重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },    
    {
        path:'/home',
        // component:Home,
        // 路由懒加载
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:'search'
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true},
        name:'detail'
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true},
        name:'addcartsuccess'
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true},
        name:'shopcart'
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 想去交易页面，必须是从购物车中来
            if(from.path=='/shopcart'){
                next();
            }else{
            // 如果是从其他的路由组件而来，就停留在原地
                next(false);
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 想去交易页面，必须是从trade中来
            if(from.path=='/trade'){
                next();
            }else{
            // 如果是从其他的路由组件而来，就停留在原地
                next(false);
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true},
    },
    // 重定向，访问/，立马定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]