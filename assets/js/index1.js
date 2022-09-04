$(function(){

  const layer = layui.layer
  getUserinfo()
  //点击按钮实现退出功能
  $('#btnLogout').on('click', function(){
    
    //提示用户是否确认退出登录
    layer.confirm('请确认退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      //1.要清除本质存储中的token
      localStorage.removeItem('token')
      //2.重新跳转到登录页面
      location.href = './login1.html'
      //关闭confirm询问框
      layer.close(index);
    });
  })
})
//获取用户的基本信息
function getUserinfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    // headers是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res){
      if(res.status !== 0){
        return layui.layer.msg('获取用户信息失败')
      }
      console.log(res)
      renderAvatar(res)
    },
    
  })
}

function renderAvatar(user){
  const name = user.data.nickname || user.data.username
  
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
   if(user.data.user_pic !== null){
    $('.layui-nav-img').attr('src',user.data.user_pic).show()
    $('.text-avatar').hide()
   }else{
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
   }
}