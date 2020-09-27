//统一配置Header和URL
$.ajaxPrefilter(function(options) {
    options.headers = { Authorization: localStorage.getItem('token') },
        options.url = 'http://ajax.frontend.itheima.net' + options.url,
        //加载进度条
        options.beforeSend = () => {
            NProgress.start();
        },
        options.complete = () => {
            NProgress.done();
        }
})


//-*--------------------------获取数据,渲染页面-------------
function renderCategory() {
    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            let html = template('tpl-list', res);
            $('tbody').html(html);
        }
    })
}
renderCategory();
//-*--------------------------删除数据-------------
$('tbody').on('click', 'button:contains("删除")', function() {
    //获取id
    let id = $(this).data('id');
    //删除前询问
    layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, (index) => {
        //do something
        $.ajax({
            url: '/my/article/deletecate/' + id,
            data: id,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory();
                }

            }
        });
        layer.close(index);
    });
})

//-*--------------------------编辑数据-------------
let index = null; //声明弹出层索引
$('tbody').on('click', 'button:contains("编辑")', function() {
    //获取数据
    let data = $(this).data();
    //弹出层
    index = layer.open({
        type: 1,
        title: '修改文章分类',
        content: $('#tpl-bj').html(),
        area: ['500px', '250px'],
    });
    //给输入框添加数据
    $('input[name=Id]').val(data.id);
    $('input[name=name]').val(data.name);
    $('input[name=alias]').val(data.alias);
})

//提交表单,完成最终修改
$('body').on('submit', '#bj', function(e) {
    e.preventDefault(); //阻止默认事件
    // console.log(this)
    //收集表单数据
    let data = $(this).serialize();
    // console.log(data)

    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data,
        success: function(res) {
            //提示框
            layer.msg(res.message);
            if (res.status === 0) {
                // console.log(res)
                //渲染页面
                renderCategory();
                //关闭弹层
                layer.close(index)
            }
        }
    })
})

//-*--------------------------添加数据-------------
let i = null;
$('body').on('click', 'button:contains("添加类别")', function() {
    //弹出层
    i = layer.open({
        type: 1,
        title: '添加文章分类',
        content: $('#tpl-del').html(),
        area: ['500px', '250px'],
    });
})

//点击完成表单提交,添加数据
$('body').on('click', 'button:contains("确认添加")', function(e) {
    e.preventDefault(); //阻止默认事件
    let data = $('#del').serialize(); //收集表单数据
    //发送ajax请求
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data,
        success: function(res) {
            layer.msg(res.message); //提示
            if (res.status === 0) {
                renderCategory(); //渲染页面
                //关闭弹层
                layer.close(i);
            }
        }
    })
})