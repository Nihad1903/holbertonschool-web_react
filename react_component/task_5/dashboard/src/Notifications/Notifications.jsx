import "./Notifications.css"
import PropTypes from 'prop-types'
import NotificationItem from "./NotificationItem.jsx"
import {v4 as uuid4} from "uuid"
import { Component } from "react"


class Notifications extends Component {
    markAsRead(id) {
        console.log(`Notification ${id} has been marked as read`)
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.notifications.length != this.props.notifications.length) {
            return(true)
        } else {
            return(false)
        }
    }

    render() {
        console.log("rendered")
        if (this.props.displayDrawer == false) {
            return (<>
                        <div className='notifications-title' role='paragraph'>Your notifications</div>
                    </>)
        }
        else {
        return (
        <>
        <div className='notifications-title' role='paragraph'>Your notifications</div>
        <div className="notifications">
        
                {this.props.notifications.length != 0 ?  ( 
                    <>
                        <p>Here is the list of notifications</p>
                        <button  aria-label="Close" style={{display: "inline"}} onClick={() => {console.log("Close button has been clicked")}} type="button"><img src="/src/assets/close-button.png" alt="close button"/></button>
                        <ul>
                            {this.props.notifications.map((obj) => (
                                <NotificationItem  key={uuid4()} type={obj.type} value={obj.value} html={obj.HTML} fn={this.markAsRead}/>)
                                )
                                }
                        </ul>
                    </>
                    )
                    : (<p>No new notification for now</p>)
                }
        </div>
        </>
        )
        }}
}

Notifications.propTypes = {
    notifications: PropTypes.array,
    displayDrawer: PropTypes.bool
}



export default Notifications
