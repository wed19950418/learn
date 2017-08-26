<template>
    <div class="container">
        <div class="inleft" v-on:click="substrict">-</div>
        <div class="incenter" v-on:click="count">{{count}}</div>
        <div class="inright" v-on:click="add">+</div>
    </div>
</template>

<script>
    export default {
        props:["initcount","goodsid"],
        data:function(){
            return {
                count:1
            }
        },
        methods:{
            substrict:function(){
                this.count=this.count-1;//点击按钮实现加减操作
                if (this.count<1) {
                    this.count=1;
                }
                this.getcount();
            },
            add:function(){
                this.count=this.count+1;
                this.getcount();
            },
            getcount:function(){
                this.$emit('dataobj',this.goodsid+":"+this.count)//通过emit创建了一个dataobj的方法，谁使用了这个方法，就可以得到对应的值
            }
        },
        created:function(){
            if(this.initcount){
                this.count = this.initcount;
                }
            }
    }
</script>

<style scoped>
    .container{
        display: flex;
    }
    .inleft,.inright,.incenter{
        border: 1px solid #ccc;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        text-align:center;
        line-height: 20px;
    }
</style>