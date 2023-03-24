import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const {store,actions}=useContext(Context);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const URL="https://3001-manuquim-jwtauthentific-959gjnxbm26.ws-eu92.gitpod.io";

    const navigate=useNavigate();

    const login = () => {
        
        console.log("entradas de email y password",email,password);
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

        fetch(`${URL}/api/login`, requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                    console.log("fetch  OK");
                    if (result.access_token){
                        localStorage.setItem("token",result.access_token)
                        console.log("hemos entrado correctamente",result.access_token)
                        navigate("/demo");
                    }
                    else{
                        store.message=result.message;
                        /*navigate("/login");*/
                    }
            })
            .catch(error => console.log('error de fetch', error));

    }

    const handleFetch = (e) =>{
        e.preventDefault();
        login();
    }

    return (
        <div className="text-center mt-5">
            <h3>Wellcome</h3>
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
                 onClick={handleFetch}>Login</button>
            </form>
            <div className="alert alert_info bg-secondary mt-3">
                {store.message || "loading message from the backend (make sure the back is running)"}
            </div>
        </div>

    );
};