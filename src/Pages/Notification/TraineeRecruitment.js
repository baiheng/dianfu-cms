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
                
                {
                    newImgUrl == ""? 
                    <div>
                        <Upload
                            className="am-margin-right-xs"
                            name="file"
                            showUploadList={false}
                            action="/api/v1/system/img_upload"
                            accept="image/*"
                            beforeUpload={(file) => {
                                return beforeUpload(file);
                            }}
                            onChange={(info) => {
                                imgUploadChange(info);
                            }}
                          >
                            <Button type="ghost">
                                <Icon type="plus" />
                            </Button>
                        </Upload>
                        <small>上传企业logo</small>
                    </div> :
                    <div>
                        <img src={newImgUrl} height="100" width="100" />
                    </div> 
                }
                <div id="new-form-area"  className="am-margin-top">
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="企业名字">
                                    {getFieldDecorator('company_name', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习标题">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习岗位">
                                    {getFieldDecorator('position', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="岗位类型">
                                    {getFieldDecorator('position_type', {
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
                                <Form.Item label="实习地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习待遇">
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
                                            user.conf["notification.trainee_recruitment.type"].map((item, index) => {
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
                                <Form.Item label="标签">
                                {getFieldDecorator('label_name', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "",
                                    })(
                                        <Input placeholder="空格分隔多个标签" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="岗位描述" >
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="岗位需求" >
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
                <div>
                    <img src={newImgUrl} height="100" width="100" />
                    <Upload
                        name="file"
                        showUploadList={false}
                        action="/api/v1/system/img_upload"
                        accept="image/*"
                        beforeUpload={(file) => {
                            return beforeUpload(file);
                        }}
                        onChange={(info) => {
                            imgUploadChange(info);
                        }}
                      >
                        <Button type="ghost" className="am-margin-left-xs">
                            更换logo
                        </Button>
                    </Upload>
                </div>
                <div id="edit-form-area" className="am-margin-top">
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="企业名字">
                                    {getFieldDecorator('company_name', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.company_name,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习标题">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.title,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习岗位">
                                    {getFieldDecorator('position', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.position,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="岗位类型">
                                    {getFieldDecorator('position_type', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.position_type,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="实习地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.location,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="实习待遇">
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
                                            user.conf["notification.trainee_recruitment.type"].map((item, index) => {
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
                                <Form.Item label="标签">
                                {getFieldDecorator('label_name', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: data.label_name,
                                    })(
                                        <Input placeholder="空格分隔多个标签" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="岗位描述" >
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.description,
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="岗位需求" >
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


class TraineeRecruitment extends React.Component {
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
            newImgUrl: [],
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
            url: "/api/v1/notification/trainee_recruitment",
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
            url: "/api/v1/notification/trainee_recruitment",
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
            url: "/api/v1/notification/trainee_recruitment",
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
            url: "/api/v1/notification/trainee_recruitment",
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

    beforeUpload(file) {
        var extName = ["GIF", "BMP", "JPG", "JPEG", "ICON", "PNG"];
        let start = file.type.indexOf("/");
        if (!extName.includes(file.type.substring(start+1, file.type.length).toUpperCase())) {
            message.error('上传图片需要gif, bmp, jpg, jpeg, icon, png其中一种格式');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传图片需要小于 2MB!');
            return false;
        }
        return true;
    }

    imgUploadChange(info) {
        if (info.file.status === 'done') {
            if(info.file.response.ret == 0){
                this.setState({
                    newImgUrl: info.file.response.data
                })
            }else{
                this.setState({
                    newImgUrl: ""
                })
                user.showRequestError(info.file.response)
            }
        }
        if (info.file.status === 'error') {
            this.setState({
                newImgUrl: ""
            })
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    render(){
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },
            {
                title: '图标',
                key: 'logo_url',
                width: "120px",
                render: (text, record) => (
                    <img src={record.logo_url} height="100" width="100" />
                ),
            },
            {
                title: '企业',
                key: 'company_name',
                dataIndex: 'company_name',
            },
            {
                title: '标题',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '描述',
                key: 'description',
                dataIndex: 'description',
            },
            {
                title: '待遇',
                key: 'salary',
                dataIndex: 'salary',
            },
            {
                title: '标签',
                key: 'label_json',
                dataIndex: 'label_json',
            },
            {
                title: '发布时间',
                key: 'create_time',
                dataIndex: 'create_time',
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
                                <h2>校园招聘 / 实习列表</h2>
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
                                    <input type="text" className="am-form-field" placeholder="实习标题名字" ref="name" />
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
                    title="新建实习"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            if(this.state.newImgUrl == ""){
                                return user.showMsg("请上传公司logo");
                            }
                            values.label_json = values.label_name.trim().split("|").map((item)=>{return item.trim()});
                            values.logo_url = this.state.newImgUrl;
                            delete values.label_name;
                            this.newOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    imgUploadChange={this.imgUploadChange.bind(this)}
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
                    title="修改实习"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            if(this.state.newImgUrl == ""){
                                return user.showMsg("请上传公司logo");
                            }
                            values.label_json = values.label_name.trim().split("|").map((item)=>{return item.trim()});
                            values.logo_url = this.state.newImgUrl;
                            delete values.label_name;
                            this.editOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    imgUploadChange={this.imgUploadChange.bind(this)}
                    {...this.state}
                />

            </div>
        )
    }
}
 
module.exports = TraineeRecruitment