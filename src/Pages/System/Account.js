import React from 'react'
import { Table, Button } from 'antd'
import { user } from 'config'



class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountList: [],
            loading: false,
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

    render(){
        const columns = [{
                title: 'ID',
                dataIndex: 'id',
            },{
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '邮箱',
                dataIndex: 'email',
            },{
                title: '电话',
                dataIndex: 'phone',
            },{
                title: '权限',
                dataIndex: 'flag',
                render: (text, record, index) => {
                    if(text == 0){
                        return "超级管理员"
                    }else{
                        return "普通账号"
                    }
                },
            }
        ];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.accountList} loading={this.state.loading} />
            </div>
        )
    }
}

Account.defaultProps = {
}

module.exports = Account