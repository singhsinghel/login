import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = ({setChange}) => {
  const navigate=useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
               try {

            const response = await axios.post('https://login-pa5a.onrender.com/api/admin/login', { username, password });
            
            if (response.status === 200) {
                setSuccessMessage('Login successful');
                setErrorMessage('');
                localStorage.setItem('token', response.data.token);
                navigate('/api/admin/leads')
            }
        } catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Error occurred during login');
            }
        }

        
      };
      return (
        <div className='p-4 w-50 h-50 bg-light login w-100 d-flex justify-content-center align-items-center'>
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
                    placeholder='Password'
                    className='form-control mb-2'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className='btn btn-success'>Login</button>
            </form>
            {errorMessage && <div className='alert alert-danger mt-2'>{errorMessage}</div>}
            {successMessage && <div className='alert alert-success mt-2'>{successMessage}</div>}
        </div>
    );
}

export default Login
