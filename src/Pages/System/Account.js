import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, flag, title, confirmLoading} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
            >
                <Form vertical>
                    <Form.Item label="登录邮箱">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: "",
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="登录密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: "不能为空" }],
                        })(
                            <Input type="password"  />
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: "",
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('phone', {
                            initialValue: "",
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('flag', {
                            initialValue: "0",
                        })(
                            <Select style={{ width: 120 }}>
                            {
                                flag.map((item, index) => {
                                    return (
                                        <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                    )
                                })
                            }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, flag, title, confirmLoading, data} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
            >
                <Form vertical>
                    <Form.Item label="登录邮箱">
                        {getFieldDecorator('email', {
                            initialValue: data.email,
                        })(
                            <Input disabled />
                        )}
                    </Form.Item>
                    <Form.Item label="登录密码">
                        {getFieldDecorator('password', {
                            initialValue: data.password,
                        })(
                            <Input type="password" placeholder="重置新密码才填" />
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: data.name,
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('phone', {
                            initialValue: data.phone,
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('flag', {
                            initialValue: "" + data.flag,
                        })(
                            <Select style={{ width: 120 }}>
                            {
                                flag.map((item, index) => {
                                    return (
                                        <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                    )
                                })
                            }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
    );
  }
);

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
            selectedRowKeys: [0],
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

    newAccount(data){
        $.ajax({
            url: "/api/v1/system/account",
            type: "POST",
            data: data,
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

    editAccount(data){
        $.ajax({
            url: "/api/v1/system/account",
            type: "PUT",
            data: Object.assign(this.state.editRecord, data),
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

    render(){
        const flag = [[0, "超级管理员"], [1, "普通账号"]];
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },{
                title: '邮箱',
                key: 'email',
                dataIndex: 'email',
            },{
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
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
            }]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-2"> 
                                <h1>系统 / 账户</h1>
                            </div>
                            <div className="am-u-sm-3"> 
                                <div className="am-input-group am-input-group-default">
                                    <input type="text" className="am-form-field" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button">
                                            <span className="am-icon-search"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="am-fr"> 
                                <button className="am-btn am-btn-default am-margin-left-xs"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "add",
                                        });
                                    }}
                                >
                                    <Icon type="delete" />
                                </button>
                                <button className="am-btn am-btn-default am-margin-left-xs"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "edit",
                                        });
                                    }}
                                >
                                    <Icon type="edit" />
                                </button>
                                <button className="am-btn am-btn-default am-margin-left-xs"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "add",
                                        });
                                    }}
                                >
                                    <Icon type="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-vertical">
                        
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
                                rowSelection={{
                                    type: "radio",
                                    selectedRowKeys: this.state.selectedRowKeys,
                                    onChange: (selectedRowKeys, selectedRows) =>{
                                        console.log(selectedRows);
                                        this.setState({
                                            selectedRowKeys: selectedRowKeys,
                                            editRecord: Object.assign({}, selectedRows[0]),
                                        })
                                    }
                                }}
                                onRowClick={(record, index) => {
                                    console.log(record);
                                    this.setState({
                                        selectedRowKeys: [index],
                                        editRecord: Object.assign({}, record),
                                    })
                                }}
                                filterMultiple={false}
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

                <NewForm
                    ref={(form) => {
                        this.newForm = form;
                    }}
                    visible={this.state.modalType == "add"}
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    flag={flag}
                    title="新建账号"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newForm.resetFields();
                            this.newAccount(values);
                        });
                    }}
                />

                <EditForm
                    ref={(form) => {
                        this.editForm = form;
                    }}
                    visible={this.state.modalType == "edit"}
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    flag={flag}
                    title="修改账号信息"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.editForm.resetFields();
                            this.editAccount(values);
                        });
                    }}
                />

            </div>
        )
    }
}

Account.defaultProps = {
}

module.exports = Account