import React from "react";

const Login = ()=>{
    return(
        <div className="container mt-5">
            <form id="loginForm">
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-conrtol"placeholder="Email Address"/>
                </div>
                <div className="form-outline mb-4">
                <input type="password" id="form2Example1" className="form-conrtol" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">submit</button>
            </form>
        </div>
    )
}
export default Login