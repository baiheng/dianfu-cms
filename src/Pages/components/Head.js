import React from 'react'
import { Link } from 'react-router'
import {Dropdown, MenuItem} from 'react-bootstrap'

class Head extends React.Component {
  render() {
    return (
        <div style={{
            height: this.props.height,
            backgroundColor: "#2e2c2c",
            position: "fixed",
            top: "0px",
            width: "100%",
            zIndex: "10",
            padding: "0px 20px 0px 0px",
        }}>
            <div style={{
                    display: "inline-block",
                    lineHeight: "45px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    paddingLeft: "20px",
                    cursor: "pointer",
                    color: "#33a597",
                }}>
                点孵CMS
            </div>
        </div>
    )
  }
}

module.exports = Head