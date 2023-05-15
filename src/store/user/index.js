import { reqGetCode,reqLogout,reqUserInfo,reqUserLogin,reqUserRegister } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'

const state={
    code:'',
    token:getToken(),
    userInfo:{},
};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个接口，把验证码返回，但是正常情况下，回台会把验证码发到用户的手机上
        let result=await reqGetCode(phone);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result=await reqUserRegister(user);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 登录业务
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        // 服务器下方token，用户的唯一标识
        // 将来经常用token来向服务器要数据进行展示
        if(result.code==200){
            // 用户已经登录成功而且获取到了token
            commit('USERLOGIN',result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户的信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发送一次请求，通知服务器删除token
        let result=await reqLogout();
        if(result.code==200){
            commit('CLEAR');
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    // 清除本地的数据
    CLEAR(state){
        //把仓库中与用户相关的数据清空
        state.token='';
        state.userInfo={};
        removeToken();
    }
};
const getters={};

export default {
    namespace:true,
    state,
    actions,
    mutations,
    getters
}