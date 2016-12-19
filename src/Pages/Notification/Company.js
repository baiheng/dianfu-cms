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
                            action="/api/v1/system/img_upload"
                            accept="image/*"
                            beforeUpload={(file) => {
                                return beforeUpload(file);
                            }}
                            onChange={(info) => {
                                logoUploadChange(info);
                            }}
                          >
                            <Button type="ghost" className="am-margin-left-xs" style={{width: "100px", height: "100px"}}>
                                上传企业logo
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
                        action="/api/v1/system/img_upload"
                        accept="image/*"
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


class Company extends React.Component {
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
            newImgUrl: "",
            imgUrl: [],
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
            url: "/api/v1/notification/company",
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
            url: "/api/v1/notification/company",
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
                    this.newForm.resetFields();
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
            url: "/api/v1/notification/company",
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
                    this.editForm.resetFields();
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
            url: "/api/v1/notification/company",
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

    logoUploadChange(info) {
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

    imgUploadChange(info) {
        if (info.file.status === 'done') {
            if(info.file.response.ret == 0){
                this.setState({
                    imgUrl: this.state.imgUrl.concat(info.file.response.data)
                })
            }else{
                this.setState({
                    imgUrl: []
                })
                user.showRequestError(info.file.response)
            }
        }
        if (info.file.status === 'error') {
            this.setState({
                imgUrl: []
            })
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    delImgUrl(index){
        this.setState({
            imgUrl: this.state.imgUrl.filter((item, i) => {return i != index})
        })
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
                title: '公司名字',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '公司描述',
                key: 'description',
                dataIndex: 'description',
            },
            {
                title: '公司标签',
                key: 'label_name',
                dataIndex: 'label_name',
            },
            {
                title: '公司地点',
                key: 'location',
                dataIndex: 'location',
            },
            {
                title: '公司类型',
                key: 'company_type',
                dataIndex: 'company_type',
            },
            {
                title: '公司业务',
                key: 'business',
                dataIndex: 'business',
            },
            {
                title: '公司规模',
                key: 'size',
                dataIndex: 'size',
            },
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>校园招聘 / 企业列表</h2>
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
                                            imgUrl: [],
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
                                            imgUrl: this.state.editRecord.img_json == ""? []: this.state.editRecord.img_json,
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
                                    <input type="text" className="am-form-field" placeholder="企业名字" ref="name" />
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
                    title="新建企业"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            if(this.state.newImgUrl == ""){
                                return user.showMsg("请上传公司logo");
                            }
                            if(this.state.imgUrl.length == 0){
                                return user.showMsg("请上传公司图片");
                            }
                            values.label_json = values.label_name.trim().split("|").map((item)=>{return item.trim()})
                            values.logo_url = this.state.newImgUrl;
                            values.img_json = this.state.imgUrl;
                            delete values.label_name;
                            this.newOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    logoUploadChange={this.logoUploadChange.bind(this)}
                    imgUploadChange={this.imgUploadChange.bind(this)}
                    delImgUrl={this.delImgUrl.bind(this)}
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
                    title="修改企业"
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
                            if(this.state.imgUrl.length == 0){
                                return user.showMsg("请上传公司图片");
                            }
                            values.label_json = values.label_name.trim().split("|").map((item)=>{return item.trim()})
                            values.logo_url = this.state.newImgUrl;
                            values.img_json = this.state.imgUrl;
                            delete values.label_name;
                            this.editOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    logoUploadChange={this.logoUploadChange.bind(this)}
                    imgUploadChange={this.imgUploadChange.bind(this)}
                    delImgUrl={this.delImgUrl.bind(this)}
                    {...this.state}
                />

            </div>
        )
    }
}
 
module.exports = Company