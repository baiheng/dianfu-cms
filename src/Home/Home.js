import React from 'react'
import { Icon, Button } from 'antd'


class Home extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    componentWillMount(){
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
    }
    shouldComponentUpdate(){
        return true;
    }
    componentWillUpdate(nextProps, nextState){
    }
    componentDidUpdate(prevProps, prevState){
    }
    componentWillUnmount(){
    }
    render() {
        let height = "50px";
        return (
            <div>
                <div style={{
                    height: height,
                    backgroundColor: "#2e2c2c",
                    position: "fixed",
                    top: "0px",
                    width: "100%",
                    zIndex: "10",
                    padding: "0px 20px 0px 0px",
                }}>
                    <div style={{
                            display: "inline-block",
                            lineHeight: "45px",
                            fontSize: "24px",
                            fontWeight: "bold",
                            paddingLeft: "20px",
                            cursor: "pointer",
                            color: "#33a597",
                        }}>
                        点孵CMS
                    </div>
                </div>
                <div style={{
                    top: height, 
                    position: "absolute", 
                    right: "0px", 
                    left: "0px", 
                    bottom: "0px", 
                    overflow: "auto",
                    padding: "22px 0px",
                    backgroundColor: "#f0f3f7",
                }}>
                    <div style={{
                        position: "absolute",
                        width: "300px",
                        left: "50%",
                        marginLeft: "-150px",
                        top: "50px",
                    }}>
                        <form className="am-form" action="/api/system/login" method="post">
                            <div className="am-form-group">
                                <label>邮箱地址</label>
                                <input type="email" className=""  placeholder="邮箱地址" name="user_name" required/>
                            </div>
                            <div className="am-form-group">
                                <label>密码</label>
                                <input type="password" className="" placeholder="密码" name="password" required/>
                            </div>
                            <button type="submit" className="am-btn am-btn-block am-btn-success">登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Home