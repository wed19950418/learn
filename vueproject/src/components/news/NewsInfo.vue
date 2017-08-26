<template>
    <div class="templateDiv">
        <div class="title">
            <h3>{{info.title}}</h3>
            <p>{{info.add_time | dateFmt("YYYY-MM-DD HH:mm:ss")}} {{info.click}}次浏览</p>
        </div>
        <div class="content" v-html="info.content"></div>
        <!-- <comment :mynewsid="123"></comment> -->
        <comment v-bind:mynewsid="newsId"></comment> 
        <!-- 3.0将这个值传给子组件 -->
    </div>
</template>

<script>
    import Comment from '../../subcomponents/Comment.vue';//导入组件

    export default {
        components:{
            comment:Comment
        },
        data:function(){
            return {
                info:{},
                 newsId:""//1.0定义字段
            };
        },
        created:function(){
            var newsId = this.$route.params.id;
            this.newsId=newsId;//2.0对字段赋值
            // console.log(newsId);
            var url = this.$urlPrefix + "/api/getnew/"+newsId;
            this.$http.get(url).then(function(response){
                // console.log(response.body);
                this.info = response.body.message[0];
            });
        }
    }

    // export default {
    //     components:{
    //         comment:Comment
    //     },
    //     data(){
    //         return {
    //             info:{},
    //             id:""//1.0定义字段
    //         };
    //     },
    //     created(){
    //         this.id=this.$route.params.id;
    //         // console.log(newsId)
    //         this.getinfo();
    //         // this.id=newsId;//2.0对字段赋值
    //     },
    //     methods:{
    //         getinfo(){
    //             var url = this.$urlPrefix + "/api/getnew/"+this.id;
    //             this.$http.get(url).then(function(response){
    //                 console.log(response.body)
    //                 this.info=response.body.message[0];
    //             })
    //         }
    //     }
    // }

    
</script>

<style scoped>
    .title{
        color:#0094ff;
    }
</style>