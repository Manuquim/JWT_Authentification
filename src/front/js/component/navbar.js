import React from "react";
import {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store,actions}=useContext(Context);
	//borrado de token, previamente se muestra en consola
	const deleteToken=() =>{
		console.log("valor token",localStorage.getItem("token"),store.message)
		localStorage.setItem("token",null);
		store.message=null;
		console.log("valor token",localStorage.getItem("token"),store.message)
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
					<Link to="/login">
						<button className="btn btn-success" onClick={deleteToken}>Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
