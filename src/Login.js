import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login} from './features/userSlice';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();
        
    const register = (e) => {
        if (!name) {
            return alert('Please enter full name');
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                   photoUrl   : profilePic,

                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName:name,
                            photoUrl  :profilePic
                        }));
                    });
        
                    
                
            }).catch(error => alert(error));
                     
    };
     const loginToApp = (e) => {
         e.preventDefault();
         auth.signInWithEmailAndPassword(email, password)
             .then(userAuth => {
                 dispatch(login({
            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName:userAuth.user.displayName,
                            profilePic: userAuth.user.photoUrl  
                 }));
             
             }).catch(error => alert(error));
    };

    return (
        <div className="login">
            <img src="/images/linkedin-logo.png" alt="" />
            <form>
                <input placeholder="Full Name" type="text" required value ={name} onChange={e=> setName(e.target.value)} />
                 <input placeholder="Profile pic URL (optional)" type="text" value ={profilePic} onChange={e=> setProfilePic(e.target.value)} />
                
                <input placeholder="Email" type="email" value ={email} onChange={e=> setEmail(e.target.value)} required />
                <input placeholder="Password" type="password" value ={password} onChange={e=> setPassword(e.target.value)} required />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member? {"  "}
             <span className="login_register" onClick={register}>Register Now</span>
            </p>
        </div>
    )
}
