import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state={
    searchList:{}
};
const actions={
    // 获取search模块的数据
    async getSearchList({commit},params={}){
        // 调用这个函数在调用获取服务器的数据的时候，至少得传一个参数（空对象）
        // params参数：是当用户派发actions的时候，第二个参数传递过来的，至少是一个空对象
        let result=await reqGetSearchInfo(params);
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data);
        }
    }
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
};
// 计算属性
//在项目中getter主要的作用是：简化仓库中的数据（为了简化数据而生）
// 可以将我们将来在组件当中要用到的数据简化一下【将来组件在获取数据的时候就方便了】
const getters={
    // 当前这个state是当前仓库中的state，并不是大仓库的state
    goodsList(state){
        // 这样写的原因是，因为如果返回的state.searchList是一个空对象，
        // 那这个state.searchList.goodsList就是一个undefined
        // 所以必须要有返回，至少是一个[]
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
};

export default {
    namespace:true,
    state,
    actions,
    mutations,
    getters
}