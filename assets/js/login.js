// ---------------------------切换框------------------------
//切换到注册框
$('.login a').click(function() {
        $('.login').hide().next().show();
    })
    //切换到登录框
$('.register a').click(function() {
    $('.login').show().next().hide();
})