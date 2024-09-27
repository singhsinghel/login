import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import {Link} from 'react-router-dom'
const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e,) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/register', { username, password, email });
            
            if (response.status === 201) {
                setSuccessMessage('Signup successful. You can now log in.');
                setErrorMessage('');
          
            }
        } catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
                
            } else {
                console.log(error);
                setErrorMessage('Error occurred during signup'+error.message);
            }
        }
    };
    return (
        <>
        
        <div className='p-4 w-50 h-50 bg-light signup w-100 d-flex flex-column justify-content-center align-items-center'>
        {errorMessage && <div className='alert alert-danger mt-2'>{errorMessage}</div>}
        {successMessage && <div className='alert alert-success mt-2'>{successMessage}</div>}
        <div className="form">
            <form onSubmit={handleSubmit} className=''>
                <input
                    placeholder='Username'
                    className='form-control mb-2'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder='Email'
                    className='form-control mb-2'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    placeholder='Password'
                    className='form-control mb-2'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className='btn btn-primary'>Sign Up</button>
            </form>
            </div>
        </div>
        </>
    );
};

export default CreateAdmin;
