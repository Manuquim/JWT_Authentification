import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const {store,actions}=useContext(Context)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const Navigate=useNavigate();

    const login = () => {
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

        fetch("https://3001-manuquim-jwtauthentific-vbqt29ydqpx.ws-eu90.gitpod.io/api/login", requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                    console.log(result);
                    if (result.access_token){
                        localStorage.setItem("token",access_token)
                        Navigate("/demo");
                    }
                    else{
                        store.message=result.message;
                        Navigate("/login");
                    }
            })
            .catch(error => console.log('error', error));

    }

    return (
        <div className="text-center mt-5">
            <h3>Wellcome</h3>
            <form className="col-5 mx-auto">
                <div className=" mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(event)=>{setEmail(event.target.value)}}/>
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary" 
                 onClick={login}>Submit</button>
            </form>
            <div className="alert alert_info bg-secondary mt-3">
                {store.message || "loading message from the backend (make sure the back is running"}
            </div>
        </div>

    );
};