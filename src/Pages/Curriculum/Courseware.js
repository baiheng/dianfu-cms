import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, Upload, message, Card, Row, Col} from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, sender, beforeUpload, 
            logoUploadChange, newImgUrl, imgUrl, imgUploadChange, delImgUrl} = props;
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
                {
                    newImgUrl == ""? 
                    <div>
                        <Upload
                            className="am-margin-right-xs"
                            name="file"
                            showUploadList={false}
                            action="/api/v1/curriculum/img_upload"
                            accept="*/*"
                            beforeUpload={(file) => {
                                return beforeUpload(file);
                            }}
                            onChange={(info) => {
                                logoUploadChange(info);
                            }}
                          >
                            <Button type="ghost" className="am-margin-left-xs" style={{width: "100px", height: "100px"}}>
                                上传PDF课件
                            </Button>
                        </Upload>
                    </div> :
                    <div>
                        <img src={newImgUrl} height="100" width="100" />
                    </div> 
                }
                <div id="new-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="公司名字">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input  type="textarea" autosize={{ minRows: 3, maxRows: 8 }} />
                            )}
                        </Form.Item>
                        <Form.Item label="标签">
                        {getFieldDecorator('label_name', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Input placeholder="|分隔多个标签" />
                            )}
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="地点">
                                {getFieldDecorator('location', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="公司类型">
                                {getFieldDecorator('company_type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="业务">
                                {getFieldDecorator('business', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="规模">
                                {getFieldDecorator('size', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div>
                    {
                        imgUrl.map((item, index) =>{
                            return (
                                <div key={index} 
                                    style={{
                                        display: "inline-block", 
                                        width: "200xp", 
                                        height: "135px", 
                                        border: "1px dashed #d9d9d9",
                                        marginLeft: "10px",
                                        marginBottom: "10px",
                                    }}>
                                    <img src={item} width="200" height="100" />
                                    <br/>
                                    <Button type="ghost" onClick={() => {
                                        delImgUrl(index);
                                    }}>
                                        <Icon type="delete" />
                                    </Button>
                                </div>
                            );
                        })
                    }
                    <Upload
                        name="file"
                        showUploadList={false}
                        action="/api/v1/curriculum/courseware_upload"
                        accept="image/*"
                        beforeUpload={(file) => {
                            return beforeUpload(file);
                        }}
                        onChange={(info) => {
                            imgUploadChange(info);
                        }}
                      >
                        <Button type="ghost" className="am-margin-left-xs">
                            添加公司图片
                        </Button>
                    </Upload>
                </div>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, data, 
            beforeUpload, logoUploadChange, newImgUrl, imgUrl, imgUploadChange, delImgUrl} = props;
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
                <div>
                    <img src={newImgUrl} height="100" width="100" />
                    <Upload
                        name="file"
                        showUploadList={false}
                        action="/api/v1/system/courseware_upload"
                        accept="*/*"
                        beforeUpload={(file) => {
                            return beforeUpload(file);
                        }}
                        onChange={(info) => {
                            logoUploadChange(info);
                        }}
                      >
                        <Button type="ghost" className="am-margin-left-xs" style={{width: "100px", height: "100px"}}>
                            更换logo
                        </Button>
                    </Upload>
                </div>
                <div id="edit-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="公司名字">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "" + data.name,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "" + data.description,
                            })(
                                <Input  type="textarea" autosize={{ minRows: 3, maxRows: 8 }} />
                            )}
                        </Form.Item>
                        <Form.Item label="标签">
                        {getFieldDecorator('label_name', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: data.label_name,
                            })(
                                <Input placeholder="|分隔多个标签" />
                            )}
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="地点">
                                {getFieldDecorator('location', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: data.location,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="公司类型">
                                {getFieldDecorator('company_type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: data.company_type,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="业务">
                                {getFieldDecorator('business', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: data.business,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="规模">
                                {getFieldDecorator('size', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: data.size,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div>
                    {
                        imgUrl.map((item, index) =>{
                            return (
                                <div key={index} 
                                    style={{
                                        display: "inline-block", 
                                        width: "200xp", 
                                        height: "135px", 
                                        border: "1px dashed #d9d9d9",
                                        marginLeft: "10px",
                                        marginBottom: "10px",
                                    }}>
                                    <img src={item} width="200" height="100" />
                                    <br/>
                                    <Button type="ghost" onClick={() => {
                                        delImgUrl(index);
                                    }}>
                                        <Icon type="delete" />
                                    </Button>
                                </div>
                            );
                        })
                    }
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
                            添加公司图片
                        </Button>
                    </Upload>
                </div>
            </Modal>
    );
  }
);

class Courseware extends React.Component {
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
            coursewareUrl: "",
            search: {
                subject_timetable_id: this.props.id
            },
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
        if(prevState.search != this.state.search){
            this.getList()
        }
    }

    componentWillUnmount(){
    }

    getList(){
        $.ajax({
            url: "/api/v1/curriculum/courseware",
            type: "GET",
            data: Object.assign({
                start: 0,
                end: 50
            }, this.state.search), 
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
            url: "/api/v1/curriculum/courseware",
            type: "POST",
            data: JSON.stringify(
                Object.assign({
                    subject_timetable_id: this.state.search.subject_timetable_id,
                }, data)
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

    editOpt(data){
        $.ajax({
            url: "/api/v1/curriculum/courseware",
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
            url: "/api/v1/curriculum/courseware",
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

    beforeUpload(file) {
        var extName = ["PDF"];
        let start = file.type.indexOf("/");
        if (!extName.includes(file.type.substring(start+1, file.type.length).toUpperCase())) {
            message.error('上传课件需要PDF格式');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('上传课件需要小于 4MB!');
            return false;
        }
        return true;
    }

    coursewareUploadChange(info) {
        if (info.file.status === 'done') {
            if(info.file.response.ret == 0){
                this.setState({
                    coursewareUrl: info.file.response.data
                })
            }else{
                this.setState({
                    coursewareUrl: ""
                })
                user.showRequestError(info.file.response)
            }
        }
        if (info.file.status === 'error') {
            this.setState({
                coursewareUrl: ""
            })
            message.error(`${info.file.name} file upload failed.`);
        }
    }


    render(){
        const columns = [
            {
                title: '课件名字',
                key: "name",
                dataIndex: 'name',
            },
            {
                title: '上传时间',
                key: 'create_time',
                dataIndex: 'create_time',
            },
            {
                title: '课件',
                key: 'courseware_url',
                dataIndex: 'courseware_url',
                render: (text, record, index) => {
                    return (
                        <a src={record.courseware_url}>下载</a>
                    );
                },
            }
            ]; 
        return (
            <div>
                <div className="am-g">
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
                                            coursewareUrl: this.state.editRecord.courseware_url,
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
                                    <input type="text" className="am-form-field" placeholder="课件名字" ref="name" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button" 
                                        onClick={()=>{
                                                let v = this.refs.name.value;
                                                this.setState({
                                                    search: Object.assign({},  this.state.search, {name: v})
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
                                        this.setState({
                                            search: Object.assign(
                                                {}, 
                                                this.state.search,
                                                {
                                                    start: start,
                                                    end: end,
                                                })
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
                    title="新建课件"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            if(this.state.coursewareUrl == ""){
                                return user.showMsg("请上传PDF课件");
                            }
                            values.courseware_url = this.state.coursewareUrl;
                            this.newOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    coursewareUploadChange={this.coursewareUploadChange.bind(this)}
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
                    title="修改课件"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            if(this.state.coursewareUrl == ""){
                                return user.showMsg("请上传PDF课件");
                            }
                            values.courseware_url = this.state.coursewareUrl;
                            this.editOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    coursewareUploadChange={this.coursewareUploadChange.bind(this)}
                    {...this.state}
                />


            </div>
        )
    }
}
 
module.exports = Courseware