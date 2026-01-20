
import './App.css'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Login from '../Login/Login.jsx'
import { Fragment, Component } from 'react'
import { getLatestNotification } from '../utils/utils.js'
import { v4 as uuidv4 } from 'uuid'
import CourseList from '../CourseList/CourseList.jsx'
import PropTypes from 'prop-types'

class App extends Component {

  notificationsList = [{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]
  coursesList = [{id: uuidv4(), name: "ES6", credit: 60}, {id: uuidv4(), name: "Webpack", credit: 20}, {id: uuidv4(), name: "React", credit: 40}]
  render () {
    return (
    <Fragment>
      <div className='root-notifications'><Notifications notifications={this.notificationsList} displayDrawer={true}/></div>
      <Header />
      <div className='mainSection'>
      {this.props.isLoggedIn == true ? <CourseList courses={this.coursesList}></CourseList> : <Login />}
      </div>
      <Footer />
    </Fragment>
  )}
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default App
