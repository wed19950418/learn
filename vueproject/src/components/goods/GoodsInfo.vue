<template>
    <div class="templateDiv">
        <div class="silder">
            <silder :imgs="imgs"></silder>
        </div>
        <div id="buy">
            <h4 v-text="goodsInfo.title"></h4>
            <p class="line"></p>
        <ul>
            <li class="price">
            市场价: <s>￥{{goodsInfo.market_price}}</s>    
            销售价：<span>￥{{goodsInfo.sell_price}}</span>
            </li>
            <li class="inputli">
            <div class="count">
                <span>购买数量：</span>
             <inputNumber v-on:dataobj="getcount" v-bind:goodsid="goodsInfo.id"></inputNumber>
             <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                 <div v-show="show" class="ball"></div>
             </transition>
             
             </div>  
            </li>
            <li>
            <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" size="small" v-on:click="addToCart">加入购物车</mt-button>
            </li>
        </ul>
        </div>
            <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}</li>
                <li>上架时间：{{goodsInfo.add_time | dateFmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <div id="other">
            <!-- <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button> -->
            <router-link v-bind="{to:'/goods/goodsdesc/'+goodsId}">
                <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <!-- <mt-button type="danger" size="large">商品评论</mt-button> -->
            <router-link v-bind="{to:'/goods/goodscomment/'+goodsId}">
                <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>
</div>
</template>

<script>
    import silder from "../Slide.vue";//导入
    import InputNumber from "../../subcomponents/InputNumber.vue";
    import { addNumber,getTop,getLeft } from "../../../static/utils.js"
    export default {
        components:{
            silder:silder,//导入的评论
            inputNumber:InputNumber//购物车的加减
        },
        data:function(){
            return {
                show:false,
                goodsId:0,
                imgs:[],
                goodsInfo:{},
                inputNumberCount:1//声明
            }
        },
        methods:{
            //详情页轮播图
            getcount:function(count){
                this.inputNumberCount=count.split(":")[1];//
                console.log("------------"+count);//购物车数量的变化
             },
            getimgs:function(){
                var url=this.$urlPrefix+"/api/getthumimages/"+this.goodsId;
                this.$http.get(url).then(function(response){
                    this.imgs=response.body.message;
                    var tempUrlList =[ {img:"http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg"},
                         {img:"http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg"}
                    ];//假数据轮播图片
                    this.imgs=tempUrlList;
                })
            },
            //详情页信息
            getGoodsinfo:function(){
                var url=this.$urlPrefix+"/api/goods/getinfo/"+this.goodsId;
                this.$http.get(url).then(function(response){
                    this.goodsInfo=response.body.message[0];
                })
            },
            //点击加入购物车
            addToCart:function(){
                // var cartDataStr=localStorage.getItem("cartData")||"{}";
                // var cartObj = JSON.parse(cartDataStr);
                // var savedItem = cartObj[this.goodsInfo.id];
                // if (savedItem) {
                //     savedItem.count=parseInt(savedItem.count)+parseInt(this.inputNumberCount);
                // }else {
                //     savedItem={};
                //     savedItem.id=this.goodsInfo.id;
                //     savedItem.title=this.goodsInfo.title;
                //     savedItem.price=this.goodsInfo.sell_price;
                //     savedItem.count=this.inputNumberCount;
                // }
                // cartObj[this.goodsInfo.id]=savedItem;
                // localStorage.setItem('cartData',JSON.stringify(cartObj));

                window.eventBus.$emit('cartUpdated',"");//监听cartUpdated事件

                addNumber (this.goodsInfo,this.inputNumberCount);//utils方法中的获取数量的调用

                this.show = true;//点击购物车的时候让动画显示
            },
            beforeEnter:function(el){
                el.style.transform="translate(0px,0px)";//动画起点
            },
            enter:function(el,done){
                el.offsetWidth;//动画过程

                var currentDivLeft=getLeft(el);//调用utils方法中的到屏幕的左边的距离
                var currentDivTop=getTop(el);//调用utils方法中的到屏幕的上边的距离

                var badgeLeft=localStorage.getItem("badgeLeft");
                var badgeTop=localStorage.getItem("badgeTop");

                var targetX=badgeLeft-currentDivLeft;
                var targetY=badgeTop-(currentDivTop-window.scrollY);

                // var targetX=100;
                // var targetY=100;
                el.style.transform="translate("+targetX+"px,"+targetY+"px)";
                done();
            },
            afterEnter:function(el){
                this.show=false;//动画结束隐藏
            }
        },
        created:function(){
            this.goodsId=this.$route.params.goodsId;//生命周期函数的使用
            this.getimgs();
            this.getGoodsinfo();
        }
    }
</script>

<style scoped>
    .silder{
         border:1px solid rgba(0,0,0,0.4);
         border-radius: 5px;
         margin: 5px;
     }
    #buy,#params,#other{
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
     #buy h4{
        color:#0094ff;
        padding: 5px;
     }
     #buy li,#params li{
         list-style: none;
         padding: 8px;
     }
    #buy .price span{
        color:red;
    }
    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    .count {
        display: flex;
    }
    .ball{
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: blue;
    position: absolute;
    left: 150px;
    top: 10px;
    transition:all 1s;
    z-index: 1000;
}
</style>