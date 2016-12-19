import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Tabs  } from 'antd'
import { user } from 'config'

import SubjectStudent from './SubjectStudent'
import ClassRecord from './ClassRecord'
import ClassRecordLeave from './ClassRecordLeave'
import ClassRecordNotAttend from './ClassRecordNotAttend'
import QRCodeReact from './QRCodeReact'



class SubjectTimetableDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detail: {},
            modalType: "close",
        };
    }

    getList(){
        $.ajax({
            url: "/api/v1/curriculum/subject_timetable",
            type: "GET",
            data: {
                id: this.props.location.query.subject_timetable_id,
            }, 
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        detail: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    componentWillMount() {
        if(this.props.location.state == null){
            this.getList()
        }else{
            this.setState({
                detail: this.props.location.state
            })
        }
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
    }

    componentWillUnmount(){
    }

    render(){
        let detail = this.state.detail;

        let class_week_name = (detail.start_week_name + " ~ " + detail.end_week_name);
        let class_time_name_list = [];
        detail.class_time_json && detail.class_time_json.map((item) => {
            let weekday_name = "";
            for (let i of user.conf["curriculum.subject_timetable.weekday"]){
                if(i[0] == item.weekday){
                    weekday_name = i[1];
                    break;
                }
            }
            let start_time = "";
            for (let i of user.conf["curriculum.subject_timetable.start_time"]){
                if(i[0] == parseInt(item["start_time"])){
                    start_time = i[1];
                    break;
                }
            }
            let end_time = "";
            for (let i of user.conf["curriculum.subject_timetable.end_time"]){
                if(i[0] == parseInt(item["end_time"])){
                    end_time = i[1];
                    break;
                }
            }
            class_time_name_list.push(`${weekday_name} ${start_time} ~ ${end_time} `);
        });
        let class_time_name = class_time_name_list.join("; ");
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>课表 / {detail.course_name} / 详情</h2>
                            </div>
                        </div>
                    </div>

                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">

                            <div className="am-u-sm-6"> 
                                <button className="am-btn am-btn-default" onClick={()=>{
                                    this.setState({
                                        modalType: "qrcode"
                                    });
                                }}>
                                    签到二维码
                                </button>
                                <button className="am-btn am-btn-default am-margin-left-xs">
                                    导出上课学生
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-bottom">
                        <table className="am-table am-table-bordered">
                            <tbody>
                                <tr>
                                    <td width="100px" className="am-primary">课程</td>
                                    <td width="300px">{detail.course_name}</td>
                                    <td width="100px" className="am-primary">教师</td>
                                    <td width="300px">{detail.teacher_name}</td>
                                    <td width="100px" className="am-primary">学院</td>
                                    <td width="300px">{detail.academy_name}</td>
                                    <td width="100px" className="am-primary">专业</td>
                                    <td width="300px">{detail.major_name}</td>
                                </tr>
                                <tr>
                                    <td width="100px" className="am-primary">年级</td>
                                    <td width="300px">{detail.grade_name}</td>
                                    <td width="100px" className="am-primary">班级</td>
                                    <td width="300px">{detail.class_name}</td>
                                    <td width="100px" className="am-primary">上课地点</td>
                                    <td width="300px">{detail.localtion}</td>
                                    <td width="100px" className="am-primary">学期</td>
                                    <td width="300px">{detail.semester_name}</td>
                                </tr>
                                <tr>
                                    <td width="100px" className="am-primary">开课周</td>
                                    <td width="300px">{class_week_name}</td>
                                    <td width="100px" className="am-primary">上课时间</td>
                                    <td width="300px">{class_time_name}</td>
                                    <td width="100px" className="am-primary">备注</td>
                                    <td width="300px" colSpan="3">{detail.remark}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="am-u-sm-12">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="学生" key="1">
                                <SubjectStudent 
                                    detail={this.state.detail}
                                    id={this.props.location.query.subject_timetable_id}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="签到" key="2">
                                <ClassRecord
                                    detail={this.state.detail}
                                    id={this.props.location.query.subject_timetable_id}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="请假" key="3">
                                <ClassRecordLeave
                                    detail={this.state.detail}
                                    id={this.props.location.query.subject_timetable_id}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="缺课" key="4">
                                <ClassRecordNotAttend
                                    detail={this.state.detail}
                                    id={this.props.location.query.subject_timetable_id}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>

                <Modal
                    visible={this.state.modalType == "qrcode"}
                    title="签到二维码"
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
                    width="500px"
                >
                    <Tabs defaultActiveKey="0">
                    {
                        detail.class_time_json && detail.class_time_json.map((item, index) => {
                            let md = window.btoa(item.weekday + "|" + item.start_time + "|" + item.end_time + "|" + detail.id);
                            return (
                                <Tabs.TabPane tab={class_time_name_list[index]} key={"" + index}>
                                <div style={{
                                    marginTop: "15px",
                                    height: "300px",
                                    paddingLeft: "100px"
                                }}>
                                    <QRCodeReact 
                                    value={`http://120.76.21.117/api/v1/curriculum/attend?\
                                        weekday=${item.weekday}&start_time=${item.start_time}\
                                        &end_time=${item.end_time}&subject_timetable_id=${detail.id}\
                                        &type=0&md=${md}`} />
                                </div>
                            </Tabs.TabPane>
                            );
                        })
                    }
                    </Tabs>
                </Modal>

            </div>
        )
    }
}
 
module.exports = SubjectTimetableDetail