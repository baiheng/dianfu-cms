import React from 'react'
import { hashHistory } from 'react-router'

import { user } from 'config'


class Home extends React.Component {
    constructor(props, context){
        super(props, context);
    }
    componentWillMount(){
    }
    componentDidMount(){
        user.getUserInfo();
        hashHistory.push({
            pathname: user.menu[0].children[0].url
        })
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
            <div>
                
            </div>
        )
    }
}
module.exports = Home