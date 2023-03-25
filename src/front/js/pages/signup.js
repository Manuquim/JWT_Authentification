import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const {store,actions}=useContext(Context);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const navigate=useNavigate();

    const signup = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${store.URL}/api/signup`, requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                    if (result.codigo==220){
                        /*nuevo usuario*/
                        navigate("/login");
                    }
                    else{
                        store.message=result.email+": "+result.message;
                        navigate("/signup");
                    }
            })
            .catch(error => console.log('error de fetch', error));

    }

    const handdleSignup = (e) =>{
        e.preventDefault();
        signup();
    }

    return (
        <div className="text-center mt-5">
            <h3>Sign Up</h3>
            <form className="col-5 mx-auto">
                <div className=" mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                            onChange={(event)=>{setEmail(event.target.value)}} value={email}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" 
                            className="form-control" 
                            id="exampleInputPassword1"
                            onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
                </div>
                <button type="submit" className="btn btn-primary" 
                 onClick={handdleSignup}>Sign Up</button>
            </form>
            <div className="alert alert_info bg-secondary mt-3">
                {store.message || "loading message from the backend (make sure the back is running)"}
            </div>
        </div>

    );
};