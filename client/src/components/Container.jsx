// src/components/Container.js
import React, { useState } from 'react';

function Container() {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(response => response.text())
        .then(data => setResponseMessage(data))
        .catch(error => setResponseMessage(`Error: ${error}`));
    };

    return (
        <div className="container">
            <h1>Sign Up to DEV@Deakin</h1>
            <form id="subscribe-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="EMAIL" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Subscribe</button>
            </form>
            {responseMessage && <p id="response">{responseMessage}</p>}
        </div>
    );
}

export default Container;
