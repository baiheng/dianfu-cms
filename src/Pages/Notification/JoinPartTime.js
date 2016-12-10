import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm } from 'antd'
import { user } from 'config'


class JoinPartTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: [],
            tableLoading: false,
            total: 0,
            modalType: "close",
            confirmLoading: false,
            editRecord: {},
            selectedRowKeys: [],
            type: "-1",
        }
    }

    componentWillMount() {
        this.getList();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(nextProps, nextState){
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search != this.props.location.search){
            this.getList();
        }
    }

    componentWillUnmount(){
    }

    getList(){
        $.ajax({
            url: "/api/v1/notification/join_part_time",
            type: "GET",
            data: Object.assign({
                start: 0,
                end: 50,
            }, this.props.location.query), 
            dataType: "json",
            beforeSend: function(){
                this.setState({
                    tableLoading: true,
                })
            }.bind(this),
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        list: data.data.list,
                        total: data.data.total,
                        editRecord: [],
                        selectedRowKeys: [],
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    tableLoading: false,
                });
            }.bind(this),
        })
    }
 
    editJoinPartTimeList(id, type){
        $.ajax({
            url: "/api/v1/notification/join_part_time",
            type: "PUT",
            data: {
                id: id,
                type: type,
            },
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.getList();
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    render(){
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },
            {
                title: '兼职标题',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '兼职岗位',
                key: 'position',
                dataIndex: 'position',
            },
            {
                title: '兼职时间',
                key: 'work_time',
                dataIndex: 'work_time',
            },
            {
                title: '兼职待遇',
                key: 'salary',
                dataIndex: 'salary',
            },
            {
                title: '兼职地点',
                key: 'location',
                dataIndex: 'location',
            },
            {
                title: '详情和要求',
                key: 'requirement',
                dataIndex: 'requirement',
            },
            {
                title: '截止日期',
                key: 'deadline',
                dataIndex: 'deadline',
            },
            {
                title: '发布时间',
                key: 'create_time',
                dataIndex: 'create_time',
            },
            {
                title: '学号',
                key: 'student_number',
                dataIndex: 'student_number',
            },
            {
                title: '姓名',
                key: 'student_name',
                dataIndex: 'student_name',
            },
            {
                title: '操作',
                key: 'type',
                dataIndex: 'type',
                render: (text, record, index) => {
                    return (
                        <Radio.Group value={"" + record.type} onChange={(e)=>{
                            this.editJoinPartTimeList(record.id, e.target.value);
                        }}>
                        {
                            user.conf["notification.join_part_time.type"].map((item, i) => {
                                return <Radio.Button value={"" + item[0]} key={i}>{"" + item[1]}</Radio.Button>
                            })
                        }
                        </Radio.Group>
                    );
                },
            },
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>校园通知 / 兼职审核</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <Radio.Group value={this.state.type} onChange={(e)=>{
                                this.setState({type: e.target.value});
                                let q = Object.assign({}, this.props.location.query);
                                if(e.target.value == "-1"){
                                    delete q.type;
                                }else{
                                    q = Object.assign(q, {type: e.target.value});
                                }
                                hashHistory.push({
                                    pathname: this.props.location.pathname,
                                    query: q, 
                                });
                            }}>
                                <Radio.Button value="-1">全部</Radio.Button>
                            {
                                user.conf["notification.join_part_time.type"].map((item, i) => {
                                    return <Radio.Button value={"" + item[0]} key={i}>{"" + item[1]}</Radio.Button>
                                })
                            }
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
                                filterMultiple={false}
                                columns={columns} 
                                dataSource={this.state.list} 
                                loading={this.state.tableLoading} 
                                pagination={{
                                    total: this.state.total,
                                    pageSize: 50,
                                    onChange: (p) => {
                                        let start = (p - 1) * 50;
                                        let end = start + 50;
                                        hashHistory.push({
                                            pathname: this.props.location.pathname,
                                            query: Object.assign(this.props.location.query, {
                                                start: start,
                                                end: end,
                                            }), 
                                        });
                                    }
                                }}

                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
 
module.exports = JoinPartTime