'use client'; // Ensure the component is rendered on the client side
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjusted for the app directory
import Link from 'next/link';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Dummy data for authentication
        const dummyData = {
            username: 'admin',
            password: 'admin'
        };

        // Check if the entered credentials match the dummy data
        if (username === dummyData.username && password === dummyData.password) {
            router.push('/moderator-page'); // Redirect to the Moderator page after successful login
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <Link href="/" className="return-button">Return to Show Book List</Link>
        </div>
    );
};

export default LogIn;
