// --------------------先请求获得数据,再渲染页面-------------
function renderUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status === 0) {
                console.log(res)
                let name = res.data.nickname || res.data.username;
                $('.username').text(name);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    $('.userimg').text(name.substr(0, 1).toUpperCase()).css('display', 'inline-block');

                }
            }
        }
    })
}
renderUser();
//----------------------退出-------------
$('#logout').on('click', function() {
    //清除token
    localStorage.removeItem('token');
    //跳转登录页
    location.href = '/login.html';

})