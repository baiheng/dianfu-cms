import React from 'react'


class QRCodeReact extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
    }

    componentDidMount() {
        new QRCode(this.refs.qrcode, this.props.value);
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
        return (
            <div ref="qrcode">
            </div>
        )
    }
}
 
module.exports = QRCodeReact