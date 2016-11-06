import { hashHistory } from 'react-router'
// 用户属性

class User{
    constructor(){
        this.id = -1;
        this.name = "";
        this.email = "";
        this.menus = {};
        this.admin = {};
        this.conf = {};
        this.timeout = "";
    }
    
    getUserInfo(){
        if(this.id != -1){
            return;
        }else{
            $.ajax({
                url: "/api/v1/system/admin",
                type: "GET",
                dataType: "json",
                async: false,
                success: function(data){
                    this.conf = data.data.conf;
                    this.admin = data.data.admin;
                }.bind(this)
            })
        }
    }

    toLogin(){
        hashHistory.push("/login");
    }

    showRequestError(data){
        if(data.ret == 1){
            this.showMsg("服务器出了点故障");
        }else if(data.ret == 2){
            hashHistory.push("/login");
        }else{
            this.showMsg(data.msg);
        }
    }

    showMsg(msg){
        $(".warn_modal").text(msg);
        $(".warn_modal").show();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function(){
            $(".warn_modal").fadeOut();
        }, 3000);
    }
}

export var user = new User();