// 对axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// start 进度条开始 done 进度条结束
// 引入进度条样式
import '../../node_modules/nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下


const requests=axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/mock',
    // 代表请求超时的时间
    timeout:5000,
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始动
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new error('fail'));
});

export default requests;