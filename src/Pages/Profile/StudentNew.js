import React from 'react'
import { hashHistory } from 'react-router'
import { Table, Button, Icon, Modal, Form, Input, Radio, Select, Popconfirm } from 'antd'
import { user } from 'config'


const ProfileForm = Form.create()(React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    },

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    },

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3"> 

                        <Form.Item
                            label="性别"
                        >
                        {getFieldDecorator('select', {
                            rules: [
                                { required: true, message: '不能为空' },
                            ],
                            initialValue: "-1",
                            })(
                                <Select>
                                {
                                    user.conf["profile.student.sex"].map((item, index) => {
                                        return <Select.Option value={"" + item[0]} key={index}>{item[1]}</Select.Option>;
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </div>
                    <div className="col-sm-3"> 
                        <Form.Item
                            label="姓名"
                            >
                            {getFieldDecorator('input-number', { 
                                initialValue: "" 
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-3"> 

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>

                    </div>
                </div>
                </div>
            </Form>
    );
  },
}));

class StudentNew extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
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

    newOpt(data){
        $.ajax({
            url: "/api/v1/profile/student",
            type: "POST",
            data: Object.assign({
                academy_id: this.props.location.query.academy_id
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

    render(){
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12 am-margin-vertical">
                        <div className="am-g am-g-collapse">
                            <div className="am-u-sm-6"> 
                                <h2>档案管理 / 新建学生档案</h2>
                            </div>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <ProfileForm />
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}
 
module.exports = StudentNew