<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// 引包
import Swiper from 'swiper';
export default {
    name: "Carousel",
    props: ['list'],
    watch: {
        list: {
            // 立即监听，不管数据有没有变化，上来立即监听一次.
            // 为什么watch监测不到list,因为数据出来没有发生变化（数据本来就是父亲给的，给的时候是一个对象，对象里面的数据都是准备好的）
            immediate: true,
            handler() {
                // 只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定，所以还是要使用到nextTick
                this.$nextTick(() => {
                    //初始化Swiper类的实例
                    var mySwiper = new Swiper(
                        this.$refs.cur,
                        {
                            //设置轮播图防线
                            direction: "horizontal",
                            //开启循环模式
                            loop: true,
                            // 如果需要分页器
                            pagination: {
                                el: ".swiper-pagination",
                                //分页器类型
                                type: "bullets",
                                //点击分页器，切换轮播
                                clickable: true,
                            },

                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                });
            }
        }
    }
};
</script>

<style scoped lang="less">

</style>
