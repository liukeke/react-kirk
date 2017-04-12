import $ from 'jquery';
var request = function () {
    function defaultError(errorCode) {
        return {"result": false, "statusCode": -1}
    }
    function printErrorInfo(data, status, xhr) {
        console.log(data);
        console.log(status);
    }
    function ajax(url, method, data, successCB, errorCB) {
        var dataJson = {
            "channelId": "40000",
            "clientType": "ptb",
            "deviceNo": "6546465465465",
            "deviceType": "pc",
            "resolution": "",
            "version": "3.3.0",
            "data": data
        };
        $.ajax({
            type: method,
            url: url,
            cache: false,
            dataType: "json",
            data: JSON.stringify(dataJson),
            contentType: 'application/json; charset=utf-8',
            success: function (data, status, xhr) {
                if (data.code == 0) {
                    successCB(data, status, xhr)
                } else {
                    if (errorCB != null) {
                        errorCB(data, status, xhr)
                    }
                }
            },
            error: function (data, status, xhr) {
                printErrorInfo(data, status, xhr);
                if (errorCB != null) {
                    errorCB(defaultError(status), status, xhr)
                }
            }
        });
    }
    function get(url, data, successCB, errorCB) {
        return ajax(url, "get", data, successCB, errorCB);
    }
    function post(url, data, successCB, errorCB) {
        return ajax(url, "post", data, successCB, errorCB);
    }
    return {
        "get": get,
        "post": post
    }
}();
/*截取URL参数*/
var urlParam = (name, url) =>{
    var reg = new RegExp(".*[&\?]" + name + "=([^&]*)(&|$)");
    if (url == null) {
        var r = window.location.search.match(reg);
    } else {
        var r = url.match(reg);
    }
    if (r != null) return decodeURIComponent(r[1]);
    return null;
};
/*获取路由里值*/
var urlRouterParam = (name, url) =>{
    var reg = new RegExp(".*[&\#]" + name + "=([^&]*)(&|$)");
    if (url == null) {
        var r = window.location.hash.match(reg);
    } else {
        var r = url.match(reg);
    }
    if (r != null) return decodeURIComponent(r[1]);
    return null;
};
/*删除路由参数*/
var urlRouterDelParam = (name, url) => {
    var reg = new RegExp(".*[&\#]" + name + "=([^&]*)(&|$)");
    url = window.location.href;
    var r = window.location.hash.match(reg);
    var and = url.indexOf('&')!=-1 ? '&' : '';
    var returnStr = url.replace(name+'='+r[1]+and,'');
    window.location.href = returnStr;
};
/*重定向*/
var redirect = (address) => {
    window.location.href = address;
};
/*判断是否为空*/
var isNull = (str) => {
    return str == null || str == "";
};
/*产生指定范围的随机数，传入数组*/
var random = (range) => {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    var number = Math.ceil((Math.random() * diff + min));
    return number;
};
/*判断是否为空对象*/
var isEmptyObject = (obj) => {
    for (var n in obj) {
        return false;
    }
    return true;
};
/*统计中英文数量*/
var getBytesCount = (str)=>{
    var bytesCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
            bytesCount += 0.5;
        }
        else {
            bytesCount += 1;
        }

    }
    return bytesCount;
};
/*查找指定位置序号*/
var getBytes = (str, maxVal) => {
    var bytesCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
            bytesCount += 0.5;
        }
        else {
            bytesCount += 1;
        }
        if (bytesCount > maxVal) {
            return i;
            break;
        }
    }
};
/*删除左右两端的空格*/
var trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
/*删除左边的空格*/
var ltrim = (str) => {
    return str.replace(/(^\s*)/g, "");
};
/*删除右边的空格*/
var rtrim = (str) => {
    return str.replace(/(\s*$)/g, "");
};
/*判断是否为url*/
var checkUrl = (str) => {
    var reg = /^http:\/\/.+\..+/i;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};
var mySetTimeout = (fn, mDelay) => {
    var t = new Date().getTime();
    if (typeof fn == 'function') {
        var args = Array.prototype.slice.call(arguments, 2);
        var f = function () {
            args.push(new Date().getTime() - t - mDelay);  //该行用于实现对实际延迟和设定延迟的差值，同FF的最后一个参数，无实际意义
            fn.apply(null, args)
        };
        return window.setTimeout(f, mDelay);
    }
    return window.setTimeout(fn, mDelay);
};
/*数组去重*/
var arrayUnique = (arr) => {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
};
/*删除数组某个元素*/
var arrayRemove = (arr, val) => {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};
/*删除数组某个对象*/
var arrayObjRemove = (arr, val) => {
    for(var i =0;i <arr.length;i++){
        if(JSON.stringify(arr[i])==JSON.stringify(val)){
            arr.splice(i, 1);
            return arr;
        }
    }
};
/*只获取某个节点的文本内容*/
var text = (e) => {
    var t = "";

    //如果传入的是元素，则继续遍历其子元素
    //否则假定它是一个数组
    e = e.childNodes || e;

    //遍历所有子节点
    for (var j = 0; j < e.length; j++) {
        //如果不是元素，追加其文本值
        //否则，递归遍历所有元素的子节点
        t += e[j].nodeType != 1 ?
            e[j].nodeValue : text(e[j].childNodes);
    }
    //返回区配的文本
    return t;
};
/*判断是手机端还是电脑端*/
var isPhone = () => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true;
    } else {
        return false;
    }
};
/*验证身份证*/
var cardid = (str) => {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};
/*替换字符串中的URL*/
var strURLreplace = (str) =>{
    var str = str;
    var strRegex = '((https|http)://)[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+';
    var regex=new RegExp(strRegex,"gi");
    function replaceReg(reg,str){
        return str.replace(reg,function(m){return '<a href="'+m+'" target="_blank">'+m+'</a>';});
    }
    str = replaceReg(regex,str);
    return str;
};
/* 备注框 格式化 空格 回车 */
var textAreaDesc = (str) => {
    return str.replace(/ /g,'&nbsp;&nbsp;').replace(/\n/g,'<br/>')
};
/*判断是否是手机号*/
var isMobile = (val) => {
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(val);
};
/*判断是否是邮箱*/
var isEmail = (val) => {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/;
    return reg.test(val);
};
/*判断上传文件是否合法*/
var isUploadFile = (val,arr) => {
    var extStart=val.lastIndexOf('.');
    var ext=val.substring(extStart,val.length).toLowerCase();
    var release = false;
    arr.map(function(data){
        if(data==ext){
            release = true;
            return;
        }
    });
    return release;
};
export default {
    "get": request.get,
    "post": request.post,
    "urlParam": urlParam,
    "redirect": redirect,
    "isNull": isNull,
    "random": random,
    "isEmptyObject": isEmptyObject,
    "getBytesCount": getBytesCount,
    "getBytes": getBytes,
    "trim": trim,
    "ltrim": ltrim,
    "rtrim": rtrim,
    "checkUrl": checkUrl,
    "mySetTimeout": mySetTimeout,
    "arrayUnique": arrayUnique,
    "text": text,
    "isPhone": isPhone,
    "arrayRemove": arrayRemove,
    "arrayObjRemove": arrayObjRemove,
    "cardid":cardid,
    "strURLreplace":strURLreplace,
    "textAreaDesc":textAreaDesc,
    "isMobile":isMobile,
    "isEmail":isEmail,
    "urlRouterParam":urlRouterParam,
    "urlRouterDelParam":urlRouterDelParam,
    "isUploadFile":isUploadFile
};



