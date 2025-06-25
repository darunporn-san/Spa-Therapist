import React, { useState } from 'react';
const LoginPage = ({ onSwitchToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = () => {
        console.log('Login attempt:', formData);
        // Handle login logic here
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="p-4 bg-blue-500 text-white rounded-lg">
                Hello Tailwind!
            </div>
            <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
            /></div>
    );
};

export default LoginPage