import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, Upload, message, Card, Row, Col} from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, beforeUpload, 
            coursewareUrl, coursewareUploadChange, detail, class_time_name_list} = props;
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
                <div id="new-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="课件名字">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "",
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="上课周">
                            {getFieldDecorator('week', {
                                rules: [{ required: true, message: "不能为空" }],
                            })(
                                <Select placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    user.conf["curriculum.subject_timetable.start_week"].filter((item) => {
                                        return item[0] >= detail.start_week && item[0] <= detail.end_week;
                                    }).map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="上课时间">
                            {getFieldDecorator('class_time', {
                                rules: [{ required: true, message: "不能为空" }],
                            })(
                                <Select placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('new-form-area')}>
                                {
                                    detail.class_time_json && detail.class_time_json.map((item, index) => {
                                        return <Select.Option value={`${index}`} key={index}>{class_time_name_list[index]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </div>
                {
                    coursewareUrl == ""? 
                    <div>
                        <Upload
                            className="am-margin-right-xs"
                            name="file"
                            showUploadList={false}
                            action="/api/v1/curriculum/courseware_upload"
                            accept="*/*"
                            beforeUpload={(file) => {
                                return beforeUpload(file);
                            }}
                            onChange={(info) => {
                                coursewareUploadChange(info);
                            }}
                          >
                            <Button type="ghost" className="am-margin-left-xs">
                                上传PDF课件
                            </Button>
                        </Upload>
                    </div> :
                    <div>
                        <a href={coursewareUrl} target="_blank">PDF课件</a>
                        <Upload
                            className="am-margin-right-xs"
                            name="file"
                            showUploadList={false}
                            action="/api/v1/curriculum/courseware_upload"
                            accept="*/*"
                            beforeUpload={(file) => {
                                return beforeUpload(file);
                            }}
                            onChange={(info) => {
                                coursewareUploadChange(info);
                            }}
                          >
                            <Button type="ghost" className="am-margin-left-xs">
                                更换PDF课件
                            </Button>
                        </Upload>
                    </div> 
                }
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, beforeUpload, data,
            coursewareUrl, coursewareUploadChange, detail, class_time_name_list} = props;
        const { getFieldDecorator } = form;
        let class_time = 0;
        for(let i=0; detail.class_time_json && i<detail.class_time_json.length; i++){
            let item = detail.class_time_json[i];
            if(item.weekday == data.weekday && item.start_time == data.start_time && item.end_time == data.end_time){
                class_time = i;
                break;
            }
        }
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
            >
                <div id="edit-form-area" className="am-margin-top">
                    <Form vertical>
                        <Form.Item label="课件名字">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: data.name,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="上课周">
                            {getFieldDecorator('week', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "" + data.week,
                            })(
                                <Select placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    user.conf["curriculum.subject_timetable.start_week"].filter((item) => {
                                        return item[0] >= detail.start_week && item[0] <= detail.end_week;
                                    }).map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="上课时间">
                            {getFieldDecorator('class_time', {
                                rules: [{ required: true, message: "不能为空" }],
                                initialValue: "" + class_time,
                            })(
                                <Select placeholder="请选择"
                                    getPopupContainer={() => document.getElementById('edit-form-area')}>
                                {
                                    detail.class_time_json && detail.class_time_json.map((item, index) => {
                                        return <Select.Option value={`${index}`} key={index}>{class_time_name_list[index]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <a href={coursewareUrl} target="_blank">PDF课件</a>
                    <Upload
                        className="am-margin-right-xs"
                        name="file"
                        showUploadList={false}
                        action="/api/v1/curriculum/courseware_upload"
                        accept="*/*"
                        beforeUpload={(file) => {
                            return beforeUpload(file);
                        }}
                        onChange={(info) => {
                            coursewareUploadChange(info);
                        }}
                      >
                        <Button type="ghost" className="am-margin-left-xs">
                            更换PDF课件
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
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            message.error('上传课件需要小于 20MB!');
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
                title: '上课周',
                key: 'week_name',
                dataIndex: 'week_name',
            },
            {
                title: '上课时间',
                key: 'class_time_name',
                dataIndex: 'class_time_name',
                render: (text, record, index) => {
                    return `${record.weekday_name} ${record.start_time_name} ~ ${record.end_time_name} `
                },
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
                        <a href={record.courseware_url} target="_blank">下载</a>
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
                                            coursewareUrl: "",
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
                                                let v = "name^" + this.refs.name.value;
                                                this.setState({
                                                    search: Object.assign({},  this.state.search, {"like": v})
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
                    title="添加课件"
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
                            let class_time = this.props.detail.class_time_json[values.class_time];
                            values.weekday = class_time.weekday;
                            values.start_time = class_time.start_time;
                            values.end_time = class_time.end_time;
                            delete values.class_time;
                            this.newOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    coursewareUploadChange={this.coursewareUploadChange.bind(this)}
                    {...this.props}
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
                            let class_time = this.props.detail.class_time_json[values.class_time];
                            values.weekday = class_time.weekday;
                            values.start_time = class_time.start_time;
                            values.end_time = class_time.end_time;
                            delete values.class_time;
                            this.editOpt(values);
                        });
                    }}
                    beforeUpload={this.beforeUpload}
                    coursewareUploadChange={this.coursewareUploadChange.bind(this)}
                    {...this.props}
                    {...this.state}
                />

            </div>
        )
    }
}
 
module.exports = Courseware