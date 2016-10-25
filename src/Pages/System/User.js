import React from 'react'
import { Link } from 'react-router'
import { OverlayTrigger, Popover } from 'react-bootstrap'

import { URL } from 'config'


class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show_add_group: false,
            show_modify_group_id: -1,
        }
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

    genPopover(division_id, group_id_list){
        let group_list = this.props.group_list.map((item, index) => {
            let show_group = false;
            if(group_id_list.includes(item.id)){
                show_group = true;
            }
            return (
                <div className="checkbox" key={index}>
                    <label>
                        <input type="checkbox" onChange={(event) => {
                            if(event.target.checked){
                                this.props.newUserGroupMember({
                                    group_id: item.id,
                                    division_id: division_id,
                                })
                            }else{
                                this.props.delUserGroupMember({
                                    group_id: item.id,
                                    division_id: division_id,
                                })
                            }
                        }} checked={show_group? checked: none}/>{item.name}{show_group? item.name: ""}
                    </label>
                    <button className="am-btn am-btn-default am-btn-xs am-fr"
                    style={{padding: "2px 5px"}}>
                        <span className="glyphicon glyphicon-info-sign" />
                    </button>
                </div>
            );
        });
        let add_button = (
            <button className="am-btn am-btn-default am-btn-block am-btn-xs"
            style={{padding: "1px"}}
            onClick={() => {
                this.setState({show_add_group: true})
            }}>新增</button>
        );
        let add_group = (
            <div>
                <input type="text" className="am-form-field" 
                    placeholder="组名" ref="group_name"
                    style={{width: "150px"}} />
                <div className="am-margin-top-xs">
                    <button className="am-btn am-btn-default am-btn-xs"
                    onClick={() => {
                        this.setState({show_add_group: false})
                    }}>取消</button>
                    <button className="am-btn am-btn-success am-btn-xs am-fr"
                    onClick={() => {
                        this.props.newUserGroup({name: this.refs.group_name.value});
                        this.setState({show_add_group: false})
                    }}>保存</button>
                </div>
            </div>
        );
        return (
            <Popover id="popover-positioned-top">
                <div style={{width: "150px", minHeight: "100px"}}>
                    {group_list}
                </div>
                {this.state.show_add_group? add_group: add_button}
            </Popover>
        );
    }

    render(){

        let item = this.props.ticket;
        let b_1_b_p = ((item.b_1_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_2_b_p = ((item.b_2_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_3_b_p = ((item.b_3_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_4_b_p = ((item.b_4_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_5_b_p = ((item.b_5_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_1_s_p = ((item.b_1_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_2_s_p = ((item.b_2_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_3_s_p = ((item.b_3_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_4_s_p = ((item.b_4_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let b_5_s_p = ((item.b_5_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);

        let a_1_b_p = ((item.a_1_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_2_b_p = ((item.a_2_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_3_b_p = ((item.a_3_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_4_b_p = ((item.a_4_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_5_b_p = ((item.a_5_buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_1_s_p = ((item.a_1_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_2_s_p = ((item.a_2_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_3_s_p = ((item.a_3_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_4_s_p = ((item.a_4_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let a_5_s_p = ((item.a_5_sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);

        let buy_transaction_amount = (item.a_1_buy_transaction_amount + item.a_2_buy_transaction_amount
            + item.a_3_buy_transaction_amount + item.a_4_buy_transaction_amount 
            + item.a_5_buy_transaction_amount + item.b_1_buy_transaction_amount
            + item.b_2_buy_transaction_amount + item.b_3_buy_transaction_amount
            + item.b_4_buy_transaction_amount + item.b_5_buy_transaction_amount).toFixed(2);
        let sale_transaction_amount = (item.a_1_sale_transaction_amount + item.a_2_sale_transaction_amount
            + item.a_3_sale_transaction_amount + item.a_4_sale_transaction_amount 
            + item.a_5_sale_transaction_amount + item.b_1_sale_transaction_amount
            + item.b_2_sale_transaction_amount + item.b_3_sale_transaction_amount
            + item.b_4_sale_transaction_amount + item.b_5_sale_transaction_amount).toFixed(2);

        let b_p = ((buy_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        let s_p = ((sale_transaction_amount /item.ticket_transaction_amount)*100).toFixed(2);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                {item.code}  . {item.ticket_name} [{item.ticket_change_rate}%]  . {item.reason}
                <span style={{float: "right"}}>{item.date}</span>
                </div>
                <div className="panel-body">
                    <table className="am-table am-table-hover am-table-bordered am-table-compact am-text-xs">
                        <tbody>
                            <tr><td colSpan="7">买入金额最大的前5名</td></tr>
                            <tr>
                                <td>序号</td>
                                <td>交易营业部名称</td>
                                <td>买入金额（万）</td>
                                <td>比例</td>
                                <td>卖出金额（万）</td>
                                <td>比例</td>
                                <td>净额（万）</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.b_1_exchange_division_id, item.b_1_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            1
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.b_1_exchange_division_name}</td>
                                <td>{item.b_1_buy_transaction_amount}</td>
                                <td>{b_1_b_p}%</td>
                                <td>{item.b_1_sale_transaction_amount}</td>
                                <td>{b_1_s_p}%</td>
                                <td>{(item.b_1_buy_transaction_amount - item.b_1_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.b_2_exchange_division_id, item.b_2_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            2
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.b_2_exchange_division_name}</td>
                                <td>{item.b_2_buy_transaction_amount}</td>
                                <td>{b_2_b_p}%</td>
                                <td>{item.b_2_sale_transaction_amount}</td>
                                <td>{b_2_s_p}%</td>
                                <td>{(item.b_2_buy_transaction_amount - item.b_2_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.b_3_exchange_division_id, item.b_3_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            3
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.b_3_exchange_division_name}</td>
                                <td>{item.b_3_buy_transaction_amount}</td>
                                <td>{b_3_b_p}%</td>
                                <td>{item.b_3_sale_transaction_amount}</td>
                                <td>{b_3_s_p}%</td>
                                <td>{(item.b_3_buy_transaction_amount - item.b_3_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.b_4_exchange_division_id, item.b_4_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            4
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.b_4_exchange_division_name}</td>
                                <td>{item.b_4_buy_transaction_amount}</td>
                                <td>{b_4_b_p}%</td>
                                <td>{item.b_4_sale_transaction_amount}</td>
                                <td>{b_4_s_p}%</td>
                                <td>{(item.b_4_buy_transaction_amount - item.b_4_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.b_5_exchange_division_id, item.b_5_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            5
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.b_5_exchange_division_name}</td>
                                <td>{item.b_5_buy_transaction_amount}</td>
                                <td>{b_5_b_p}%</td>
                                <td>{item.b_5_sale_transaction_amount}</td>
                                <td>{b_5_s_p}%</td>
                                <td>{(item.b_5_buy_transaction_amount - item.b_5_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr><td colSpan="7">卖出金额最大的前5名</td></tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.a_1_exchange_division_id, item.a_1_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            1
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.a_1_exchange_division_name}</td>
                                <td>{item.a_1_buy_transaction_amount}</td>
                                <td>{a_1_b_p}%</td>
                                <td>{item.a_1_sale_transaction_amount}</td>
                                <td>{a_1_s_p}%</td>
                                <td>{(item.a_1_buy_transaction_amount - item.a_1_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.a_2_exchange_division_id, item.a_2_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            2
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.a_2_exchange_division_name}</td>
                                <td>{item.a_2_buy_transaction_amount}</td>
                                <td>{a_2_b_p}%</td>
                                <td>{item.a_2_sale_transaction_amount}</td>
                                <td>{a_2_s_p}%</td>
                                <td>{(item.a_2_buy_transaction_amount - item.a_2_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.a_3_exchange_division_id, item.a_3_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            3
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.a_3_exchange_division_name}</td>
                                <td>{item.a_3_buy_transaction_amount}</td>
                                <td>{a_3_b_p}%</td>
                                <td>{item.a_3_sale_transaction_amount}</td>
                                <td>{a_3_s_p}%</td>
                                <td>{(item.a_3_buy_transaction_amount - item.a_3_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.a_4_exchange_division_id, item.a_4_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            4
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.a_4_exchange_division_name}</td>
                                <td>{item.a_4_buy_transaction_amount}</td>
                                <td>{a_4_b_p}%</td>
                                <td>{item.a_4_sale_transaction_amount}</td>
                                <td>{a_4_s_p}%</td>
                                <td>{(item.a_4_buy_transaction_amount - item.a_4_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>
                                    <OverlayTrigger trigger="click" placement="right" 
                                    overlay={this.genPopover(item.a_5_exchange_division_id, item.a_5_group_list)} rootClose>
                                        <button 
                                            type="button" 
                                            className="am-btn am-btn-default am-btn-xs"
                                            style={{
                                                padding: "2px 10px"
                                            }}>
                                            5
                                        </button>
                                    </OverlayTrigger>
                                </td>
                                <td>{item.a_5_exchange_division_name}</td>
                                <td>{item.a_5_buy_transaction_amount}</td>
                                <td>{a_5_b_p}%</td>
                                <td>{item.a_5_sale_transaction_amount}</td>
                                <td>{a_5_s_p}%</td>
                                <td>{(item.a_5_buy_transaction_amount - item.a_5_sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                            <tr> 
                                <td colSpan="2">合计</td>
                                <td>{buy_transaction_amount}</td>
                                <td>{b_p}%</td>
                                <td>{sale_transaction_amount}</td>
                                <td>{s_p}%</td>
                                <td>{(buy_transaction_amount - sale_transaction_amount).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

User.defaultProps = {
    ticket: {},
    group_dict: {},
    group_list: [],
    newUserGroup: ({name="", remark=""}) => {},
    newUserGroupMember: ({group_id=-1, division_id=-1, remark=""}) => {},
    delUserGroupMember: ({group_id=-1, division_id=-1}) => {},
}

module.exports = User