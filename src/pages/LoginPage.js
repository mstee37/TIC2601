import React, { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login submitted:', { username, password });
        // Add your login logic here
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

// export default loginPage;