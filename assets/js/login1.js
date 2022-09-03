$(function(){
  $('#link_reg').on('click', function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui中获取form对象

  let form = layui.form
  let layer = layui.layer

  //通过form.verify()函数自定义校验规则

  form.verify({
    pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function (value){
      //通过新参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可

      let pwd = $('.reg-box [name=password]').val()
      if(pwd !== value){
        return '两次密码不一致！'
      }
    }
  })
  

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e){
    //阻止默认的提交行为
    e.preventDefault()
    
    //发送Ajax的post请求
    $.post('/api/reguser',{username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}, function(res) {
      console.log(res)
      if(res.status !== 0){
       return layer.msg("注册失败")
      }else{
        layer.msg('注册成功')
        $('#form_reg')[0].reset()
        $('#link_login').click()
        

      }
    })
  })


  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){

    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
      method: 'post',
      url:'/api/login',
      data:data,
      success: function(res){
        console.log(res)
        if(res.status !== 0){
        return  layer.msg('登录失败')
        }else{
          layer.msg('登录成功')
          localStorage.setItem('token',res.token)
          location.href = '/index1.html'
        }
      }

    })
  })
})