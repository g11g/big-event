// ------------------------统一配置ajax-------------
$.ajaxPrefilter(function(option) {
    //统一配置URL
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    //判断页面为登录页还是首页
    //包括/my的是首页
    if (option.url.includes('/my')) {
        //统一配置请求头
        option.headers = {
                Authorization: localStorage.getItem('token')
            }
            //统一配置请求完成时的判断
        option.complete = function(xhr) {
            // console.log(xhr);
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！") {
                //移除假token
                localStorage.removeItem('token');
                //身份验证失败,跳转到登录页
                location.href = '/login.html';
            }
        }
    }

})