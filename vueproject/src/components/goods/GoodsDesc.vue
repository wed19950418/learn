<template>
    <div class="templateDiv">
        <h4 v-text="info.title"></h4>
        <p class="line"></p>
        <p v-html="info.content"></p>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                goodsId:0,
                info:{}
            }
        },
        methods:{
            getinfo:function(){
                var url=this.$urlPrefix+'/api/goods/getdesc/'+this.goodsId;
                this.$http.get(url).then(function(response){
                    this.info=response.body.message[0];
                })
            }
        },
        created:function(){
            this.goodsId=this.$route.params.goodsId;
            this.getinfo();
        }
    }
</script>
<style scoped>
</style>