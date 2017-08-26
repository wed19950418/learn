<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in imgs" :key="item.img">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:["imgs"],
        data:function(){
            return {
            }
        },
        methods:{
        },
        created:function(){
        }
    }
</script>
<style scoped>
    .mint-swipe{
        height: 300px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe-item{
        width: 100%;
        height: 300px;
    }
</style>