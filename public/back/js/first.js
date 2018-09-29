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
    });
  }

        $("#addCategory").on("click", function(){
          $("#addModal").modal("show");
          

        })
        $("#form").bootstrapValidator({
          //小图标
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          //校验规则
          fields:{
            categoryName:{
        
              validators:{
                //非空
                notEmpty:{
                  message:"请输入一级分类"
                }
              }
        
            }
          }
        });
        $("#form").on("success.form.bv",function(e){
          e.preventDefault();

            $.ajax({
              type:"post",
              url:"/category/addTopCategory",
              data: $('#form').serialize(),
              dataType:"json",
              success: function(info){
                console.log(info);
                if(info.success){
                $('#addModal').modal('hide');
                currentPage = 1;
                render();
                $('#form').data("bootstrapValidator").resetForm(true);
              }
            }

            })



        });



      
    })
  
