import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
// 封装游客身份的模块uuid---生成一个随机的字符串【不能再变】
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
};
const actions={
    // 获取产品信息的action
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的结果
        // 加入购物车以后（发送请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表本次操作成功
        // 因为服务器没有返回其他数据，因此我们不用三连环存储数据
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code==200){
        // 代表加入购物车成功
            return 'ok';
        }else{
        // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
        
    }
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
};
// 简化数据
const getters={
    // 路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 简化产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};

export default {
    namespace:true,
    state,
    actions,
    mutations,
    getters
}