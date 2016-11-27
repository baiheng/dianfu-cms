import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm, DatePicker, Row, Col, Upload } from 'antd'
import { user } from 'config'


const NewForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, academy, major, getMajorList} = props;
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
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <h1><small>个人信息</small></h1>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="姓名">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="出生">
                                {getFieldDecorator('birthday', {
                                    rules: [
                                        { type: 'object', required: true, message: '不能为空' },
                                    ],
                                    initialValue: moment("1990-10-31", "YYYY-MM-DD"),
                                    })(
                                        <DatePicker allowClear={false}
                                            getCalendarContainer={() => document.getElementById('new-form-area')}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="性别">
                                {getFieldDecorator('sex', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["profile.student.sex"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="政治面貌">
                                {getFieldDecorator('political_status', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["profile.student.political_status"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="身份证">
                                    {getFieldDecorator('id_card_number', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="民族">
                                    {getFieldDecorator('nationality', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="手机号码">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="户口所在地" >
                                    {getFieldDecorator('registered_permanent_residence', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 1, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <hr/>
                        <Row gutter={16}>
                            <Col span={6}>
                                <h1><small>校园信息</small></h1>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="学号">
                                    {getFieldDecorator('student_number', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "",
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="入学日期">
                                {getFieldDecorator('enrollment_date', {
                                    rules: [
                                        { type: 'object', required: true, message: '不能为空' },
                                    ],
                                    initialValue: moment("2016-09-01", "YYYY-MM-DD"),
                                    })(
                                        <DatePicker allowClear={false} 
                                            getCalendarContainer={() => document.getElementById('new-form-area')}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学位">
                                {getFieldDecorator('degree', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('new-form-area')}>
                                        {
                                            user.conf["profile.student.degree"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学院">
                                {getFieldDecorator('academy_id', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select onSelect={(value, option) => {getMajorList(value)}} placeholder="请选择"
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
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="专业">
                                {getFieldDecorator('major_id', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    })(
                                        <Select  placeholder="请选择"
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
                            <Col span={24}>
                                <Form.Item label="备注" >
                                    {getFieldDecorator('remark', {
                                        initialValue: "",
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
    );
  }
);

const EditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading, academy, major, getMajorList, data} = props;
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
                    <Form horizontal>
                        <Row gutter={16}>
                            <Col span={6}>
                                <h1><small>个人信息</small></h1>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="姓名">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.name,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="出生">
                                {getFieldDecorator('birthday', {
                                    rules: [
                                        { type: 'object', required: true, message: '不能为空' },
                                    ],
                                    initialValue: moment(data.birthday, "YYYY-MM-DD"),
                                    })(
                                        <DatePicker allowClear={false}
                                            getCalendarContainer={() => document.getElementById('edit-form-area')}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="性别">
                                {getFieldDecorator('sex', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.sex,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["profile.student.sex"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="政治面貌">
                                {getFieldDecorator('political_status', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.political_status,
                                    })(
                                        <Select   placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["profile.student.political_status"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="身份证">
                                    {getFieldDecorator('id_card_number', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.id_card_number,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="民族">
                                    {getFieldDecorator('nationality', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.nationality,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="手机号码">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.phone,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        initialValue: data.password,
                                    })(
                                        <Input type="password" placeholder="重设密码"/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="户口所在地" >
                                    {getFieldDecorator('registered_permanent_residence', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.registered_permanent_residence,
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 1, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <hr/>
                        <Row gutter={16}>
                            <Col span={6}>
                                <h1><small>校园信息</small></h1>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="学号">
                                    {getFieldDecorator('student_number', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.student_number,
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="入学日期">
                                {getFieldDecorator('enrollment_date', {
                                    rules: [
                                        { type: 'object', required: true, message: '不能为空' },
                                    ],
                                    initialValue: moment(data.enrollment_date, "YYYY-MM-DD"),
                                    })(
                                        <DatePicker allowClear={false}
                                            getCalendarContainer={() => document.getElementById('edit-form-area')}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学位">
                                {getFieldDecorator('degree', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.degree,
                                    })(
                                        <Select  placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["profile.student.degree"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学院">
                                {getFieldDecorator('academy_id', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.academy_id,
                                    })(
                                        <Select onSelect={(value, option) => {getMajorList(value)}}  placeholder="请选择" 
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            academy.map((item, index) => {
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
                                <Form.Item label="专业">
                                {getFieldDecorator('major_id', {
                                    rules: [
                                        { required: true, message: '不能为空' },
                                    ],
                                    initialValue: "" + data.major_id,
                                    })(
                                        <Select   placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            major.map((item, index) => {
                                                return <Select.Option value={"" + item.id} key={index}>{item.name}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="年级">
                                    {getFieldDecorator('grade_id', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: "" + data.grade_id,
                                    })(
                                        <Select   placeholder="请选择"
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
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
                                            getPopupContainer={() => document.getElementById('edit-form-area')}>
                                        {
                                            user.conf["profile.student.class_id"].map((item, index) => {
                                                return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                            })
                                        }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="备注" >
                                    {getFieldDecorator('remark', {
                                        rules: [{ required: true, message: "不能为空" }],
                                        initialValue: data.remark,
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
    );
  }
);

const QuickImportForm = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, form, title, confirmLoading} = props;
        const { getFieldDecorator } = form;

        const uploadProps = {
            name: 'file',
            action: '/api/v1/profile/student_quick_import',
            headers: {
                authorization: 'authorization-text',
            },
            fileList: [],
            onChange(info) {
                    console.log(info.file.status)
                if(info.file.status === 'done'){
                    console.log(info)
                }
            },
        };

        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
                maskClosable={false}
                width="300px"
                footer={""}
            >
                <div className="am-g">
                    <div className="am-u-sm-12" style={{textAlign: "center"}}>
                        <Upload {...uploadProps}>
                            <Button type="ghost">
                                <Icon type="upload" /> 上传学生档案.excel
                            </Button>
                        </Upload>
                    </div>

                    <div className="am-u-sm-12 am-margin-top" style={{textAlign: "center"}}>
                        <a className="am-margin-top" href="/api/v1/profile/student_quick_import">下载学生档案模板</a>
                    </div>
                </div>
            </Modal>
    );
  }
);


class Student extends React.Component {
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
            academy: [],
            major: [],
            selectedAcademy: "-1",
            selectedMajor: "-1",
            selectedGrade: "-1",
            selectedClass: "-1",
        }
    }

    componentWillMount() {
        this.getList();
        this.getAcademyList();
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

    getList(){
        $.ajax({
            url: "/api/v1/profile/student",
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
            url: "/api/v1/profile/student",
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
            url: "/api/v1/profile/student",
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
            url: "/api/v1/profile/student",
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
        const columns = [{
                title: '姓名',
                key: "name",
                dataIndex: 'name',
            },{
                title: '学号',
                key: 'student_number',
                dataIndex: 'student_number',
            },{
                title: '学院',
                key: 'academy_name',
                dataIndex: 'academy_name',
            },{
                title: '专业',
                key: 'major_name',
                dataIndex: 'major_name',
            },{
                title: '年级',
                key: 'grade_name',
                dataIndex: 'grade_name',
            },{
                title: '班级',
                key: 'class_name',
                dataIndex: 'class_name',
            }
            ]; 
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>档案管理 / 学生档案</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12 am-margin-top">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <button className="am-btn am-btn-default"
                                    onClick={()=>{
                                        this.setState({
                                            modalType: "quickImport",
                                        });
                                    }}
                                >
                                    快速导入
                                </button>
                                <button className="am-btn am-btn-default am-margin-left-xs"
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
                                        this.getMajorList(this.state.editRecord.academy_id);
                                        this.setState({
                                            modalType: "edit",
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
                                    <input type="text" className="am-form-field" placeholder="学号" ref="name" />
                                    <span className="am-input-group-btn">
                                        <button className="am-btn am-btn-default" type="button" 
                                        onClick={()=>{
                                                let v = this.refs.name.value;
                                                let q = Object.assign({}, this.props.location.query);
                                                if(v == ""){
                                                    delete q.like;
                                                }else{
                                                    q = Object.assign(q, {like: "student_number^" + v});
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
                                <Button type="ghost" size="large" onClick={()=>{
                                    let q = Object.assign({}, this.props.location.query);
                                    q = Object.assign(q, {
                                        class_id: this.state.selectedClass,
                                        grade_id: this.state.selectedGrade,
                                        major_id: this.state.selectedMajor,
                                        academy_id: this.state.selectedAcademy
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

                <QuickImportForm
                    ref={(form) => {
                        this.quickImportForm = form;
                    }}
                    visible={this.state.modalType == "quickImport"}
                    onCancel={()=>{
                        this.setState({
                            modalType: "close",
                        });
                    }}
                    title="快速导入学生档案"
                    onOk={() =>{
                        this.quickImportForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            this.quickImportForm.resetFields();
                            // this.newOpt(transform);
                        });
                    }}
                />

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
                    title="新建学生档案"
                    confirmLoading={this.state.confirmLoading}
                    academy={this.state.academy}
                    major={this.state.major}
                    getMajorList={this.getMajorList.bind(this)}
                    onOk={() =>{
                        this.newForm.validateFields((err, values) => {
                            if (err) {
                                return;
                            }
                            let transform = {
                                ...values,
                                birthday: values.birthday.format('YYYY-MM-DD'),
                                enrollment_date: values.enrollment_date.format('YYYY-MM-DD'),
                            };
                            this.newOpt(transform);
                        });
                    }}
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
                    title="修改学生档案"
                    confirmLoading={this.state.confirmLoading}
                    academy={this.state.academy}
                    major={this.state.major}
                    getMajorList={this.getMajorList.bind(this)}
                    data={this.state.editRecord}
                    onOk={() =>{
                        this.editForm.validateFields((err, values) => {
                            console.log(values);
                            if (err) {
                                return;
                            }
                            let transform = {
                                ...values,
                                birthday: values.birthday.format('YYYY-MM-DD'),
                                enrollment_date: values.enrollment_date.format('YYYY-MM-DD'),
                            };
                            this.editOpt(transform);
                        });
                    }}
                />
            </div>
        )
    }
}
 
module.exports = Student