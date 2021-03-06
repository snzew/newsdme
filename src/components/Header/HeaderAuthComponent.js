import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from 'prop-types';

import { logoutAction } from "../../store/actions/userActions/loginActions"
import { getUserLoginSelector } from "../../store/selectors/userSelectors"


export const HeaderAuth =(props)=> {
	return(
		<div>
			{
				!props.isLoggedIn &&
				<div>
					<Link to="/auth/1" className="login">
						<button className="login-btn">Login</button>
					</Link>

					<Link to="/auth/2" className="register">
						<button className="register-btn">Register</button>
					</Link>
				</div>
			}
			{
				props.isLoggedIn &&
				<Link to="/" className="logout-btn" onClick={() => props.logout()}>Logout</Link>
			}
		</div>
	)	
}

const mapStateToProps = state =>  {
	return { 
		isLoggedIn: getUserLoginSelector(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logoutAction())
	}
}


const HeaderAuthComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderAuth)


HeaderAuthComponent.propTypes ={
	isLoggedIn: PropTypes.bool,
	logout: PropTypes.func}

export default HeaderAuthComponent