//------------------自定义验证码密码-------
let form = layui.form;
form.verify({
        //验证密码长度
        len: [/^[\S]{6,12}$/, '密码长度必须在6-12位'],
        //验证新密码与旧密码一致
        differ: function(val) {
            //获取原密码
            let oldPwd = $('#oldPwd').val();
            if (oldPwd === val) return '新密码与原密码一致';
        },
        //验证确认密码与新密码一致
        some: function(val) {
            //获取新密码
            let newPwd = $('#newPwd').val();
            if (newPwd !== val) return '两次密码输入不一致';
        }
    })
    //------------------提交表单,发送ajax请求------------
$('form').on('submit', function(e) {
    e.preventDefault(); //阻止默认事件
    let data = $(this).serialize(); //收集数据
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                console.log(res)
                    //清空表单
                $('form')[0].reset();
            }
        }
    })

})