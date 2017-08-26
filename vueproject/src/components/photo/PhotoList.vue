<template>
    <div class="templateDiv">
        <div class="category">
            <!-- <ul v-bind="{style:"width:"+ulWidth+"px"}"> -->
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li @click="getPicList(0)">全部</li>
                <li v-for="item in categories" @click="getPicList(item.id)">{{item.title}}</li>
            </ul>
        </div>
        <div class="imglist">
            <ul>
                <li v-for="item in picList">
                    <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="tempurl">
                        <div class="desc">
                            <h5>{{item.title}}</h5>
                            <p>{{item.zhaiyao}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data:function(){
            return {
                categories:[],
                ulWidth:0,
                picList:[],
                tempurl:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=941890561,3857361259&fm=117&gp=0.jpg"
            }
        },
        methods:{
            //获取滑动的列表的数据
            getCategory:function(){
                var url=this.$urlPrefix+'/api/getimgcategory';
                this.$http.get(url).then(function(response){
                    this.categories=response.body.message;
                    var w=66;
                    var count=response.body.message.length+1;
                    this.ulWidth=w*count;
                })
            },
            //获取图片的数据
            getPicList:function(categoryId){
                var url = this.$urlPrefix + '/api/getimages/' + categoryId;
                this.$http.get(url).then(function(response){
                    console.log(response.body)
                    this.picList=response.body.message;
                })
            }
        },
        created:function(){
            this.getCategory();
            this.getPicList(0);
        }
    }
</script>

<style scoped>
    .category{
        width: 100%;
        overflow: auto;
    }
    .category ul{
        margin: 0px;
        padding-left: 10px;
        list-style: none;
        width: 2000px;
    }
    .category li{
        cursor: pointer;
        color:#0094ff;
        display: inline-block;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
        /*width: 62px;*/
    }

    /*图片详情样式*/
    .imglist ul {
        padding-left: 0px;
        list-style:none;
    }
    .imglist li{
        position: relative;
    }
    .imglist img{
        width:100%;
        height: 300px;
    }
    .desc{
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        position: absolute;
        bottom: 2px;
        left: 0px;
    }
    .desc h5{
        color: #ffffff;
        font-weight: bold;
    }
    .desc p{
        color:#fff;
    }

    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
</style>