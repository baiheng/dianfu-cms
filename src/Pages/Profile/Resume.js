import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm } from 'antd'
import { user } from 'config'


class Resume extends React.Component {
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
            type: "-1",
            imgJson: [],
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
            url: "/api/v1/profile/resume",
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
 
    editResumeList(id, type){
        $.ajax({
            url: "/api/v1/profile/resume",
            type: "PUT",
            data: {
                id: id,
                type: type,
            },
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.getList();
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
                title: '标题',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '类型',
                key: 'flag_name',
                dataIndex: 'flag_name',
            },
            {
                title: '时间',
                key: 'create_time',
                dataIndex: 'create_time',
            },
            {
                title: '上传图片',
                key: 'img_json',
                dataIndex: 'img_json',
                render: (text, record, index) => {
                    return <a onClick={()=>{
                        this.setState({
                            modalType: "img",
                            imgJson: record.img_json
                        });
                    }
                    }>查看</a>
                },
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
                            this.editResumeList(record.id, e.target.value);
                        }}>
                        {
                            user.conf["profile.resume.type"].map((item, i) => {
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
                                <h2>档案管理 / 经历审核</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <Radio.Group value={this.state.type} onChange={(e)=>{
                                this.setState({type: e.target.value});
                                let q = Object.assign({}, this.props.location.query);
                                if(e.target.value == "-1"){
                                    delete q.type;
                                }else{
                                    q = Object.assign(q, {type: e.target.value});
                                }
                                hashHistory.push({
                                    pathname: this.props.location.pathname,
                                    query: q, 
                                });
                            }}>
                                <Radio.Button value="-1">全部</Radio.Button>
                            {
                                user.conf["profile.resume.type"].map((item, i) => {
                                    return <Radio.Button value={"" + item[0]} key={i}>{"" + item[1]}</Radio.Button>
                                })
                            }
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
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

                <Modal
                    visible={this.state.modalType == "img"}
                    title="学生申请图片"
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
                    width="550px"
                >
                    <div className="am-g">
                        <div className="am-u-sm-12">
                            <div className="content-bg">
                            {
                                this.state.imgJson.map((item, index) =>{
                                    return (
                                        <div key={index} 
                                            style={{
                                                display: "inline-block", 
                                                padding: "2px",
                                                border: "1px dashed #d9d9d9",
                                                marginLeft: "10px",
                                                marginBottom: "10px",
                                            }}>
                                            <img src={item} width="200" height="100" />
                                            <br/>
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
 
module.exports = Resume