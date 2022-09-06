// $.ajaxPrefilter(function (options){
//   options.url = 'http://big-event-api-t.itheima.net' + options.url

//   if(options.url.indexOf('/my/') !== -1){
//     options.headers = {
//       Authorization: localStorage.getItem('token') || ''
//     }
//   }
//   //全局同意挂载complete回调函数
//   options.complete  = function(res){
//     console.log(res)
//     if(res.responseJSON.message = '身份认证失败' && res.responseJSON.status === 1 ){
//       // 1.  强制清空 token
//       localStorage.removeItem('token')
//       // 2. 强制跳转到登录页面
//       location.href = '../login1.html'
//     }
//   }
// }) 

$.ajaxPrefilter(function(options){
  options.url = 'http://big-event-api-t.itheima.net' + options.url

  if(options.url.indexOf('/my/') !== -1){
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  options.complete = function(res){
    // console.log(res)
    if(res.responseJSON.message = "身份认证失败" && res.responseJSON.status === 1){
      localStorage.removeItem('token')
      location.href = '../login1.html'
    }
  }
})

// $.ajaxPrefilter(function(options){
//   options.url = 'http://big-event-api-t.itheima.net' + options.url

//   if(options.url.indexOf('/my/') !== -1){

//     options.headers = {
//       Authorization:localStorage.getItem('token')
//     }
//   }

//   options.complete = function(res){
//     if(res.responseJSON.message = '身份认证失败' && res.responseJSON.status === 1){
//       localStorage.removeItem('token')
//       location.href = '../login.html'
//     }
//   }
// })