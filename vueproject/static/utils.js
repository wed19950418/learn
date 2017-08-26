export function addNumber(goodsInfo,number){
    var cartDataStr = localStorage.getItem("cartData") || "{}";
    var cartObj = JSON.parse(cartDataStr);
    var savedItem = cartObj[goodsInfo.id];
    if(savedItem) {
        //已经存在数据了
        savedItem.count = parseInt(savedItem.count) + parseInt(number);
    } else {
        //从来没有这个商品的数据
        savedItem = {};
        savedItem.id = goodsInfo.id;
        savedItem.title = goodsInfo.title;
        savedItem.price = goodsInfo.sell_price;
        savedItem.count = number;
    }
    cartObj[goodsInfo.id] = savedItem;
    localStorage.setItem("cartData",JSON.stringify(cartObj));
}
export function getTotalCount() {
    var savedObj = JSON.parse(localStorage.getItem("cartData")||"{}");
    var totalCount = 0;
    for(var key in savedObj) {
        totalCount += savedObj[key].count;
    }
    return totalCount;
}
export function updateTo(id,newNumber){
    var cartDataStr = localStorage.getItem("cartData") || "{}";
    var cartObj = JSON.parse(cartDataStr);
    var savedItem = cartObj[id];
    savedItem.count = parseInt(newNumber);
    cartObj[id] = savedItem;
    localStorage.setItem("cartData",JSON.stringify(cartObj));
}
export function deleteItem(id){
    var savedObj = JSON.parse(localStorage.getItem("cartData")||"{}");
    delete savedObj[id];//删除属性
}
export function getAll() {
    var savedObj = JSON.parse(localStorage.getItem("cartData")||"{}");
    return savedObj;
}

export function getTop(e){
    var offset=e.offsetTop;
    if (e.offsetParent!==null) offset+=getTop(e.offsetParent);
    return offset;
}

export function getLeft(e){
    var offset=e.offsetLeft;
    if (e.offsetParent!==null) offset+=getLeft(e.offsetParent);
    return offset;
}