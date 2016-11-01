import React from 'react'
import { Table, Button, Icon, Modal, Form, Input, Radio } from 'antd'
import { user } from 'config'


class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountList: [],
            tableLoading: false,
            current: 0,
            visible: true,
            confirmLoading: false,
            d: "aaaad",
        }
    }

    componentWillMount() {
        this.getAccountList();
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

    getAccountList(){
        $.ajax({
            url: "/api/v1/system/account",
            type: "GET",
            dataType: "json",
            success: function(data){
                if(data.ret == 0){
                    this.setState({
                        accountList: data.data
                    });
                }else{
                    user.showRequestError(data);
                }
            }.bind(this)
        })
    }

    modalContent(){
        return (
                <Form vertical>
                    <Form.Item label="Title" help="adsffdsa" required>
                        <Input defaultValue={this.state.d}/>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item  required>
                        <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            )
    }

    render(){
        const columns = [{
                title: 'ID',
                key: "id",
                dataIndex: 'id',
            },{
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
            },{
                title: '邮箱',
                key: 'email',
                dataIndex: 'email',
            },{
                title: '电话',
                key: 'phone',
                dataIndex: 'phone',
            },{
                title: '权限',
                key: 'flag',
                dataIndex: 'flag',
                render: (text, record, index) => {
                    if(text == 0){
                        return "超级管理员"
                    }else{
                        return "普通账号"
                    }
                },
            },{
                title: '操作',
                key: 'id_',
                dataIndex: 'id',
                width: "50px",
                render:  (text, record, index) => {
                    console.log(record);
                    return text
                },
            }
        ];

        let modalContent = () =>{
            return (

                <Modal title="编辑账户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={()=>{
                        this.setState({
                            visible: false,
                        });
                    }}
                    maskClosable={false}
                >
                    <Form vertical>
                        <Form.Item label="Title" help="adsffdsa" required>
                            <Input defaultValue={this.state.d} />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item  required>
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        return (
            <div>
                <div className="am-g">
                    <div className="am-u-sm-12">
                        <div className="am-margin-vertical">
                            <h1> 
                                系统 / 账户 
                                <Button className="am-fr"
                                    onClick={()=>{
                                        this.setState({
                                            visible: true,
                                            d: "dasfasdf",
                                        });
                                    }}
                                >
                                    <Icon type="plus" />
                                </Button>
                            </h1>
                        </div>
                    </div>
                    <div className="am-u-sm-12">
                        <div className="content-bg">
                            <Table 
                                bordered
                                columns={columns} 
                                dataSource={this.state.accountList} 
                                loading={this.state.tableLoading} 
                                pagination={{
                                    total: 100,
                                    showSizeChanger: true,
                                    onChange: (p) => {
                                        console.log(p);
                                    }
                                }}

                            />
                        </div>
                    </div>
                </div>

                {modalContent()}

            </div>
        )
    }
}

Account.defaultProps = {
}

module.exports = Account