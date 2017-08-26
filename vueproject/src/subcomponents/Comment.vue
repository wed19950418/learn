<template>
    <div>
        <!-- 评论组件哈哈哈{{mynewsid}} -->
        <div id="postcomment">
            <h3>提交评论</h3>
            <p class="p"></p>
            <textarea placeholder="请输入你要评论的内容" v-model="content"></textarea>
            <mt-button type="primary" size="large" v-on:click="postcomment">发表评论</mt-button>
        </div>
        <div id="list">
            <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in commontList">
                <div class="title">
                    <span>第{{index+1}}楼</span>
                    <span>用户:{{item.user_name}}</span>
                    <span>发表时间:{{item.add_time | dateFmt('YYYY-MM-DD hh:mm:ss')}}</span>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" v-text="item.content"></li>
                    </ul>
                </div>
            </div>
        </div>
       <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        props:['mynewsid'],
        data:function(){
            return {
                content:"",
                commontList:[],//接收数组
                pageIndex:1
            }
        },
        methods:{
            //提交数据
            postcomment:function(){
                var url = this.$urlPrefix + "/api/postcomment/" + this.mynewsid;
                this.$http.post(url,{content:this.content},{emulateJSON:true}).then(function(response){
                     console.log(response.body)
                    this.commontList=[{
                        "user_name":"匿名用户",
                        "add_time":new Date(),
                        "content":this.content
                    }].concat(this.commontList);
                    this.content="";
                    
                    // this.pageIndex=1;
                    // this.getCommentList();
                    // this.content="";
                })
            },
            //获取数据
            getCommentList:function(){
                var url= this.$urlPrefix + "/api/getcomments/" + this.mynewsid+"?pageindex="+this.pageIndex;
                this.$http.get(url).then(function(response){
                    console.log(response.body.message)
                   // this.commontList=response.body.message;//将获取到的值存在数组中
                   this.commontList=this.commontList.concat(response.body.message);
                })
            },
            getMore:function(){
                this.pageIndex++;
                this.getCommentList();
            }
        },
         created:function(){
                this.getCommentList();
            }
    }
</script>
<style scoped>
    #postcomment {
        padding: 5px;
    }
    .p {
        height: 1px;
        width: 100%;
        border-bottom: 1px solid rgba(0,0,0,0.3);
    }
    #list{
        padding: 5px;
    }
    .title{
        padding: 5px;
        color: #6d6d72;
        font-size: 15px;
        background-color: rgba(0,0,0,0.1);
    }
</style>