import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, type, schoolList, title, confirmLoading} = props;
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
                            initialValue: "",
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
                    <Form.Item>
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-5">
                            <Form.Item>
                                {getFieldDecorator('type', {
                                    initialValue: "" + user.admin.type,
                                })(
                                    <Select disabled>
                                    {
                                        type.map((item, index) => {
                                            return (
                                                <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                            </div>
                            <div className="am-u-sm-2">
                            </div>
                            <div className="am-u-sm-5">
                            <Form.Item>
                                {getFieldDecorator('school_id', {
                                    initialValue: "" + user.admin.school_id,
                                })(
                                    <Select disabled>
                                    {
                                        schoolList.map((item, index) => {
                                            return (
                                                <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, type, title, schoolList, confirmLoading, data} = props;
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
                    <Form.Item>
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-5">
                            <Form.Item>
                                {getFieldDecorator('type', {
                                    initialValue: "" + data.type,
                                })(
                                    <Select disabled>
                                    {
                                        type.map((item, index) => {
                                            return (
                                                <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                            </div>
                            <div className="am-u-sm-2">
                            </div>
                            <div className="am-u-sm-5">
                            <Form.Item>
                                {getFieldDecorator('school_id', {
                                    initialValue: "" + data.school_id,
                                })(
                                    <Select disabled>
                                    {
                                        schoolList.map((item, index) => {
                                            return (
                                                <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>
                                            )
                                        })
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
    );
  }
);

class SchoolAccount extends React.Component {
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
            schoolList: [{id: user.admin.school_id, name: user.admin.school_name}],
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getList();
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
            url: "/api/v1/system/account",
            type: "GET",
            data: Object.assign({
                start: 0,
                end: 50,
                type: 1,
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

    newOpt(data){
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
                    this.getList();
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    confirmLoading: false,
                });
            }.bind(this),
        })
    }

    editOpt(data){
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
                    this.getList();
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
            complete: function(){
                this.setState({
                    confirmLoading: false,
                });
            }.bind(this),
        })
    }

    deleteOpt(){
        if(Object.keys(this.state.editRecord).length === 0){
            user.showMsg("请选择编辑项");
            return;
        }
        $.ajax({
            url: "/api/v1/system/account",
            type: "DELETE",
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
                    this.getList();
                }else{
                    user.showRequestError(data)
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
        const type = [[user.admin.type, user.admin.type_name]];
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
                title: '学校',
                key: 'school_name',
                dataIndex: 'school_name',
            },{
                title: '类型',
                key: 'type_name',
                dataIndex: 'type_name',
            }]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <button className="am-btn am-btn-default am-margin-left-xs"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "add",
                                        });
                                    }}
                                >
                                    <Icon type="plus" />
                                </button>
                                <button className="am-btn am-btn-default am-margin-left-xs"
                                    onClick={()=>{
                                        if(Object.keys(this.state.editRecord).length === 0){
                                            user.showMsg("请选择编辑项");
                                            return;
                                        }
                                        this.setState({
                                            modalType: "edit",
                                        });
                                    }}
                                >
                                    <Icon type="edit" />
                                </button>
                                <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={this.deleteOpt.bind(this)}>
                                    <button className="am-btn am-btn-default am-margin-left-xs">
                                        <Icon type="delete" />
                                    </button>
                                </Popconfirm>
                            </div>
                            <div className="am-u-sm-3"> 
                                <div className="am-input-group am-input-group-default">
                                    <input type="text" className="am-form-field" placeholder="名字" ref="name" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button" 
                                        onClick={()=>{
                                                let v = this.refs.name.value;
                                                let q = Object.assign({}, this.props.location.query);
                                                if(v == ""){
                                                    delete q.like;
                                                }else{
                                                    q = Object.assign(q, {like: "name^" + v});
                                                }
                                                hashHistory.push({
                                                    pathname: this.props.location.pathname,
                                                    query: q, 
                                                });
                                            }}>
                                            <span className="am-icon-search"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
                                rowSelection={{
                                    type: "radio",
                                    selectedRowKeys: this.state.selectedRowKeys,
                                    onChange: (selectedRowKeys, selectedRows) =>{
                                        this.setState({
                                            selectedRowKeys: selectedRowKeys,
                                            editRecord: Object.assign({}, selectedRows[0]),
                                        })
                                    }
                                }}
                                onRowClick={(record, index) => {
                                    this.setState({
                                        selectedRowKeys: [index],
                                        editRecord: Object.assign({}, record),
                                    })
                                }}
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
                    type={type}
                    schoolList={this.state.schoolList}
                    title="新建账号"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newForm.resetFields();
                            this.newOpt(values);
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
                    type={type}
                    schoolList={this.state.schoolList}
                    title="修改账号信息"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.editForm.resetFields();
                            this.editOpt(values);
                        });
                    }}
                />

            </div>
        )
    }
}

SchoolAccount.defaultProps = {
}

module.exports = SchoolAccount