/**
 * Created by john on 2017/7/1.
 */

$(function(){
    $('[data-toggle="tooltip"]').tooltip()
    /*获得当前所有item*/
    var items=$(".carousel-inner .item");
    /*坚挺屏幕的大小*/
    $(window).on("resize",function(){
        /*获取当前屏幕的宽度*/
        var width=$(window).width();
        /*判断屏幕的宽度*/
        if(width>=768){
            $(items).each(function(index,value){
                var item=$(this);
                var imgSrc=item.data("largeImage");
                item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage","url('"+imgSrc+"')"));
            })
        }
        else{
            $(items).each(function(index,value){
                var item=$(this);
                var imgSrc=item.data("smallImage");
                item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'" alt="..."></a>');
            });
        }
    }).trigger("resize");

    var startX,endX;
    var carousel_inner=$(".carousel-inner")[0];
    /*获取当前轮播图*/
    var carsouel =$(".carousel");

    carousel_inner.addEventListener("touchstart",function(e){
        startX= e.targetTouches[0].clientX;
    })
    carousel_inner.addEventListener("touchend",function(e){
        endX= e.changedTouches[0].clientX;
        if(endX-startX>0){
            carsouel.carousel('prev')
        }
        else if(endX-startX<0){
            carsouel.carousel('next');
        }
    });
/**/
    var ul=$(".wjs_product .nav-tabs");
    var lis=ul.find("li");
    var totalWidth=0;
    lis.each(function(index,value){
        totalWidth=totalWidth+$(value).outerWidth(true);

    })
    ul.width(totalWidth);
    var myScroll = new IScroll('.tabs_parent', {
        scrollX:true, scrollY:false
    });
})