import { hashHistory } from 'react-router'
// 用户属性
class User{
    constructor(){
        this.id = -1;
        this.name = "";
        this.email = "";
        this.menus = {};
        this.notification_num = 0;
        this.timeout = "";
        this.token = 0;
    }
    
    userInfo(){
        if(this.id == -1){
            return false;
        }else{
            return true;
        }
    }

    toLogin(){
        hashHistory.push("/login");
    }

    showRequestError(data){
        if(data.ret == -1){
            hashHistory.push("/login");
        }else if(data.ret == -2){
            this.showMsg("没有访问权限");
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