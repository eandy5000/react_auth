import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {
    renderLinks() {
        if(this.props.authorized) {
        return (
                <li>
                    <Link to="/signout">Sign Out</Link>
                </li>
                )
        } else {
        return [
                <li key={1}>
                    <Link to="/signin">Sign In</Link>
                </li>,
                <li key={2}>
                    <Link to="/signup">Sign Up</Link>
                </li>
                ]
        }
    }
    
    render() {
        console.log(this.props.authorized)
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    { this.renderLinks() }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        authorized: state.auth.authorized
    }
}

export default connect(mapStateToProps)(Header)