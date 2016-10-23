import React from 'react'
import { Link } from 'react-router'

import { URL } from 'config'
import LhbItem from './LhbItem'


class LhbDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            lhb_list: [],
            date_list: [],
            group_list: [],
        }
    }

    getUserGroup(){
        $.ajax({
            url: "/lhb/group/list",
            type: "get",
            dataType: "json",
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.setState({
                        group_list: data.group_list,
                    });
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    newUserGroup({name="", remark=""}){
        $.ajax({
            url: "/lhb/group/new",
            type: "post",
            dataType: "json",
            data: {
                name: name,
                remark: remark,
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.getUserGroup();
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    modifyUserGroup({group_id=-1, name="", remark=""}){
        $.ajax({
            url: "/lhb/group/modify",
            type: "post",
            dataType: "json",
            data: {
                group_id: group_id,
                name: name,
                remark: remark,
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.getUserGroup();
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    delUserGroup(group_id){
        $.ajax({
            url: "/lhb/group/del",
            type: "get",
            dataType: "json",
            data: {
                group_id: group_id,
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.getUserGroup();
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    newUserGroupMember({group_id=-1, division_id=-1, remark=""}){
        $.ajax({
            url: "/lhb/group_member/new",
            type: "post",
            dataType: "json",
            data: {
                group_id: group_id,
                division_id: division_id,
                remark: remark,
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.updateLhbDetail(division_id);
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    delUserGroupMember({group_id=-1, division_id=-1}){
        $.ajax({
            url: "/lhb/group_member/del",
            type: "get",
            dataType: "json",
            data: {
                group_id: group_id,
                division_id: division_id,
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.updateLhbDetail(division_id);
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    updateLhbDetail(division_id){
        let code_set = new Set();
        this.state.lhb_list.map((item) => {
            if(!code_set.has(item.date)){
                Object.keys(item).map((key) => {
                    if(key.includes("division_id") && item[key] == division_id){
                        this.getLhbDetail(item.date, code, true);
                    }
                })
            }
            code_set.add(item.date);
        })
    }

    getLhbDetail(date, code, update=false){
        $.ajax({
            url: "/lhb/lhb/detail",
            type: "get",
            dataType: "json",
            data: {
                date: date,
                code: code
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    var lhb_list = this.state.lhb_list;
                    if(update){
                        lhb_list.filter((item) => {
                            for(let i of data.lhb_detail){
                                if(i.date == item.date){
                                    return false;
                                }
                            }
                            return true;
                        })
                    }
                    data.lhb_detail.map((item) => {
                        lhb_list.push(item);
                    });
                    lhb_list.sort((a, b)=>{return a.date < b.date});
                    this.setState({
                        lhb_list: lhb_list,
                    });
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    getLhbDateList(code){
        $.ajax({
            url: "/lhb/lhb/date_list",
            type: "get",
            dataType: "json",
            data: {
                code: code
            },
            success: function(data, textStatus){
                if(data.ret == 0){
                    data.lhb_date_list.sort((a, b) => {
                        return a.date < b.date? 1 : -1;
                    });
                    this.setState({
                        date_list: data.lhb_date_list,
                    });
                    let index = 0;
                    for(let i=0; i<data.lhb_date_list.length; i++){
                        if(data.lhb_date_list[i].date == this.props.location.query.date){
                            index = i;
                            break;
                        }
                    };
                    for(let i=index; i<data.lhb_date_list.length && i<index+4; i++){
                        this.getLhbDetail(data.lhb_date_list[i].date, this.props.location.query.code);
                    }
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });
    }

    handleClickDate(date, code){
        for(let i of this.state.lhb_list){
            if(date == i.date){
                return
            }
        }
        this.getLhbDetail(date, code);
    }

    componentWillMount() {
        this.getLhbDateList(this.props.location.query.code);
        this.getUserGroup();
    }

    componentDidMount() {
        // console.log("did mount");
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(){
        // console.log("parent should update");
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        // console.log("parent will update");
    }

    componentDidUpdate(prevProps, prevState){
    }

    componentWillUnmount(){
        // console.log("parent did unmount");
    }

    render(){
        let group_dict = {};
        this.state.group_list.map((item) => {
            group_dict[item.id] = item;
        })
        let lhb_list = this.state.lhb_list.map((item, index) => {
            return (
                <div className="col-sm-12 col-md-6" key={index}>
                    <LhbItem 
                        ticket={item} 
                        group_list={this.state.group_list} 
                        group_dict={group_dict} 
                        newUserGroup={this.newUserGroup.bind(this)}
                        newUserGroupMember={this.newUserGroupMember.bind(this)}
                        delUserGroupMember={this.delUserGroupMember.bind(this)}
                    />
                </div>
            );
        });
        let date_list = this.state.date_list.map((item, index) => {
            return (
                <span className="am-margin-right" key={index}>
                    <a 
                    onClick={this.handleClickDate.bind(this, item.date, this.props.location.query.code)} 
                    className="text-info text-info-dker">
                        {item.date}
                    </a>
                </span>
            );
        });
        return (
            <div className="container-fluid">
                <div className="row am-margin-bottom">
                    <div className="col-sm-12">
                        {date_list}
                    </div>
                </div>
                <div className="row">{lhb_list}</div>
            </div>
        )
    }
}

module.exports = LhbDetail