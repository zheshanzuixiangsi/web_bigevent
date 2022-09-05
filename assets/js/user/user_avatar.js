$(function(){
  // 1.1 获取裁剪区域的 DOM 元素
  const layer = layui.layer
   var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click',function(){
  $('#file').click()
})

  $('#file').on('change', function(e){

    const fileList = e.target.files
    
    
    if(fileList.length === 0){
      return layer.msg('请选择照片')
    }
    //拿到用户选择的文件

    const file = e.target.files[0]

    //将文件，转化为路径
    const imgURL = URL.createObjectURL(file)

    //重新格式化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options)
  })

  $('#btnUpload').on('click', function(){

    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')  //将Canvas画布上的内容，转化为base64格式的字符串

    // 2. 调用接口，把头像上传到服务器

    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res){
        if(res.status !== 0){
          return layer.msg('更换头像失败')
        }else{
          layer.msg('更换头像成功')
          window.parent.getUserinfo()
        }
      }
    })
  })
})

