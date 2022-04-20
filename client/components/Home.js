import React from 'react'
import {connect} from 'react-redux'
import auth from '../store/auth'


/**
 * COMPONENT
 */
export const Home = props => {
  const {username,isAdmin} = props
  return isAdmin? (
    <h3>Welcome Admin {username}</h3>
  ): ( 
    <h3>Welcome, {username}</h3>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapState)(Home)
