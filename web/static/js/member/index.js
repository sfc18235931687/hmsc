;
var member_index_ops = {
    init:function () {
        this.eventBind()
    },
    eventBind:function () {
        var that = this
        $('.wrap_search .search').click(function () {
            $('.wrap_search').submit()
        })
        $('.remove').click(function () {

            id = $(this).attr('data')
            that.myAjax(id,'remove')
        })
        $('.recover').click(function () {
             id = $(this).attr('data')
            that.myAjax(id,'recover')
            });

    },
    myAjax:function(id,acts){
        $.ajax({
            url: common_ops.buildUrl("/member/removeOrRecover"),
            type: 'POST',
            data: {'id': id, 'acts': acts},
            dataType: 'json',
            success: function (res) {


                if (res.code == 200) {

                        window.location.href = common_ops.buildUrl("/member/index");

                }
                alert(res.msg);
            }
        })
    }
}

$(document).ready(function(){
    member_index_ops.init()
})