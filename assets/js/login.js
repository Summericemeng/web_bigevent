$(function(){

  //点击去注册的链接
  $('#link-reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

   //点击去登录的链接
  $('#link-login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  let form=layui.form

  let layer=layui.layer
  form.verify({
    //定义一个pwd校验规则
  pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
  //定义一个repwd校验规则
  repwd:function(value){
    let pwdvalue=$('.reg-box [name=password]').val()
    if(pwdvalue!==value) return '两次密码输入不一致'
  }
})
  
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
  //阻止默认提交行为
   e.preventDefault()
   //发起ajax的post 请求
   let data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
   $.post('/api/reguser',data,
   function(res){
    if(res.status!==0){
      return layer.msg(res.message);
    }
    layer.msg('请求发送成功')
    //模拟人的点击行为
    $('#link-login').click()
   })
})
//监听登录表单的提交事件
$('#form_login').on('submit',function(e){
  e.preventDefault()

  $.ajax({
    url:'/api/login',
    method:'post',
    //利用serialize()获取数据
    data:$(this).serialize(),
    success:function(res){
      if(res.status!==0){
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
      //console.log(res.token)
      //将token存储到localStorage中 /my请求需要用到访问权限
      localStorage.setItem('token',res.token)
      //跳转到后台主页
      location.href='/index.html'
    }
  })
})
})


