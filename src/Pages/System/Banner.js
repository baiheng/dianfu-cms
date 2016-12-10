import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, Upload, message,Row, Col } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, beforeUpload, imgUrl, imgUploadChange} = props;
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
                    imgUrl == ""? 
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
                            <Button type="ghost" className="am-margin-left-xs" style={{width: "200px", height: "100px"}}>
                                上传横幅
                            </Button>
                        </Upload>
                    </div> :
                    <div>
                        <img src={imgUrl} height="100" width="200" />
                    </div> 
                }
                <div id="new-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="横幅名字">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="发布页面">
                        {getFieldDecorator('flag', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["system.banner.flag"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="链接文章类型">
                                {getFieldDecorator('link_type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["system.banner.link_type"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="链接文章ID">
                                    {getFieldDecorator('link_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input placeholder="请把对应文章ID填写上"/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="是否发布">
                        {getFieldDecorator('type', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["system.banner.type"].map((item, index) => {
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
        const { visible, onCancel, onOk, form, title, confirmLoading, data, beforeUpload, imgUrl, imgUploadChange} = props;
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
                    <img src={imgUrl} height="100" width="200" />
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
                        <Button type="ghost" className="am-margin-left-xs" style={{width: "200px", height: "100px"}}>
                            更换图片
                        </Button>
                    </Upload>
                </div>
                <div id="edit-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="横幅名字">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: data.title,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="发布页面">
                        {getFieldDecorator('flag', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                                initialValue: "" + data.flag,
                            })(
                                <Select  placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    user.conf["system.banner.flag"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="链接文章类型">
                                {getFieldDecorator('link_type', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.link_type,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["system.banner.link_type"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="链接文章ID">
                                    {getFieldDecorator('link_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.link_id,
                                    })(
                                        <Input placeholder="请把对应文章ID填写上"/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
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
                                    user.conf["system.banner.type"].map((item, index) => {
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


class Banner extends React.Component {
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
            imgUrl: "",
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
            url: "/api/v1/system/banner",
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
            url: "/api/v1/system/banner",
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
            url: "/api/v1/system/banner",
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
            url: "/api/v1/system/banner",
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

    imgUploadChange(info) {
        if (info.file.status === 'done') {
            if(info.file.response.ret == 0){
                this.setState({
                    imgUrl: info.file.response.data
                })
            }else{
                this.setState({
                    imgUrl: ""
                })
                user.showRequestError(info.file.response)
            }
        }
        if (info.file.status === 'error') {
            this.setState({
                imgUrl: ""
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
                title: '图片',
                key: 'img_url',
                width: "220px",
                render: (text, record) => (
                    <img src={record.img_url} height="100" width="200" />
                ),
            },
            {
                title: '标题',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '发布时间',
                key: 'create_time',
                dataIndex: 'create_time',
            },
            {
                title: '链接文章类型',
                key: 'link_type_name',
                dataIndex: 'link_type_name',
            },
            {
                title: '链接文章ID',
                key: 'link_id',
                dataIndex: 'link_id',
            },
            {
                title: '发布栏',
                key: 'flag_name',
                dataIndex: 'flag_name',
            },
            {
                title: '当前是否生效',
                key: 'type_name',
                dataIndex: 'type_name',
            },
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>系统管理 / 横幅列表</h2>
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
                                            imgUrl: "",
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
                                            imgUrl: this.state.editRecord.img_url,
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
                                    <input type="text" className="am-form-field" placeholder="标题名字" ref="name" />
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
                    title="新建横幅"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            values.img_url = this.state.imgUrl;
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
                    title="修改横幅"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            values.img_url = this.state.imgUrl;
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
 
module.exports = Banner