import React from 'react'
import { Link } from 'react-router'

import { DateField, DatePicker } from 'react-date-picker'
import 'react-date-picker/index.css'

import { URL } from 'config'


class LhbList extends React.Component {
    constructor(props, context) {
        super(props, context);
        moment.locale("zh_CN");
        if(this.props.location.query.date){
            var date = moment(this.props.location.query.date, "YYYYMMDD");
        }else{
            var date = moment();
        }
        this.state = {
            date: date,
            hsLhbList: [],
            ssLhbList: [],
        }
    }
    handleChangeDate(date){
        this.getLhbList(date.format("YYYYMMDD"));
    }

    getLhbList(date){
        $.ajax({
            url: "/lhb/lhb/list",
            type: "get",
            data: {
                date: date,
            },
            dataType: "json",
            success: function(data, textStatus){
                var hs = [];
                var ss = [];
                if(data.ret == 0){
                    for(var i in data.lhb_list){
                        if(data.lhb_list[i].code[0] == "6"){
                            hs.push(data.lhb_list[i]);
                        }else{
                            ss.push(data.lhb_list[i]);
                        }
                    };
                    this.setState({
                        hsLhbList: hs,
                        ssLhbList: ss,
                        date: moment(data.date, "YYYYMMDD"),
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

    loadLhbData(date){
        $.ajax({
            url: "/lhb/lhb/data",
            type: "get",
            data: {
                date: date,
            },
            dataType: "json",
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.getLhbList(this.state.date.format("YYYY-MM-DD"));
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });        
    }

    delLhbData(date){
        $.ajax({
            url: "/lhb/lhb/data_del",
            type: "get",
            data: {
                date: date,
            },
            dataType: "json",
            success: function(data, textStatus){
                if(data.ret == 0){
                    this.getLhbList(this.state.date.format("YYYY-MM-DD"));
                }else{
                    console.log(data.msg);
                }
            }.bind(this),
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("服务器出错");
            }
        });        
    }    

    componentWillMount() {
        this.getLhbList();
    }

    componentDidMount() {
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
        function genTicketList(item, index){
            return (
                <div className="col-md-2" key={index}>
                    <Link to={{ 
                        pathname: '/pages/lhb_detail', 
                        query: { 
                            code: item.code,
                            date: this.state.date.format("YYYY-MM-DD")
                        } 
                    }} 
                    className="text-info text-info-dker" target="_blank">
                    {item.ticket_name} <span className="text-danger-lter">[{item.ticket_change_rate}%]</span>
                    </Link>
                </div>
            );
        };
        let hsData = this.state.hsLhbList.map(genTicketList.bind(this));
        let ssData = this.state.ssLhbList.map(genTicketList.bind(this));
        return (
            <div className="am-g">
                <div className="am-u-sm-12 am-margin-bottom">
                    <DateField
                        dateFormat="YYYY-MM-DD"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        collapseOnDateClick={true}
                        value={this.state.date.format("YYYY-MM-DD")}
                        showClock={false}
                        onChange={(date)=>{this.setState({date: moment(date, "YYYY-MM-DD")})}}
                        onCollapse={()=>{$(".react-date-field__input").blur()}}
                    >
                        <DatePicker
                        navigation={true}
                        locale="zh_CN"
                        forceValidDate={true}
                        highlightWeekends={true}
                        highlightToday={true}
                        weekNumbers={false}
                        weekStartDay={0}
                        footer={false}
                        />
                    </DateField>
                    <button type="button" className="am-btn am-btn-default am-btn-sm am-margin-left"
                    onClick={()=>{
                        this.delLhbData(this.state.date.format("YYYY-MM-DD"));
                    }}>删除</button>
                    <button type="button" className="am-btn am-btn-default am-btn-sm am-margin-left"
                    onClick={()=>{
                        this.loadLhbData(this.state.date.format("YYYY-MM-DD"));
                    }}>加载</button>
                    <button type="button" className="am-btn am-btn-default am-btn-sm am-margin-left"
                    onClick={()=>{
                        this.getLhbList(this.state.date.format("YYYY-MM-DD"))
                    }}>搜索</button>
                </div>
                <div className="am-u-sm-12">
                    <div className="am-panel am-panel-default">
                        <div className="am-panel-hd">沪市</div>
                        <div className="am-panel-bd">
                            <div className="container-fluid">
                                <div className="row">
                                {hsData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="am-u-sm-12">
                    <div className="am-panel am-panel-default">
                        <div className="am-panel-hd">深市</div>
                        <div className="am-panel-bd">
                            <div className="container-fluid">
                                <div className="row">
                                {ssData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = LhbList