$(function(){

  let form = layui.form
  let layer = layui.layer
  
  //获取文章分类的列表
  initArtCateList()
  function initArtCateList(){
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function(res){
        // console.log(res)
        const htmlStr = template('tpl-table',res)
        $('tbody').html(htmlStr)
      }
    })
  }

  //为添加类别按钮绑定点击事件
  let indexAdd = null

  $('#btnAddCate').on('click',function(){
    indexAdd  = layer.open({
      type:1,
      area:['500px','250px'],
      title: '添加文章分类'
      ,content: $('#dialog-add').html()
    });    
  })


  //通过代理的形式，为form-add表单绑定submit事件

  $('body').on('submit','#form-add',function(e){
  
    e.preventDefault()
    $.ajax({
      method: 'post',
      url:'/my/article/addcates',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){
          return layer.msg('新增分类失败')
        }
        initArtCateList()
        layer.msg('新增分类成功')
        layer.close(indexAdd)
        
      }
    })


    
  })


  // 通过代理的形式， 为btn-edit按钮绑定点击事件

  let indexEdit = null
  $('tbody').on('click','#btn-edit', function(){
    
    alert('1')
    //弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px','250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })


    let id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'get',
      url: '/my/article/cates/' + id,
      success:function(res){
        form.val('form-edit',res.data)
      }
    })
  })

  //通过代理的形式。为修改分类的表单绑定submit事件

  $('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'post',
      url:'/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res){
        console.log(res)
        if(res.status !== 0){
          return layer.msg('更新分类数据失败')
        }
        layer.msg('更新数据成功')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  //通过代理的形式，为删除按钮绑定事件

  $('tbody').on('click','.btn-delete', function(){
    let id = $(this).attr('data-id')
    //提示用户是否要删除
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      console.log(id)
      //do something
      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function(res){
          console.log(res)
          if(res.status !== 0){
            return layer.msg('删除分类失败')
          }
          layer.msg('删除分类成功')
          layer.close(index);
          initArtCateList()
        }
      })
      
    });
  })

})