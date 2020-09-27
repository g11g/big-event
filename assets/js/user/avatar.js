// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);

//------------------点击上传,剪裁头像--------------
$('button:contains("上传")').on('click', function(e) {
    // e.preventDefault();
    $('#file').trigger('click');

})
$('#file').on('change', function(e) {
        // e.preventDefault();

        let fileobj = this.files[0];
        let url = URL.createObjectURL(fileobj);
        // 销毁旧的裁剪区域 重新设置图片路径 重新初始化裁剪区域
        $image.cropper('destroy').attr('src', url).cropper(options);

    })
    //点击确定,提交ajax请求,渲染页面
$('button:contains("确定")').on('click', function() {
    var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
        url: '/my/update/avatar',
        type: 'POSt',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.renderUser();
            }
        }
    })
})