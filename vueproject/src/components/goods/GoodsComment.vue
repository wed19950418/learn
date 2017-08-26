<template>
    <div class="templateDiv">
        <comment v-bind:mynewsid="id"></comment>
    </div>
</template>

<script>
    import Comment from "../../subcomponents/Comment.vue";
    export default {
        data:function(){
            return {
                id:0
            }
        },
         components:{
            comment:Comment
        },
        methods:{

        },
        created:function(){
            var goodsId=this.$route.params.id;
            this.id=goodsId;
        }
    }
</script>

<style scoped>
    
</style>