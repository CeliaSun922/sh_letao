$(function(){

  var currentPage = 1;
  var pageSize = 5;

    render();

  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
     
        var tmp = template("tmp", info);
        $('tbody').html(tmp);
        
        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page, //当前页
          totalPages: Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });
      }
    })
  }
})