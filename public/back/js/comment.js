// 进度条功能

  $(document).ajaxStart(function(){
    NProgress.start();

  });

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();

    },500);
  })

  // 侧边栏分类栏显示隐藏切换
  $('.side_nav .main_category').click(function(){
    $('.side_nav .side_categray').stop().slideToggle()

  })

  //侧边栏显示隐藏切换

  $('.lt_topnav .nav_menu').click(function(){

    $('.lt_side').toggleClass('hidemenu');
    $('.lt_topnav').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');


  })

  //退出时显示模态框

  $('.lt_topnav .nav_checkout').click(function(){
    $('#myModal').modal('show');

  })

  //退出功能转到Login页面

  $('#modle_checkout').click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function( info ){
        if( info.success ){
          location.href = "login.html";
        }
      }

    })


  })