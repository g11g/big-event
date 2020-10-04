let form = layui.form;

// ------------------- 获取地址栏的id参数值，这个id就是文章的id --------------
let id = new URLSearchParams(location.search).get('id');



//获取文章类别的内容------------
$.ajax({
    url: '/my/article/cates',
    success: function(res) {
        if (res.status === 0) {
            //使用模板引擎
            let p = template('tpl-list', res);
            $('select[name=cate_id]').html(p);
            form.render('select'); //刷新select选择框渲染

            //-------------------完成数据回填----------------
            $.ajax({
                url: '/my/article/' + id,
                data: id,
                success: function(res) {
                    if (res.status === 0) {
                        //使用layui的form模块完成表单赋值
                        form.val('aaa', res.data);

                        // 初始化富文本编辑器------------------------
                        initEditor();

                        // 更换图片
                        $image.cropper('destroy').attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img).cropper(options);
                    }
                }
            })
        }
    }
})







//文章封面------------------------------
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

// 点击按钮，能够选择图片
$('button:contains("选择封面")').on('click', function() {
    $('#file').trigger('click');
})

// 文件域的文件切换的时候，更换剪裁区的图片
$('#file').on('change', function(e) {
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image.cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

//提交表单,阻止默认事件,使用FormData()获取数据,因为有file
$('form').on('submit', function(e) {
    e.preventDefault();
    let fd = new FormData(this);
    // 替换FormData对象里面的一项
    fd.set('content', tinyMCE.activeEditor.getContent());

    // 剪裁图片
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });

    canvas.toBlob(function(blob) {
        // 把 文件 追加到fd中
        fd.append('cover_img', blob);

        // 根据接口要求，修改文章的时候，FormData中必须有文章id
        fd.append('Id', id);
        //发送请求,完成ajax
        $.ajax({
            type: 'POST',
            url: '/my/article/edit',
            data: fd,
            //有FormData要写一下两行代码
            processData: false,
            contentType: false,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/article.html';
                }
            }
        })
    })
})