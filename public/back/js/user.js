$(function () {
  //渲染user页面功能
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();

  function render() {

    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        var tmp = template("tmp", info);

        $('tbody').html(tmp);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });

      }
    })

  }

  //用户禁用启用按钮 显示模态框

  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

  })


// 点击模态框确认按钮, 实现修改禁用启用状态, 发送ajax请求
  $('#submitBtn').on("click", function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id: currentId,
        isDelete: isDelete
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if( info.success ){
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })
})