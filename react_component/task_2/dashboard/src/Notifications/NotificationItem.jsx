import PropTypes from "prop-types"
import "./Notifications.css"
import {v4 as uuid4} from "uuid"
import { Component } from "react"

class NotificationItem extends Component {
    render() {
        if (this.props.html != undefined) {
            let id = uuid4()
            let newfn = this.props.fn.bind(this,id)
            return (<li key={id} data-notification-type={this.props.type} dangerouslySetInnerHTML={{__html: this.props.html}} role="listitem" onClick={newfn}></li>)
        }
        else {
            let id = uuid4()
            let newfn = this.props.fn.bind(this,id)
            return (<li key={uuid4()} data-notification-type={this.props.type} role="listitem" onClick={newfn}>{this.props.value}</li>)
        }   
    }
}

NotificationItem.propTypes = {
    type: PropTypes.string,
    html: PropTypes.string,
    value: PropTypes.string,
    fn: PropTypes.func
}

export default NotificationItem
