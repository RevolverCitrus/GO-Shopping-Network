import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";

const state={
    cartList:[]
};
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code==200){
            commit('GETCARTLIST',result.data);
        }
    },
    // 删除购物车某个商品
    async deleteCartListBySkuId({commit},skuId){
        let result =await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车某个商品的选中的状态
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库
        // 获取购物车中全部的商品（是一个数组）
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            // 将，每一次返回的Promise添加到数组中
            PromiseAll.push(promise);
        });
        // 只要全部的p1|p1....都成功，返回结果即为成功，只要有一个失败，那结果就是失败
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll=[];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise=dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked,});
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }
    
};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
};
const getters={
    cartList(){
        return state.cartList[0]||{};
    },
};

export default{
    namespace:true,
    state,
    actions,
    mutations,
    getters
}