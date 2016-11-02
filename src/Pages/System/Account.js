import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select } from 'antd'
import { user } from 'config'


const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, flag, title, data, opt} = props;
        const { getFieldDecorator } = form;
        let i = opt == "new"? <Input >:<Input disabled />;
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form vertical>
                    <Form.Item label="登录邮箱">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: opt == "new"? "": data.email,
                        })(
                            {i}
                        )}
                    </Form.Item>
                    <Form.Item label="登录密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: opt == "new", message: "不能为空" }],
                        })(
                            <Input type="password" placeholder="重置密码" />
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: "不能为空" }],
                            initialValue: opt == "new"? "": data.name,
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('phone', {
                            initialValue: opt == "new"? "": data.phone,
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('flag', {
                            initialValue: opt == "new"? "0": "" + data.flag,
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

                <CollectionCreateForm
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
                    opt="new"
                    data={this.state.addRecord}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            console.log('Received values of form: ', values);
                            this.newForm.resetFields();
                            this.setState({ 
                                modalType: "close" 
                            });
                        });
                    }}
                />

                <CollectionCreateForm
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
                    opt="edit"
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            console.log('Received values of form: ', values);
                            this.editForm.resetFields();
                            this.setState({ 
                                modalType: "close" 
                            });
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