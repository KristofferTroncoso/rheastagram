import React from 'react';
import { Auth } from 'aws-amplify';
import './SignIn.css';

function SignIn({handleAuthenticated}) {
    const [username, changeUsername] = React.useState('');
    const [password, changePassword] = React.useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        Auth.signIn({username, password}).then(res => handleAuthenticated()).catch(err => console.log(err));
        changeUsername('');
        changePassword('');
    }
    
    return (
      <form onSubmit={handleSubmit} className="SignInForm">
        <input type="text" placeholder="username" value={username} onChange={e => changeUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={e => changePassword(e.target.value)} />
        <button>Submit</button>
      </form>    
    )
}

export default SignIn;