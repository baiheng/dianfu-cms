import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Tabs  } from 'antd'
import { user } from 'config'

import SubjectStudent from './SubjectStudent'


class SubjectTimetableDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detail: {},
        }
    }

    getList(){
        $.ajax({
            url: "/api/v1/curriculum/subject_timetable",
            type: "GET",
            data: {
                id: this.props.location.query.subject_timetable_id
            }, 
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        detail: data.data,
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
        let class_time_name = "";
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
            class_time_name += `${weekday_name} ${start_time} ~ ${end_time}; `
        });
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
                                <button className="am-btn am-btn-default">
                                    生成二维码
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
                            <Tabs.TabPane tab="签到" key="2">Content of Tab Pane 2</Tabs.TabPane>
                            <Tabs.TabPane tab="请假" key="3">Content of Tab Pane 3</Tabs.TabPane>
                            <Tabs.TabPane tab="缺课" key="4">Content of Tab Pane 3</Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>

            </div>
        )
    }
}
 
module.exports = SubjectTimetableDetail