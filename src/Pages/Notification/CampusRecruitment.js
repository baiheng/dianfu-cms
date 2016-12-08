import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, DatePicker } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, company} = props;
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
                    <div id="new-form-area">
                        <Form.Item label="企业">
                        {getFieldDecorator('company_id', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    company.map((item, index) => {
                                        return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="招聘内容">
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input  type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </Form.Item>
                        <Form.Item label="截止日期">
                        {getFieldDecorator('deadline', {
                            rules: [
                                { type: 'object', required: true, message: '不能为空' },
                            ],
                            initialValue: moment("2016-10-31", "YYYY-MM-DD"),
                            })(
                                <DatePicker allowClear={false}
                                    getCalendarContainer={() => document.getElementById('new-form-area')}/>
                            )}
                        </Form.Item>
                        <Form.Item label="是否热门">
                        {getFieldDecorator('flag', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: "0"
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["notification.campus_recruitment.flag"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="是否发布">
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["notification.campus_recruitment.type"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, data, company} = props;
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
                    <div id="edit-form-area">
                        <Form.Item label="企业">
                        {getFieldDecorator('company_id', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: "" + data.company_id
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    company.map((item, index) => {
                                        return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="招聘内容">
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: data.content,
                            })(
                                <Input  type="textarea" autosize={{ minRows: 2, maxRows: 6 }}/>
                            )}
                        </Form.Item>
                        <Form.Item label="截止日期">
                        {getFieldDecorator('deadline', {
                            rules: [
                                { type: 'object', required: true, message: '不能为空' },
                            ],
                            initialValue: moment(data.deadline, "YYYY-MM-DD"),
                            })(
                                <DatePicker allowClear={false}
                                    getCalendarContainer={() => document.getElementById('edit-form-area')}/>
                            )}
                        </Form.Item>
                        <Form.Item label="是否热门">
                        {getFieldDecorator('flag', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: "" + data.flag
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    user.conf["notification.campus_recruitment.flag"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="是否发布">
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: "" + data.type
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    user.conf["notification.campus_recruitment.type"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
    );
  }
);


class CampusRecruitment extends React.Component {
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
            company: [],
        }
    }

    componentWillMount() {
        this.getList();
        this.getCompanyList();
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
            url: "/api/v1/notification/campus_recruitment",
            type: "GET",
            data: Object.assign({
                start: 0,
                end: 50
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

    getCompanyList(){
        $.ajax({
            url: "/api/v1/notification/company",
            type: "GET",
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        company: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    newOpt(data){
        $.ajax({
            url: "/api/v1/notification/campus_recruitment",
            type: "POST",
            data: JSON.stringify(data),
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
            url: "/api/v1/notification/campus_recruitment",
            type: "PUT",
            data: JSON.stringify(
                Object.assign(this.state.editRecord, data)
                ),
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
            url: "/api/v1/notification/campus_recruitment",
            type: "DELETE",
            data: JSON.stringify(
                this.state.editRecord
                ),
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
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },
            {
                title: '企业',
                key: 'company_name',
                dataIndex: 'company_name',
            },
            {
                title: '招聘内容',
                key: 'content',
                dataIndex: 'content',
            },
            {
                title: '截止时间',
                key: 'deadline',
                dataIndex: 'deadline',
            },
            {
                title: '发布时间',
                key: 'create_time',
                dataIndex: 'create_time',
            },
            {
                title: '是否热门',
                key: 'flag_name',
                dataIndex: 'flag_name',
            },
            {
                title: '当前是否生效',
                key: 'type_name',
                dataIndex: 'type_name',
            }
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>校园招聘 / 校招列表</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <button className="am-btn am-btn-default"
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
                    title="新建校招"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newForm.resetFields();
                            let transform = {
                                ...values,
                                deadline: values.deadline.format('YYYY-MM-DD'),
                            };
                            this.newOpt(transform);
                        });
                    }}
                    {...this.state}
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
                    title="修改校招"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.editForm.resetFields();
                            let transform = {
                                ...values,
                                deadline: values.deadline.format('YYYY-MM-DD'),
                            };
                            this.editOpt(transform);
                        });
                    }}
                    {...this.state}
                />

            </div>
        )
    }
}
 
module.exports = CampusRecruitment