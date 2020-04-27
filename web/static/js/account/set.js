;
var account_set_ops = {
    init:function(){
        this.eventBind()
    },
    eventBind:function(){
        $('.wrap_account_set .save').click(function () {

            var btn_target = $(this)
            if (btn_target.hasClass("disabled")) {
                alert("重置正在进行中，请稍后再试")
                return;
            }

            var nickname = $(".wrap_account_set input[name=nickname]").val();

            var mobile = $(".wrap_account_set input[name=mobile]").val();
            var mobiles = /^1[34578]\d{9}$/;

            var email = $(".wrap_account_set input[name=email]").val();
            var emails = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            var login_name = $(".wrap_account_set input[name=login_name]").val();
            var login_pwd = $(".wrap_account_set input[name=login_pwd]").val();

            if (!nickname || nickname.length<1){
                alert('请正确输入姓名')
                return false
            }
            if (!mobile || mobile.length<1){
                alert('请正确输入手机号')
                return false
            }
            if (!email || email.length<1){
                alert('请正确输入邮箱')
                return false
            }
            if (!login_name || login_name.length<1){
                alert('请正确输入登录名')
                return false
            }
            if (!login_pwd || login_pwd<6){
                alert('请正确输入密码')
                return false
            }
            btn_target.addClass("disabled")


             $.ajax({
                url:common_ops.buildUrl("/account/set"),
                type:"POST",
                data:{
                 'nickname':nickname,
                 'mobile':mobile,
                 'email':email,
                 'login_name':login_name,
                 'login_pwd':login_pwd
            },
                dataType:'json',
                success:function(resp){
                    console.log(resp)
                    alert(resp.msg)
                    btn_target.removeClass("disabled");
                },
                error:function(error){
                    console.log(error)
                }
            })


        })
    }
}

$(document).ready(function(){
    account_set_ops.init()
})