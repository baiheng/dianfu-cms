import React from 'react'
import { hashHistory, Link } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, DatePicker, Row, Col, Switch  } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, 
            course, tearch, academy, major, getMajorList, timeList, addTimeList, rmTimeList, semester} = props;
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
                <div id="new-form-area">
                    <Form vertical>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="课程">
                                    {getFieldDecorator('course_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            course.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="教师">
                                {getFieldDecorator('teacher_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select placeholder="请选择" 
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            tearch.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学院">
                                {getFieldDecorator('academy_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            onSelect={(value, option) => {getMajorList(value)}} 
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            academy.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="专业">
                                {getFieldDecorator('major_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            major.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="年级">
                                    {getFieldDecorator('grade_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["profile.student.grade_id"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="班级">
                                    {getFieldDecorator('class_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["profile.student.class_id"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="自动把该班学生导入这课程">
                                    {getFieldDecorator('import_student', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Switch />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="上课地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学期">
                                    {getFieldDecorator('semester', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            semester.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.semester}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="课程开始周">
                                {getFieldDecorator('start_week', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select 
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["curriculum.subject_timetable.start_week"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="课程结束周">
                                {getFieldDecorator('end_week', {
                                        rules: [{ required: true, message: "不能为空" }],
                                    })(
                                        <Select
                                            placeholder="请选择" 
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["curriculum.subject_timetable.end_week"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            timeList.map((parentItem, parentIndex) => {
                                return (
                                    <Row gutter={16} key={parentItem}>
                                        <Col span={6}>
                                            <Form.Item label="周几">
                                                {getFieldDecorator(`weekday-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('new-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.weekday"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="上课开始时间">
                                            {getFieldDecorator(`start-time-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('new-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.start_time"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="上课结束时间">
                                            {getFieldDecorator(`end-time-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('new-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.end_time"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <br/>
                                            <br/>
                                            <Button type="dashed" disabled={parentIndex === 0} 
                                                className="am-margin-right-xs"  
                                                onClick={() => {rmTimeList(parentItem)}}>
                                                <Icon type="minus-circle-o" />
                                            </Button>
                                            { parentIndex == (timeList.length - 1) && (
                                                <Button type="dashed" onClick={() => {addTimeList()}}>
                                                    <Icon type="plus-circle-o" />
                                                </Button>
                                                )
                                            }
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('remark', {
                                        initialValue: "",
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        </Row>
                    </Form>
                </div>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, 
            course, tearch, academy, major, getMajorList, editTimeList, addTimeList, rmTimeList, data, semester} = props;
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
                <div id="edit-form-area">
                    <Form vertical>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="课程">
                                    {getFieldDecorator('course_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.course_id,
                                    })(
                                        <Select placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            course.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="教师">
                                {getFieldDecorator('teacher_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.teacher_id,
                                    })(
                                        <Select placeholder="请选择" 
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            tearch.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学院">
                                {getFieldDecorator('academy_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.academy_id,
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            onSelect={(value, option) => {getMajorList(value)}} 
                                            getPopupContainer={() => document.getElementById('edit-form-area')}
                                            disabled>
                                        {
                                            academy.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="专业">
                                {getFieldDecorator('major_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.major_id,
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}
                                            disabled>
                                            <Select.Option value={"" + data.major_id}>{data.major_name}</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="年级">
                                    {getFieldDecorator('grade_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.grade_id,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}
                                            disabled>
                                        {
                                            user.conf["profile.student.grade_id"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="班级">
                                    {getFieldDecorator('class_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.class_id,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}
                                            disabled>
                                        {
                                            user.conf["profile.student.class_id"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="重新把该班学生导入这课程">
                                    {getFieldDecorator('import_student', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Switch />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="上课地点">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.location,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学期">
                                    {getFieldDecorator('semester', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.semester,
                                    })(
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            semester.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.semester}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="课程开始周">
                                {getFieldDecorator('start_week', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.start_week,
                                    })(
                                        <Select 
                                            placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["curriculum.subject_timetable.start_week"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="课程结束周">
                                {getFieldDecorator('end_week', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.end_week,
                                    })(
                                        <Select
                                            placeholder="请选择" 
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["curriculum.subject_timetable.end_week"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            editTimeList.map((parentItem, parentIndex) => {
                                let weekday = null;
                                let start_time = null;
                                let end_time = null;
                                if(data.class_time_json && data.class_time_json[parentIndex]){
                                    weekday = "" +  data.class_time_json[parentIndex].weekday;
                                    start_time = "" +  data.class_time_json[parentIndex].start_time;
                                    end_time = "" +  data.class_time_json[parentIndex].end_time;
                                }
                                return (
                                    <Row gutter={16} key={parentItem}>
                                        <Col span={6}>
                                            <Form.Item label="周几">
                                                {getFieldDecorator(`weekday-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                    initialValue: weekday,
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('edit-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.weekday"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="上课开始时间">
                                            {getFieldDecorator(`start-time-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                    initialValue: start_time,
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('edit-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.start_time"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="上课结束时间">
                                            {getFieldDecorator(`end-time-${parentItem}`, {
                                                    rules: [{ required: true, message: "不能为空" }],
                                                    initialValue: end_time,
                                                })(
                                                    <Select 
                                                        placeholder="请选择" 
                                                        getPopupContainer={() => document.getElementById('edit-form-area')}>
                                                    {
                                                        user.conf["curriculum.subject_timetable.end_time"].map((item, index) => {
                                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                                        })
                                                    }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <br/>
                                            <br/>
                                            <Button type="dashed" disabled={parentIndex === 0} 
                                                className="am-margin-right-xs"  
                                                onClick={() => {rmTimeList(parentItem)}}>
                                                <Icon type="minus-circle-o" />
                                            </Button>
                                            { parentIndex == (editTimeList.length - 1) && (
                                                <Button type="dashed" onClick={() => {addTimeList()}}>
                                                    <Icon type="plus-circle-o" />
                                                </Button>
                                                )
                                            }
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('remark', {
                                        initialValue: data.remark,
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        </Row>
                    </Form>
                </div>
            </Modal>
    );
  }
);


class SubjectTimetable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.k = 0;
        this.state = {
            list: [],
            tableLoading: false,
            total: 0,
            modalType: "close",
            confirmLoading: false,
            editRecord: {},
            selectedRowKeys: [],
            course: [],
            tearch: [],
            academy: [],
            major: [],
            selectedCourse: "-1",
            selectedAcademy: "-1",
            selectedMajor: "-1",
            selectedGrade: "-1",
            selectedClass: "-1",
            selectedCourse: "-1",
            timeList: [0],
            editTimeList: [],
            semester: [],
        }
    }

    componentWillMount() {
        this.getList();
        this.getCourseList();
        this.getTearchList();
        this.getAcademyList();
        this.getSemesterList();
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
            url: "/api/v1/curriculum/subject_timetable",
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
            url: "/api/v1/curriculum/subject_timetable",
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
            url: "/api/v1/curriculum/subject_timetable",
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
            url: "/api/v1/curriculum/subject_timetable",
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

    getSemesterList(){
        $.ajax({
            url: "/api/v1/system/all_settings",
            type: "GET",
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        semester: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    getCourseList(){
        $.ajax({
            url: "/api/v1/curriculum/course",
            type: "GET",
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        course: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    getTearchList(){
        $.ajax({
            url: "/api/v1/system/account",
            type: "GET",
            data: {
                type: 2,
            }, 
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        tearch: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    getAcademyList(){
        $.ajax({
            url: "/api/v1/system/academy",
            type: "GET",
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        academy: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    getMajorList(academy_id){
        $.ajax({
            url: "/api/v1/system/major",
            type: "GET",
            data: {
                academy_id: academy_id,
            },
            dataType: "json",
            beforeSend: function(){
                this.setState({
                    selectedMajor: "-1",
                })
            }.bind(this),
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        major: data.data.list,
                    });
                }else{
                    user.showRequestError(data)
                }
            }.bind(this),
        })
    }

    addTimeList(){
        if(this.state.modalType == "add"){
            this.setState({
                timeList: this.state.timeList.concat(++this.k)
            })
        }else{
            this.setState({
                editTimeList: this.state.editTimeList.concat(++this.k)
            })
        }
    }

    rmTimeList(k){
        if(this.state.modalType == "add"){
            this.setState({
                timeList: this.state.timeList.filter(key => key !== k)
            })
        }else{
            this.setState({
                editTimeList: this.state.editTimeList.filter(key => key !== k)
            })
        }
    }

    render(){
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },
            {
                title: '课程',
                key: 'course_name',
                dataIndex: 'course_name',
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
                title: '教师',
                key: 'teacher_name',
                dataIndex: 'teacher_name',
            },
            {
                title: '开课周',
                key: 'start_end_week_name',
                dataIndex: 'start_end_week_name',
                render: (text, record, index) => {
                    return (
                        record.start_week_name + " ~ " + record.end_week_name
                    );
                },
            },
            {
                title: '上课时间',
                key: 'start_end_time_name',
                dataIndex: 'start_end_time_name',
                render: (text, record, index) => {
                    let class_time = "";
                    record.class_time_json.map((item) => {
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
                        class_time += `${weekday_name} ${start_time} ~ ${end_time}; `
                    });
                    return class_time;
                },
            },
            {
                title: '上课地点',
                key: 'location',
                dataIndex: 'location',
            },
            {
                title: '备注',
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '详情',
                key: 'subject_student',
                dataIndex: 'subject_student',
                render: (text, record, index) => {
                    return (
                        <Link to={{
                            pathname: "/pages/curriculum/subject_timetable_detail",
                            query: {
                                subject_timetable_id: record.id,
                            },
                            state: record
                        }}>查看</Link>
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
                                <h2>课表管理 / 课表</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <button className="am-btn am-btn-default"
                                    onClick={()=>{
                                        this.k = 0;
                                        this.setState({
                                            modalType: "add",
                                            timeList: [0],
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
                                        this.k = 0;
                                        let editTimeList = [];
                                        this.state.editRecord.class_time_json.map((item, index) => {
                                            editTimeList.push(index);
                                            this.k++;
                                        })
                                        this.setState({
                                            modalType: "edit",
                                            editTimeList: editTimeList,
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
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-12" id="search-form-area"> 
                                <Select size="large" value={this.state.selectedAcademy}
                                    getPopupContainer={() => document.getElementById('search-form-area')} 
                                    style={{ width: 150 }} className="am-margin-right-xs" 
                                    onChange={(value) => {
                                        this.setState({
                                            selectedAcademy: value,
                                        });
                                        this.getMajorList(value);
                                    }}>
                                    <Select.Option value={"-1"} key={-1}>选择学院</Select.Option>
                                    {
                                        this.state.academy.map((item, index) => {
                                            return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                        })
                                    }
                                </Select>
                                <Select size="large" value={this.state.selectedMajor} 
                                    getPopupContainer={() => document.getElementById('search-form-area')}
                                    style={{ width: 150 }} className="am-margin-right-xs" 
                                    onChange={(value) => {
                                        this.setState({
                                            selectedMajor: value
                                        })
                                    }}>
                                    <Select.Option value={"-1"} key={-1}>选择专业</Select.Option>
                                    {
                                        this.state.major.map((item, index) => {
                                            return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                        })
                                    }
                                </Select>
                                <Select size="large" value={this.state.selectedGrade} 
                                    getPopupContainer={() => document.getElementById('search-form-area')}
                                    style={{ width: 150 }} className="am-margin-right-xs" 
                                    onChange={(value) => {
                                        this.setState({
                                            selectedGrade: value
                                        })
                                    }}>
                                    <Select.Option value={"-1"} key={-1}>选择年级</Select.Option>
                                    {
                                        user.conf["profile.student.grade_id"].map((item, index) => {
                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                        })
                                    }
                                </Select>
                                <Select size="large" value={this.state.selectedClass} 
                                    getPopupContainer={() => document.getElementById('search-form-area')}
                                    style={{ width: 150 }} className="am-margin-right-xs" 
                                    onChange={(value) => {
                                        this.setState({
                                            selectedClass: value
                                        })
                                    }}>
                                    <Select.Option value={"-1"} key={-1}>选择班级</Select.Option>
                                    {
                                        user.conf["profile.student.class_id"].map((item, index) => {
                                            return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                        })
                                    }
                                </Select> 
                                <Select size="large" value={this.state.selectedCourse}
                                    getPopupContainer={() => document.getElementById('search-form-area')} 
                                    style={{ width: 150 }} className="am-margin-right-xs" 
                                    onChange={(value) => {
                                        this.setState({
                                            selectedCourse: value,
                                        });
                                        this.getMajorList(value);
                                    }}>
                                    <Select.Option value={"-1"} key={-1}>选择课程</Select.Option>
                                    {
                                        this.state.course.map((item, index) => {
                                            return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                        })
                                    }
                                </Select>
                                <Button type="ghost" size="large" onClick={()=>{
                                    let q = Object.assign({}, this.props.location.query);
                                    q = Object.assign(q, {
                                        class_id: this.state.selectedClass,
                                        grade_id: this.state.selectedGrade,
                                        major_id: this.state.selectedMajor,
                                        academy_id: this.state.selectedAcademy,
                                        course_id: this.state.selectedCourse
                                    });
                                    if(this.state.selectedClass == "-1"){
                                        delete q.class_id;
                                    };
                                    if(this.state.selectedGrade == "-1"){
                                        delete q.grade_id;
                                    };
                                    if(this.state.selectedMajor == "-1"){
                                        delete q.major_id;
                                    };
                                    if(this.state.selectedAcademy == "-1"){
                                        delete q.academy_id;
                                    };
                                    if(this.state.selectedCourse == "-1"){
                                        delete q.course_id;
                                    };
                                    hashHistory.push({
                                        pathname: this.props.location.pathname,
                                        query: q, 
                                    });
                                }}>搜索</Button>
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
                    title="新建课表"
                    confirmLoading={this.state.confirmLoading}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            let class_time_json = [];
                            this.state.timeList.map((item, index) => {
                                class_time_json.push({
                                    weekday: parseInt(values[`weekday-${item}`]),
                                    "start_time": parseInt(values[`start-time-${item}`]),
                                    "end_time": parseInt(values[`end-time-${item}`]),
                                });
                                delete values[`weekday-${item}`];
                                delete values[`start-time-${item}`];
                                delete values[`end-time-${item}`];
                            })
                            let newValues = Object.assign(values, {class_time_json});
                            console.log(newValues);
                            this.newOpt(newValues);
                            this.k = 0;
                        });
                    }}
                    addTimeList={this.addTimeList.bind(this)}
                    rmTimeList={this.rmTimeList.bind(this)}
                    getMajorList={this.getMajorList.bind(this)}
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
                    title="修改课表"
                    confirmLoading={this.state.confirmLoading}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            let class_time_json = [];
                            this.state.editTimeList.map((item, index) => {
                                class_time_json.push({
                                    weekday: parseInt(values[`weekday-${item}`]),
                                    "start_time": parseInt(values[`start-time-${item}`]),
                                    "end_time": parseInt(values[`end-time-${item}`]),
                                });
                                delete values[`weekday-${item}`];
                                delete values[`start-time-${item}`];
                                delete values[`end-time-${item}`];
                            })
                            let newValues = Object.assign(values, {class_time_json});
                            this.editOpt(newValues);
                            this.k = 0;
                        });
                    }}
                    addTimeList={this.addTimeList.bind(this)}
                    rmTimeList={this.rmTimeList.bind(this)}
                    getMajorList={this.getMajorList.bind(this)}
                    {...this.state}
                />

            </div>
        )
    }
}
 
module.exports = SubjectTimetable