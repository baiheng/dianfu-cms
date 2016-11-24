import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, Tag } from 'antd'
import { user } from 'config'


class ClassRecord extends React.Component {
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
            addStudentList: [],
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
            url: "/api/v1/curriculum/class_record",
            type: "GET",
            data: Object.assign({
                start: 0,
                end: 50,
                type: 0,
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

    render(){
        const columns = [
            {
                title: '学号',
                key: "student_number",
                dataIndex: 'student_number',
            },
            {
                title: '学生',
                key: 'student_name',
                dataIndex: 'student_name',
            },
            {
                title: '上课周',
                key: 'week_name',
                dataIndex: 'week_name',
            },
            {
                title: '周几',
                key: 'weekday_name',
                dataIndex: 'weekday_name',
            },
            {
                title: '上课时间',
                key: 'start_end_time_name',
                dataIndex: 'start_end_time_name',
                render: (text, record, index) => {
                    return (
                        record.start_time_name + " ~ " + record.end_time_name
                    );
                },
            },
            {
                title: '签到时间',
                key: 'update_time',
                dataIndex: 'update_time',
            },
            {
                title: '签到情况',
                key: 'type_name',
                dataIndex: 'type_name',
            }
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-vertical">
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


            </div>
        )
    }
}
 
module.exports = ClassRecord