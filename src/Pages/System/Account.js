import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select } from 'antd'
import { user } from 'config'


class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountList: [],
            tableLoading: false,
            total: 0,
            modalType: "close",
            confirmLoading: false,
            editRecord: {},
            addRecord: {},
        }
    }

    componentWillMount() {
        this.getAccountList();
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
        if(prevProps.location.query.current != this.props.location.query.current){
            this.getAccountList();
        }
    }

    componentWillUnmount(){
    }

    getAccountList(){
        let current = this.props.location.query.current;
        var start = 0;
        var end = 50;
        if(current != null){
            start = (parseInt(current) - 1) * 50;
            end = start + 50;
        }
        $.ajax({
            url: "/api/v1/system/account",
            type: "GET",
            data: {
                start: start,
                end: end,
            },
            dataType: "json",
            beforeSend: function(){
                this.setState({
                    tableLoading: true,
                })
            }.bind(this),
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        accountList: data.data.list,
                        total: data.data.count,
                    });
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    tableLoading: false,
                });
            }.bind(this),
        })
    }

    newAccount(){
        $.ajax({
            url: "/api/v1/system/account",
            type: "POST",
            data: this.state.addRecord,
            dataType: "json",
            beforeSend: function(){
                this.setState({
                    confirmLoading: true,
                })
            }.bind(this),
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        modalType: "close",
                    });
                    this.getAccountList();
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    confirmLoading: false,
                });
            }.bind(this),
        })
    }

    editAccount(){
        $.ajax({
            url: "/api/v1/system/account",
            type: "PUT",
            data: this.state.editRecord,
            dataType: "json",
            beforeSend: function(){
                this.setState({
                    confirmLoading: true,
                })
            }.bind(this),
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        modalType: "close",
                    });
                    this.getAccountList();
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    confirmLoading: false,
                });
            }.bind(this),
        })
    }

    handleRecordChangeRecord(state, name, value){
        let a = {};
        a[name] = value;
        let newRecord = Object.assign(this.state[state], a);
        console.log(newRecord, value);
        if(state == "editRecord"){
            this.setState({
                editRecord: newRecord
            })   
        }else{
            this.setState({
                addRecord: newRecord
            })   
        }     
    }

    render(){
        const flag = [[0, "超级管理员"], [1, "普通账号"]];
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },{
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
            },{
                title: '邮箱',
                key: 'email',
                dataIndex: 'email',
            },{
                title: '电话',
                key: 'phone',
                dataIndex: 'phone',
            },{
                title: '权限',
                key: 'flag',
                dataIndex: 'flag',
                render: (text, record, index) => {
                    let a = flag.filter((item) => {
                        if(item[0] == text){
                            return true;
                        }
                    })
                    return a[0][1];
                },
            },{
                title: '操作',
                key: 'id_',
                dataIndex: 'id',
                width: "50px",
                render:  (text, record, index) => {
                    return (<button type="button" className="am-btn am-btn-default am-btn-xs" 
                                onClick={() => {
                                    this.setState({
                                        editRecord: Object.assign({}, record),
                                        modalType: "edit",
                                    })
                                }}
                            >
                                <Icon type="ellipsis" />
                            </button>)
                },
            }
        ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12">
                        <div className="am-margin-vertical">
                            <h1> 
                                系统 / 账户 
                                <button className="am-fr am-btn am-btn-default am-btn-xs"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "add",
                                            addRecord: {
                                                email: "",
                                                name: "",
                                                password: "",
                                                flag: 0,
                                            },
                                        });
                                    }}
                                >
                                    <Icon type="plus" />
                                </button>
                            </h1>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
                                columns={columns} 
                                dataSource={this.state.accountList} 
                                loading={this.state.tableLoading} 
                                pagination={{
                                    total: this.state.total,
                                    pageSize: 50,
                                    onChange: (p) => {
                                        hashHistory.push({
                                            search: "?current=" + p, 
                                            pathname: this.props.location.pathname,
                                        }
                                        );
                                    }
                                }}

                            />
                        </div>
                    </div>
                </div>

                <Modal title="编辑账户"
                    visible={this.state.modalType == "edit"}
                    onOk={this.editAccount.bind(this)}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    maskClosable={false}
                >
                    <Form vertical onChange={(e) => {
                        let name = e.target.name;
                        let value = e.target.value;
                        let a = {};
                        a[name] = value;
                        let newRecord = Object.assign(this.state.editRecord, a);
                        this.setState({
                            editRecord: newRecord
                        })
                    }}>
                        <Form.Item label="登录邮箱"  required>
                            <Input defaultValue="" value={this.state.editRecord.email} name="email" disabled />
                        </Form.Item>
                        <Form.Item label="登录密码" required>
                            <Input defaultValue="" value={this.state.editRecord.password} 
                            placeholder="重置新密码"
                            name="password" type="password" />
                        </Form.Item>
                        <Form.Item label="真实姓名"  required>
                            <Input defaultValue="" value={this.state.editRecord.name} name="name" />
                        </Form.Item>
                        <Form.Item label="手机号码" >
                            <Input defaultValue="" value={this.state.editRecord.phone} name="phone" />
                        </Form.Item>
                        <Select value={"" + this.state.editRecord.flag} style={{ width: 120 }} onChange={(value)=>{
                            this.handleRecordChangeRecord("editRecord", "flag", value)
                        }} required>
                        {
                            flag.map((item, index) => {
                                return (
                                    <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                )
                            })
                        }
                        </Select>
                    </Form>
                </Modal>

                <Modal title="添加账户"
                    visible={this.state.modalType == "add"}
                    onOk={this.newAccount.bind(this)}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    maskClosable={false}
                >
                    <Form vertical onChange={(e) => {
                        let name = e.target.name;
                        let value = e.target.value;
                        let a = {};
                        a[name] = value;
                        let newRecord = Object.assign(this.state.addRecord, a);
                        this.setState({
                            addRecord: newRecord
                        })
                    }}>
                        <Form.Item label="登录邮箱" required>
                            <Input defaultValue="" value={this.state.addRecord.email} name="email" required/>
                        </Form.Item>
                        <Form.Item label="登录密码" required>
                            <Input defaultValue="" value={this.state.addRecord.password} name="password" type="password" />
                        </Form.Item>
                        <Form.Item label="真实姓名" required>
                            <Input defaultValue="" value={this.state.addRecord.name} name="name" />
                        </Form.Item>
                        <Form.Item label="手机号码" >
                            <Input defaultValue="" value={this.state.addRecord.phone} name="phone" />
                        </Form.Item>
                        <Select value={"" + this.state.addRecord.flag} style={{ width: 120 }} onChange={(value)=>{
                            this.handleRecordChangeRecord("addRecord", "flag", value)
                        }} required>
                        {
                            flag.map((item, index) => {
                                return (
                                    <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                )
                            })
                        }
                        </Select>
                    </Form>
                </Modal>

            </div>
        )
    }
}

Account.defaultProps = {
}

module.exports = Account