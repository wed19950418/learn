<template>
    <div class="templateDiv">
        <div>
            <h4>{{photoinfo.title}}</h4>
        <p>{{photoinfo.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览</p>
        <p class="line"></p>
    </div>
        <p v-html="photoinfo.content"></p>
    
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in imageList" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <!-- <a to="#">
                    <img v-bind:src="item.src" alt="">
                     </a> -->
                     <img :src="item.src" class="preview-img" height="100px" @click="$preview.open(index,imageList)">
                </li>
            </ul>
        </div>

        <comment v-bind:mynewsid="id"></comment> 
        <!-- 3.0将这个值传给子组件 -->
    </div>
</template>
<script>

    import Comment from '../../subcomponents/Comment.vue';
    export default {
        
        data:function(){
            return {
                id:0,
                photoinfo:{},
                imageList:[]
            }
        },
        methods:{
            getinfo:function(){
                var url=this.$urlPrefix+"/api/getimageInfo/"+this.id;
                this.$http.get(url).then(function(response){
                    console.log(response.body)
                    this.photoinfo=response.body.message[0];
                })
            },
            getImages:function(){
                var url=this.$urlPrefix+"/api/getthumimages/"+this.id;
                this.$http.get(url).then(function(response){
                    console.log(response.body)

                    var tempUrlList = [
                            "http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg",
                            "http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg",
                            "http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg",
                            "http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg",
                            "http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg",
                            "http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg",
                            "http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg",
                            "http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg"
            ];
                    this.imageList=response.body.message;
                    this.imageList.forEach(function(item,index){
                        item.src=tempUrlList[index];
                        var img=document.createElement("img");
                        img.src=item.src;
                        item.w=img.width;
                        item.h=img.height;
                    })
                })
            }
        },
        created:function(){
            this.id=this.$route.params.id;
            this.getinfo();
            this.getImages();
        },
        components:{
            comment:Comment
        }
    }
</script>
<style scoped>
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.4);
        margin-top: 10px;
    }
    .title .line{
          width: 100%;
          height: 1px;
          border-bottom: 1px solid rgba(0,0,0,0.4);
    }
    .mui-content,.mui-content ul{
      background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
          border-right:0px;
          border-bottom:0px;
    }
    .mui-grid-view.mui-grid-9{
          border-top:0px;
          border-left:0px;
    }
    .mui-content img{
    width: 100px;
    height: 100px;
    }
</style>