import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const Signup = ({setChange}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        phone: '',
        email: '',
        movingDate: '',
        movingFrom: '',
        movingTo: '',
        notes: '',
      });
    const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const [errors, setErrors] = useState({});

    const validate =async () => {
        let tempErrors = {};
        // try {
     
        if (!formData.firstName) tempErrors.firstName = 'First Name is required';
        if (!formData.lastName) tempErrors.lastName = 'Last Name is required';
        if (!formData.phone.match(/^\d{10}$/)) tempErrors.phone = 'Phone number must be 10 digits';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = 'Invalid email format';
        if (!formData.movingDate) tempErrors.movingDate = 'Moving Date is required';
        if (!formData.movingFrom) tempErrors.movingFrom = 'Moving From location is required';
        if (!formData.movingTo) tempErrors.movingTo = 'Moving To location is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
          
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        if (!validate()) return;
    
        // Assuming form data like username, email, phone, etc., are in state
        const submitData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            movingDate: formData.movingDate,
            movingFrom: formData.movingFrom,
            movingTo: formData.movingTo,
            notes: formData.notes, 
        };
        console.log(submitData);
        
        fetch('http://localhost:5000/api/leads', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(submitData),
        })
        .then((response) => response.json()) 
        .then((data) => {
            if (data.success) {
                alert('Lead submitted successfully');
                navigate('/success-page');
                resetForm();

            } else {
              setErrors('data');
            }
            
        })
        .catch((error) => {
            console.error('Error submitting lead:', error);
            alert('Error occurred while submitting the form. Please try again.');
        });
    };
    
    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName:'',
            phone: '',
            email: '',
            movingDate: '',
            movingFrom: '',
            movingTo: '',
            notes: '',
        })
    };
    
  return (
<div className="p-4 w-100 h-100 bg-light d-flex flex-column justify-content-center align-items-center ">
      <form noValidate onSubmit={handleSubmit}>
        <h3>Submit the lead</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              required
              name='firstName'
              className="form-control mt-3"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange} 
            />
             {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
          </div>
          <div className="col-md-6">
            <input
            name='lastName'
              required
              value={formData.lastName}
              onChange={handleChange} 
              className="form-control mt-3"
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <input
              required
              name='username'
              value={formData.username}
              onChange={handleChange} 
              className="form-control mt-3"
              type="text"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <input
              required
              name='email'
              value={formData.email}
              onChange={handleChange} 
              className="form-control mt-3"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <input
              required
              name='phone'
              value={formData.phone}
              onChange={handleChange} 
              className="form-control mt-3"
              type="phone"
              placeholder="Phone"
            />
          </div>
        </div>


        <div className="form-group mt-3">
          <input
            type="date"
            name="movingDate"
            className="form-control"
            value={formData.movingDate}
            onChange={handleChange}
          />
          {errors.movingDate && <small className="text-danger">{errors.movingDate}</small>}
        </div>

        <div className="form-group mt-3">
          <input
          placeholder='Moving From'
            type="text"
            name="movingFrom"
            className="form-control"
            value={formData.movingFrom}
            onChange={handleChange}
          />
          {errors.movingFrom && <small className="text-danger">{errors.movingFrom}</small>}
        </div>

        <div className="form-group mt-3">
          <input
          placeholder='Moving To'
            type="text"
            name="movingTo"
            className="form-control"
            value={formData.movingTo}
            onChange={handleChange}
          />
          {errors.movingTo && <small className="text-danger">{errors.movingTo}</small>}
        </div>

        <div className="form-group mt-3">
          <textarea
          placeholder='Notes'
            name="notes"
            className="form-control"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <input className="form-control mt-3 btn btn-dark" type="submit" />
      </form>
      
      <p className="mt-3">
        <Link to="/api/admin/login" className="text-primary cursor-pointer"> Admin login</Link>
        <br />
        <Link to="/api/admin/register" className="text-primary cursor-pointer"> Admin Register</Link>
      </p>
    
    </div>
  )
}

export default Signup
