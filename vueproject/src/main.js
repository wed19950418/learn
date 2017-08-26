//1.0导入vue
import Vue from 'vue';

//2.0导入App.vue对象
import App from './App.vue';

//3.0导入mint-ui的对象和样式
import mintui from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(mintui)//使用mint-ui

//4.0导入mui的样式
import '../static/mui/css/mui.css';

//4.5导入site.css的样式
import '../static/css/site.css'

//5.0导入vue-router
import VueRouter from 'vue-router';
//5.1将对象绑定在Vue上
Vue.use(VueRouter);

//5.2分别导出组件
import Home from './components/Home.vue';
import member from './components/Member.vue';
import Cart from './components/Cart.vue';
import Search from './components/Search.vue';

import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from "./components/photo/PhotoList.vue";
import PhotoInfo from "./components/photo/PhotoInfo.vue";
import Video from "./components/video/Video.vue";
import CallMe from "./components/callme/CallMe.vue";
import FeedBack from "./components/feedback/FeedBack.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";
import common from "../static/common.js"
Vue.use(common)
//5.3定义路由规则
var router=new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
        {path:'/home',component:Home},
        {path:'/member',component:member},
        {path:'/cart',component:Cart},
        {path:'/search',component:Search},

        {path:'/news/newslist',component:NewsList},
        {path:'/news/newsinfo/:id',component:NewsInfo},
        {path:'/photo/photolist',component:PhotoList},
        {path:'/photo/photoinfo/:id',component:PhotoInfo},
        {path:'/goods/goodslist',component:GoodsList},
        {path:'/goods/goodsinfo/:goodsId',component:GoodsInfo},
        {path:'/goods/goodsdesc/:goodsId',component:GoodsDesc},
        {path:'/goods/goodscomment/:id',component:GoodsComment},
        {path:'/feedback',component:FeedBack},
        {path:'/video',component:Video},
        {path:'/callme',component:CallMe},
        {path:'/',redirect:'/home'}
    ]
})
//6.0导入vue-resource对象
import VueResource from 'vue-resource';
Vue.use(VueResource);

//7.0导入过滤器
import moment from 'moment';
Vue.filter("dateFmt",function(input,fmtstring){
    return moment(input).format(fmtstring)
})

//8.0导入缩略图放大效果的安装包
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//9.0在vue中渲染App
new Vue({
    el:'#app',
    router:router,
    render:function(create){
        return create(App); 
    },
    created(){
        window.eventBus=this;
    }
})  