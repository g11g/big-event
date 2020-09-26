// ---------------------------切换框------------------------
//切换到注册框
$('.login a').click(function() {
        $('.login').hide().next().show();
    })
    //切换到登录框
$('.register a').click(function() {
    $('.login').show().next().hide();
})

// --------------------------注册-------------------------
//提交表单,阻止默认事件
$('.register form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: $(this).serialize(),
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                //清空输入框
                $('.register form')[0].reset();
                //转到登录框
                $('.register a').click();
            }
        }
    })
})

//验证表单
let form = layui.form;
form.verify({
        //密码位数在6-12之间
        len: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //确认密码和密码一致
        some: function(val) {
            //获取密码框的值
            let pwd = $('.register .pwd').val();
            if (pwd !== val) {
                return '两次密码不一致';
            }
        }
    })
    // --------------------------登录-------------------------
$('.login form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: $(this).serialize(),
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                //把token存到本地
                localStorage.setItem('token', res.token)
                    //转到index.html
                location.href = '/index.html';
            }
        }
    })
})