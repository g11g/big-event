//加载form
let form = layui.form;
//--------------------获取数据,渲染页面------------
function renderForm() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status === 0) {
                // layui中表单赋值方法
                form.val("formTest", res.data);
            }
        }
    })
}
renderForm();

//--------------------提交表单,渲染页面------------
$('form').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    //渲染页面
                    window.parent.renderUser();
                }
            }
        })
    })
    //-----------------重置-------------
$('button[type=reset]').on('click', function(e) {
    e.preventDefault();
    renderForm();
})