<template>
    <div class="templateDiv">
        <div class="row" v-for="(item,key) in datalist">
            <mt-switch class="switch" v-model="item.checked" v-on:change="switchChange"></mt-switch>
            <img class="img" alt="商品图片">
            <div class="inforight">
                <h4>{{item.title}}</h4>
                    <div class="bottom">
                        <ul>
                        <li>￥{{item.price}}元</li>
                        <li>
                            <inputnumber v-on:dataobj="getMessage" v-bind:initcount="item.count" v-bind:goodsid="item.id"></inputnumber>
                        </li>
                        <li>
                            <a href="javascript:void(0)">删除</a>
                        </li>
                        </ul>
                    </div>
            </div>
        </div>

        <div id="total">
                <div class="desc">
                <ul>
                <li>总计（不含运费）</li>
                <li>已勾选商品{{this.count}}件,总价:￥{{this.amount}}元</li>
                </ul>
                </div>
                <div id="button">
                <mt-button  type="danger" size="small">去结算</mt-button>
                </div>
        </div>
    </div>
</template>
<script>
    import inputnumber from "../subcomponents/inputNumber.vue";
    import { getAll,updateTo } from "../../static/utils.js"
    export default {
        components:{
            inputnumber:inputnumber
        },
        data:function(){
            return {
                datalist:[],
                value:false,
                count:0,
                amount:0
            }
        },
        created:function(){
            this.datalist=getAll();

            for (var key in this.datalist){
                this.datalist[key].checked=false;
            }
        },
        methods:{
            getMessage:function(input){
                console.log("haha!"+input);
                var targetGoodsId=input.split(":")[0];
                var targetGoodsNum=parseInt(input.split(":")[1]);
                updateTo(targetGoodsId,targetGoodsNum);

                this.datalist[targetGoodsId].count=parseInt(targetGoodsNum);

                window.eventBus.$emit("cartUpdated","");
                this.calc();
            },
            switchChange:function(){
                this.calc();
            },
            calc:function(){
                var totalCount=0;
                var totalAmount=0;
                for (var key in this.datalist){
                    var item=this.datalist[key];
                    if (item.checked) {
                        totalCount+=item.count;
                        totalAmount+=item.count*item.price;
                    }
                }
                this.count=totalCount;
                this.amount=totalAmount;
            }
        }
    }
</script>
<style scoped>
    .row{
        border-bottom: 1px solid rgba(0,0,0,0.3);
        height: 102px;
        display: flex;
        padding: 5px;
    }
    .switch{
        flex:0 0 52px;
    }
    .img{
        border: 1px solid #ccc;
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
    }
    .inforight{
        margin-left: 5px;
        flex:1;
    }
    .inforight ul{
        padding-left: 0px;
    }
    .inforight li{
        list-style: none;
        display: inline-block;
    }
    .inforight h4{
        color: #0094ff;
        font-size: 14px;
    }
    .bottom li:first-child{
        color:red;
        margin-right: 5px;
    }
    .bottom li:last-child{
        margin-left: 5px;
    }
    #total{
        height: 100px;
        background-color: rgba(0,0,0,0.1);
        display: flex;
        padding: 5px;;
    }
    #total ul {
        padding-left: 0px;
    }
    #total li{
        list-style: none;
        font-size: 14px;
    }
    #button{
        flex:0 0 60px;
        margin: 30px 0 0 0 ;
    }
    .desc{
        flex:1;
    }
</style> 