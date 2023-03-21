import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const {store,actions}=useContext(Context)
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const Navigate=useNavigate();

    const login = () => {

    }

    return (
        <div className="text-center mt-5">
            <h1>Wellcome</h1>
        </div>
    );
};