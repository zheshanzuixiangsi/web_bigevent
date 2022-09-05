$(function(){
  const form = layui.form
  const layer = layui.layer

  form.verify(function(value){
    if(value.length > 6){
      return '昵称长度必须在1 ~ 6 个字符之间！'
    }
  })

  //初始化用户信息

  function initUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res){
        if(res.status !== 0){
          return layer.msg('获取用户信息失败')
        }else{

          console.log(res)

          // 调用form.val()快速为表单赋值
          form.val('formUserInfo', res.data)
        }
      }
    })
  }

  initUserInfo()


  //重置表单数据
  $('#btnReset').on('click', function(e){
    //阻止表单重置默认行为
    e.preventDefault()

    initUserInfo()


  })

  //监听表单的提交事件

  $('.layui-form').on('submit', function(e){
    //阻止表单的默认提交行为
    e.preventDefault()

    // 发起ajax的数据请求
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){

          return layer.msg('更新用户信息失败')
        }else{

          layer.msg('更新用户信息成功')
          window.parent.getUserinfo()
        }

      }
    })
  })
})