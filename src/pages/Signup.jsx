import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../features/auth/authSlice';

function Signup() {
    const [accountExist, setAccountExist] = useState(false);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginButton = (e) => {
        e.preventDefault();
        console.log('login click')
        setAccountExist(true); // Switch to login
    };
    const handleBackButton = (e) => {
        e.preventDefault();
        setAccountExist(false); // Switch to signup
    };
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('signup click')
        const { name, email, password } = credentials;
        const action = await dispatch(signupUser({ name, email, password }));
        if (signupUser.fulfilled.match(action)) {
            alert("Account created successfully");
        } else {
            alert("Failed to create account: " + action.payload);
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const action = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(action)) {
            navigate("/"); // Redirect to home
        } else {
            alert("Invalid credentials: " + action.payload);
        }
    };

    return (
        <div className='my-5 flex md:flex-column lg:flex-row'>
            <img className='hidden lg:block' src="/Login-Signup/mobile.svg" alt="" />
            <div className='mx-auto mt-0'>
                <form onSubmit={accountExist ? handleLogin : handleSignup}>
                    <h1 className='text-center text-5xl mb-2 text-red-500'>{accountExist ? "Login to your account" : "Create an account"} </h1>
                    <p className='mb-20 text-center'>Enter your details below</p>
                    <div className="w-full h-full max-w-xs border border-gray-300 rounded-lg">
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {!accountExist && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="John Doe" value={credentials.name} onChange={handleChange} required />
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="johndoe@gmail.com" value={credentials.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" value={credentials.password} onChange={handleChange} required />
                            </div>
                            {!accountExist && (
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="cpassword" name="cpassword" type="password" placeholder="******************" required />
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >{accountExist ? "Login" : "Sign Up"}</button>
                                <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="#">  Forgot Password?</a>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 text-xs">&copy;2024 Acme Corp. All rights reserved.</p>
                        <div>
                            <span className='ml-2'>{accountExist ? "Don't have an account?" : "Already have an account?"} </span>
                            <button onClick={accountExist ? handleBackButton : handleLoginButton} className="m-3 px-4 py-2 bg-red-500 text-white rounded">{accountExist ? "Sign Up" : "Login"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Signup;
