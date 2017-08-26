<template>
    <div class="templateDiv">
        <div id="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in goodsList" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                        <div class="desc">
                            <p>
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p>
                                <h6 class="left">热卖中</h6>
                                <h6 class="right">剩余{{item.stock_quantity}}</h6>
                            </p>
                        </div>
                    </router-link>
                </li>
               
            </ul>    
        </div>

    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                goodsList:[]
            }
        },
        methods:{
            getGoodsList(){
                var url=this.$urlPrefix+'/api/getgoods?pageindex=1';
                this.$http.get(url).then(function(response){
                    this.goodsList=response.body.message;
                })
            }
        },
        created:function(){
            this.getGoodsList();
        }
    }
</script>

<style scoped>
    #mui-content li {
        border: 1px solid rgba(0,0,0,0.4);
        box-shadow: 0 0 4px #000;
        margin-left: 4px;
        padding: 5px;
    }
    #mui-content .mui-media-body {
        color: #0094ff;
    }
    #mui-content .desc{
        height: 60px;
        background-color: rgba(0,0,0,0.1);
        margin-top: 10px;
        padding: 5px;
        text-align: left;
    }
    #mui-content .desc span {
        color: red;
        margin-right: 15px;
    }
    #mui-content a {
        padding-left: 0px;
        padding-right: 0px;
    }
    #mui-content .desc .right{
        position: absolute;
        right: 10px;
        bottom: 0px;
    }
    #mui-content .desc .left{
        position: absolute;
        left: 10px;
        bottom: 0px;
    }
</style>