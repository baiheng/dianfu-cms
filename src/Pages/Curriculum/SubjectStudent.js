import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, Tag } from 'antd'
import { user } from 'config'


class SubjectStudent extends React.Component {
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
            url: "/api/v1/curriculum/subject_student",
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
                        total: data.data.count,
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
            url: "/api/v1/curriculum/subject_student",
            type: "POST",
            data: Object.assign({
                academy_id: this.props.detail.academy_id
            }, data),
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
            url: "/api/v1/curriculum/subject_student",
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
        const columns = [
            {
                title: '学号',
                key: "student_number",
                dataIndex: 'student_number',
            },
            {
                title: '学院',
                key: 'academy_name',
                dataIndex: 'academy_name',
            },
            {
                title: '专业',
                key: 'major_name',
                dataIndex: 'major_name',
            },
            {
                title: '年级',
                key: 'grade_name',
                dataIndex: 'grade_name',
            },
            {
                title: '班级',
                key: 'class_name',
                dataIndex: 'class_name',
            },
            {
                title: '学生',
                key: 'student_name',
                dataIndex: 'student_name',
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
                                <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={this.deleteOpt.bind(this)}>
                                    <button className="am-btn am-btn-default am-margin-left-xs">
                                        <Icon type="delete" />
                                    </button>
                                </Popconfirm>
                            </div>

                            <div className="am-u-sm-3"> 
                                <div className="am-input-group am-input-group-default">
                                    <input type="text" className="am-form-field" placeholder="学生名字" ref="name" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button" 
                                        onClick={()=>{
                                                let v = this.refs.name.value;
                                                let q = Object.assign({}, this.props.detail.id);
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
                                            query: Object.assign(this.props.detail.id, {
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

                <Modal
                    visible={this.state.modalType == "add"}
                    title="添加学生"
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.newForm.resetFields();
                            this.newOpt(values);
                        });
                    }}
                    confirmLoading={this.state.confirmLoading}
                    maskClosable={false}
                >
                    <div className="am-g">
                        <div className="am-u-sm-12 am-margin-vertical">
                            <div className="am-input-group am-input-group-default">
                                <input type="text" className="am-form-field" placeholder="学号" ref="student_number" />
                                <span className="am-input-group-btn">
                                    <button className="am-btn am-btn-default" type="button" 
                                    onClick={()=>{
                                        }}>
                                        <span className="am-icon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="am-u-sm-12">
                            <div className="am-panel am-panel-default">
                                <div className="am-panel-hd">添加以下学生到该课堂</div>
                                <div className="am-panel-bd">
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                    <Tag closable >Tag 1</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}
 
module.exports = SubjectStudent