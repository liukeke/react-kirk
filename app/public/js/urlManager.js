import cookie from 'react-cookie';

var token = cookie.load('token');
/*通过设置环境变量区分开发环境与测试环境*/
var domain = process.env.NODE_ENV=='production' ? '' : 'http://www.baidu.com';
var postApi = (host, path) => {
    return host + path + '?token=' + token + '&time=' + Math.floor(new Date().getTime() / 60000);
};
var cdn = "";
var getUrl = (host, path) => {
    return host + path;
};

export default {
    "aTagAll":postApi(domain, "/u/tag/all"),
    //错误提示
    "errorTipsFun": function (str) {
        if(!str){
            str = '出了点小问题，请稍后重试';
        }
        $('body').append('<i class="errorTipsLayer">'+str+'</i>');
        $('.errorTipsLayer').css({'margin-left':0-$('.errorTipsLayer').width()/2});
        setTimeout(function(){
            $('.errorTipsLayer').remove();
        },2000)
    },
    "errorLogin": function () {
        window.location.href = this.pLoginReg + '?returnUrl=' + encodeURIComponent(window.location.href);
    }
};