<template>
    <div>
        <!-- 1导入mint-ui中的header完成头部 -->
        <mt-header fixed title="王二栋vue项目"></mt-header>
        <!-- 1.0.1返回按钮 -->
        <div v-if="isshow" id="back">
            <a href="javascript:void(0)" @click="backTo">返回</a>
        </div>
        <!-- 2导入router-view进行占位 -->
        <router-view></router-view>
        <!-- 3导入mui的nav结构 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-contact"><span class="mui-badge">{{count}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import { getTotalCount,getTop,getLeft } from "../static/utils.js"//导入utils方法
    export default {
        data:function(){
            return {
                count:0,
                isshow:false
            }
        },
        watch:{
            "$route":function(newroute,oldroute){
                if (newroute.path.toLowerCase()=="/home") {
                    this.isshow=false;
                }else {
                    this.isshow=true;
                }
                console.log(newroute,oldroute)
            }
        },
        methods:{ 
            backTo(){
                //利用touter的路由中的go(-1)实现返回的效果(vue-router的方法)
                this.$router.go(-1);
            }
        },
        created:function(){
            var cartObj=JSON.parse(localStorage.getItem("cartData")||"{}");
            for (var key in cartObj){
                this.count+=parseInt(cartObj[key].count);//获取本地存储进行遍历取出值
            }
            window.eventBus.$on('cartUpdated',function(){//注册了cartUpdated方法
                // var cartObj=JSON.parse(localStorage.getItem("cartData")||"{}");
                // var total=0;
                // for (var key in cartObj){
                //     total+=parseInt(cartObj[key].count);
                // };

                var currentDom=document.querySelector('.mui-badge');//通过Dom操作取出其购物车元素进行文本更新
                currentDom.innerText=getTotalCount()+"";
            })
        },
        mounted:function(){
            var badge=document.querySelector('.mui-badge');//挂载一个没有关联的dom元素

            var tempLeft=getLeft(badge);//获取购物车按钮到屏幕左上角的距离
            var tempTop=getTop(badge);

            localStorage.setItem("badgeLeft",tempLeft);//存储在本地中
            localStorage.setItem("badgeTop",tempTop);
        }
    }
</script>

<style scoped>
    #back {
        width: 60px;
        position: fixed;
        z-index: 100;
        top: 10px;
        left: 10px;
        color: #fff;
    }
    #back a {
        color: #fff;
        font-size: 16px;
    }
</style>