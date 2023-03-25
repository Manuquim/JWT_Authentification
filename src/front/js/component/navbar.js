import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const deleteToken=() =>{
		localStorage.setItem("token",null);
		store.message=null;
	}
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-success" onClick={deleteToken}>Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
