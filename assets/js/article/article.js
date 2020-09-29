let laypage = layui.laypage;
let form = layui.form;

let data = {
    pagenum: 1, //页码值
    pagesize: 2 //每页显示多少条数据
        //cate_id   文章分类的 Id
        //state    文章的状态，可选值有：已发布、草稿
}

// --------------------------------获取数据,渲染页面--------------------
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data,
        success: function(res) {
            if (res.status === 0) {
                console.log(res)
                let html = template('tpl-list', res);
                $('tbody').html(html);
                //分页回调函数的形参
                showPage(res.total);

            }
        }
    })
}
renderArticle();

// --------------------------------分页--------------------
function showPage(t) {
    laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: t, //数据总数，从服务端得到
        curr: data.pagenum, //起始页
        limit: data.pagesize, //每页显示的条数
        limits: [2, 3, 5, 10], //每页条数的选择项
        layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
        jump: function(obj, first) {
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if (!first) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;

                renderArticle();

            }
        }
    });
}

// --------------------------------筛选功能--------------------
//发送ajax获取id和state
$.ajax({
    url: '/my/article/cates',
    success: function(res) {
        if (res.status === 0) {
            //使用模板引擎
            let p = template('tpl-cate', res);
            $('select[name=category]').html(p);
            form.render('select'); //刷新select选择框渲染
        }
    }
})

//提交表单,阻止默认事件,发送请求
$('.search').on('submit', function(e) {
    e.preventDefault();
    data.cate_id = $('select[name=category]').val();
    data.state = $('select[name=status]').val();
    //回到起始页
    data.pagenum = 1;
    renderArticle();
})