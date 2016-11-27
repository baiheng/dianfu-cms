import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, DatePicker } from 'antd'
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
                <div id="new-form-area">
                    <Form vertical>
                        <Form.Item label="一学期多少周">
                            {getFieldDecorator('week_number', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input type="number" />
                            )}
                        </Form.Item>
                        <Form.Item label="学期第一天日期">
                        {getFieldDecorator('first_week', {
                            rules: [
                                { type: 'object', required: true, message: '不能为空' },
                            ],
                            initialValue: moment("2017-01-31", "YYYY-MM-DD"),
                            })(
                                <DatePicker allowClear={false}
                                    getCalendarContainer={() => document.getElementById('new-form-area')}/>
                            )}
                        </Form.Item>
                        <Form.Item label="学期名称">
                            {getFieldDecorator('semester', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input placeholder="2017年第二学期" />
                            )}
                        </Form.Item>
                        <Form.Item label="更新配置">
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["system.all_settings.type"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </div>
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
                <div id="edit-form-area">
                    <Form vertical>
                        <Form.Item label="一学期多少周">
                            {getFieldDecorator('week_number', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "" + data.week_number,
                            })(
                                <Input type="number" />
                            )}
                        </Form.Item>
                        <Form.Item label="学期第一天日期">
                        {getFieldDecorator('first_week', {
                            rules: [
                                { type: 'object', required: true, message: '不能为空' },
                            ],
                            initialValue: moment(data.first_week, "YYYY-MM-DD"),
                            })(
                                <DatePicker allowClear={false}
                                    getCalendarContainer={() => document.getElementById('edit-form-area')}/>
                            )}
                        </Form.Item>
                        <Form.Item label="学期名称">
                            {getFieldDecorator('semester', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: data.semester,
                            })(
                                <Input placeholder="2017年第二学期" />
                            )}
                        </Form.Item>
                        <Form.Item label="更新配置">
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                                initialValue: "" + data.type,
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    user.conf["system.all_settings.type"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
    );
  }
);

class AllSettings extends React.Component {
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
            url: "/api/v1/system/all_settings",
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

    newOpt(data){
        $.ajax({
            url: "/api/v1/system/all_settings",
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
            url: "/api/v1/system/all_settings",
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

    render(){
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },{
                title: '一学期多少周',
                key: 'week_number',
                dataIndex: 'week_number',
            },{
                title: '学期第一天日期',
                key: 'first_week',
                dataIndex: 'first_week',
            },{
                title: '学期名称',
                key: 'semester',
                dataIndex: 'semester',
            },{
                title: '类型',
                key: 'type_name',
                dataIndex: 'type_name',
            }]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>系统管理 / 学期设置</h2>
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
                    title="新建配置"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newForm.resetFields();
                            let transform = {
                                ...values,
                                first_week: values.first_week.format('YYYY-MM-DD'),
                            };
                            this.newOpt(transform);
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
                    title="修改配置"
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
                                first_week: values.first_week.format('YYYY-MM-DD'),
                            };
                            this.editOpt(transform);
                        });
                    }}
                />

            </div>
        )
    }
}

AllSettings.defaultProps = {
}

module.exports = AllSettings