import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, DatePicker, Row, Col, Upload} from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, beforeUpload, imgUploadChange, newImgUrl} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
                width="800px"
            >
                <div id="new-form-area"  className="am-margin-top">
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="兼职标题">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职岗位">
                                    {getFieldDecorator('position', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职时间">
                                    {getFieldDecorator('work_time', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="联系方式">
                                    {getFieldDecorator('contact', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="兼职地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职待遇">
                                    {getFieldDecorator('salary', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="截止日期">
                                {getFieldDecorator('deadline', {
                                    rules: [
                                        { type: 'object', required: true, message: '不能为空' },
                                    ],
                                    initialValue: moment("2017-09-01", "YYYY-MM-DD"),
                                    })(
                                        <DatePicker allowClear={false} 
                                            getCalendarContainer={() => document.getElementById('new-form-area')}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="是否发布">
                                {getFieldDecorator('type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["notification.part_time.type"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="详情和要求" >
                                    {getFieldDecorator('requirement', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, data, beforeUpload, imgUploadChange, newImgUrl} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
                width="800px"
            >
                <div id="edit-form-area" className="am-margin-top">
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="兼职标题">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.title,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职岗位">
                                    {getFieldDecorator('position', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.position,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职时间">
                                    {getFieldDecorator('work_time', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.work_time,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="联系方式">
                                    {getFieldDecorator('contact', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.contact,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="兼职地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.location,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="兼职待遇">
                                    {getFieldDecorator('salary', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.salary,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
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
                            </Col>
                            <Col span={6}>
                                <Form.Item label="是否发布">
                                {getFieldDecorator('type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.type,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["notification.part_time.type"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="详情和要求" >
                                    {getFieldDecorator('requirement', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.requirement,
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    
                    </Form>
                </div>
            </Modal>
    );
  }
);


class PartTime extends React.Component {
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
            joinList: [],
            joinTotal: 0,
        };
        this.joinId = 0;
        this.joinStart = 0;
        this.joinEnd = 50;
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
            url: "/api/v1/notification/part_time",
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

    newOpt(data){
        $.ajax({
            url: "/api/v1/notification/part_time",
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
                    this.newForm.resetFields();
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
            url: "/api/v1/notification/part_time",
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
                    this.editForm.resetFields();
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
            url: "/api/v1/notification/part_time",
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
 
    getJoinPartTimeList(){
        $.ajax({
            url: "/api/v1/notification/join_part_time",
            type: "GET",
            data: {
                part_time_id: this.joinId,
                start: this.joinStart,
                end: this.joinEnd,
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
                        joinList: data.data.list,
                        joinTotal: data.data.total,
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
                    this.getJoinPartTimeList();
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
                title: '申请学生',
                key: 'student',
                dataIndex: 'student',
                render: (text, record, index) => {
                    return <a onClick={()=>{
                        this.setState({
                            modalType: "joinPartTime",
                        });
                        this.joinStart = 0;
                        this.joinEnd = 50;
                        this.joinId = record.id;
                        this.getJoinPartTimeList();
                    }
                    }>查看</a>
                }
            },
            {
                title: '当前是否生效',
                key: 'type_name',
                dataIndex: 'type_name',
            }
            ]; 
        const innerColumns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
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
                                <h2>校园招聘 / 兼职列表</h2>
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
                                            newImgUrl: "",
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
                                            newImgUrl: this.state.editRecord.logo_url,
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
                                    <input type="text" className="am-form-field" placeholder="兼职标题名字" ref="name" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button" 
                                        onClick={()=>{
                                                let v = this.refs.name.value;
                                                let q = Object.assign({}, this.props.location.query);
                                                if(v == ""){
                                                    delete q.like;
                                                }else{
                                                    q = Object.assign(q, {like: "title^" + v});
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
                    title="新建兼职"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newOpt(values);
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
                    title="修改兼职"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.editOpt(values);
                        });
                    }}
                    {...this.state}
                />

                <Modal
                    visible={this.state.modalType == "joinPartTime"}
                    title="申请学生"
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    onOk={() =>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    maskClosable={false}
                    width="600px"
                >
                    <div className="am-g">
                        <div className="am-u-sm-12">
                            <div className="content-bg">
                                <Table 
                                    bordered
                                    filterMultiple={false}
                                    columns={innerColumns} 
                                    dataSource={this.state.joinList} 
                                    loading={this.state.tableLoading} 
                                    pagination={{
                                        total: this.state.joinTotal,
                                        pageSize: 50,
                                        onChange: (p) => {
                                            let start = (p - 1) * 50;
                                            let end = start + 50;
                                            this.getJoinPartTimeList(record.id, start, end);
                                        }
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
 
module.exports = PartTime