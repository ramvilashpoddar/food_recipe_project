// import React, { useState } from 'react';
// import "./styles/auth.css";
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// export const Auth = () => {

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
    
//     const [_, setCookies] = useCookies(['access_token'])

//     const navigate = useNavigate();

//     const onSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:3000/auth/login", {
//                 username,
//                 password
//             });

//             if (response.status === 200) {
//                 setCookies("access_token", response.data.token);
//                 window.localStorage.setItem("userID", response.data.userID);
//                 navigate("/home");
//             }
           
//         } catch (error) {
//             if (error.response) {
//                 if (error.response.status === 404) {
//                     alert("The user doesn't exist");
//                 } else if (error.response.status === 401) {
//                     alert("Username or Password is incorrect");
//                 }
//             } else {
//                 alert("An unexpected error occurred. Please try again later.");
//                 console.error('Error:', error);
//             }
//         }
//     }

//     return (
//         <div className='container'>
//             <div className='login-form-container p-5'>
//                 <form onSubmit={onSubmit}>
//                     <h3 className='text-center'>Sign In</h3>

//                     <div className='mb-2'>
//                         <label htmlFor="username">Username</label>
//                         <input 
//                             type="text" 
//                             placeholder='Enter username' 
//                             className='form-control'
//                             id='username'
//                             onChange={(event) => setUsername(event.target.value)}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <label htmlFor="password">Password</label>
//                         <input 
//                             type="password" 
//                             placeholder='Enter password' 
//                             className='form-control'
//                             id='password'
//                             onChange={(event) => setPassword(event.target.value)}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
//                         <label htmlFor="check" className='custom-input-label ms-2'>Remember me</label>
//                     </div>

//                     <div className='d-flex justify-content-center mt-2'>
//                         <button className='btn btn-primary w-100'>Sign in</button>
//                     </div>
//                     <p className='text-end mt-2'>
//                         Forgot <a href="#">Password?</a> <Link to="/signup" className='ms-2'>Sign up</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     )
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [_, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                setCookies("access_token", data.token);
                window.localStorage.setItem("userID", data.userID);
                navigate("/home");
            } else if (response.status === 404) {
                alert("The user doesn't exist");
            } else if (response.status === 401) {
                alert("Username or Password is incorrect");
            }
        } catch (error) {
            alert("An unexpected error occurred. Please try again later.");
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={onSubmit}>
                    <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id="username"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input type="checkbox" className="form-checkbox" id="check"/>
                        <label htmlFor="check" className="ml-2 text-gray-700">Remember me</label>
                    </div>

                    <div className="mb-4">
                        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign in</button>
                    </div>

                    <p className="text-center text-gray-600">
                        Forgot <a href="#" className="text-blue-500">Password?</a> <Link to="/signup" className="text-blue-500 ml-2">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
