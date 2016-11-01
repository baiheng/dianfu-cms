import React from 'react'
import { hashHistory } from 'react-router'

import { Menu, Icon, Switch } from 'antd';
import { user } from 'config'

const SubMenu = Menu.SubMenu;


class SiderBar extends React.Component {
    componentWillMount(){
    }

    componentDidMount(){
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
 
    render() {

        return (
            <div
                style={{
                    position: "fixed",
                    top: this.props.top,
                    left: "0px",
                    width: this.props.width,
                    bottom: "0px",
                    backgroundColor: "#222",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}>
                <Menu theme="dark"
                    style={{ width: this.props.width }}
                    defaultOpenKeys={['sub1']}
                    mode="inline" 
                    onClick={(item, key, keyPath) => {hashHistory.push(key)}}>
                    <SubMenu key="sub1" title="Navigation One">
                        <Menu.Item key="1" keyPath="asd">Option 231</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 6</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title="Navigation One">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

SiderBar.defaultProps = {
    width: "200px",
    top: "50px",
}

module.exports = SiderBar;