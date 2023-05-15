<template>
    <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterIsShow">
                    <h2 class="all">全部商品分类</h2>
                    <!-- 过渡动画 -->
                    <transition name="sort">
                        <div class="sort" v-show="isShow">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2) in c1.categoryChild.slice(0,10)" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3) in c2.categoryChild.slice(0,5)" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">GO购超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
// 引入方式：把lodash全部的功能函数引入
// import _ from 'lodash';
// 最好的引入方式是按需引入
import {throttle} from 'lodash';
export default {
    name:'TypeNav',
    data(){
        return{
            // 存储用户鼠标移上哪一个一级分类
            currentIndex:-1,
            isShow:true,
        }
    },
    methods:{
        // 鼠标进入修改响应式数据currentIndex属性
        // 使用lodash的throttle进行节流操作
        // throttle回调函数别用箭头函数，可能出现上下文this的问题
        changeIndex:throttle(function(index){
            // index:鼠标移上某个一级分类的索引值
            this.currentIndex=index;
        },50),

        // 一级分类鼠标移出的事件回调
        leaveShow(){
            this.currentIndex=-1;
            if(this.$route.path!='/home'){
                this.isShow=false;
            }
        },
        // 路由跳转的方法
        goSearch(event){
            // 最好的解决方案是：编程式导航+事件委派
            // 利用事件委派存在的问题：1.不知道点击的是不是a标签 2.如何获取参数{1，2，3级分类的产品的名字，id}
            // 存在另外一个问题，即使你能确定点击的是a标签，但如何区分是1级，2级，3级分类的标签

            // 第一个问题：把子节点中的a标签，加上自定义属性data-categoryName,其余的子节点是没有的
            let element=event.target;
            // 获取到当前触发这个事件的节点【h3,a,dt,dl】,需要带有data-categoryName属性这样的节点【一定是a标签】
            // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            let {categoryname,category1id,category2id,category3id} =element.dataset;
            // 如果标签身上拥有categoryname一定是a标签
            if(categoryname){
                // 整理路由跳转的参数
                let location={name:"search"};
                let query={categoryName:categoryname};

                // 如何区分a标签的级别
                if(category1id){
                    query.category1Id=category1id;
                }else if(category2id){
                    query.category2Id=category2id;
                }else{
                    query.category3Id=category3id;
                }
                // 判断：如果路由跳转的时候，带有params参数，捎带传递过去
                if(this.$route.params){
                location.params=this.$route.params;
                // 整理完参数
                location.query=query;
                // 路由跳转
                this.$router.push(location);
                }
            }
        },
        enterIsShow(){
            if(this.$route.path!='/home'){
                this.isShow=true;
            }
        }
    },
    // 组件挂载完毕：可以向服务器发送请求
    mounted(){
        // 当组件挂载完毕，让isShow属性变为false
        // 当不是Home路由组件，将typeNav进行隐藏
        if(this.$route.path!='/home'){
            this.isShow=false;
        }
    },
    computed:{
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state 其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList,
        })
    }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 28px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .cur{
                        background: skyblue;
                    }
                }
            }
            // 过渡动画的样式
            // 过渡动画开始的状态（进入）
            .sort-enter{
                height: 0;
            }
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画的时间，速率
            .sort-enter-active{
                transition: all .5s linear;
                // overflow: hidden;
            }
        }
    }
</style>