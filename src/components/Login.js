import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Layer_1 from '../images/Layer_1.png'
import video_player from '../images/video-player.svg'
import padlock from '../images/padlock.svg'
import user from '../images/user.svg'
import axios from 'axios';


function Login({ BaseURL }) {
    const [Username, setUsername] = useState((localStorage.getItem('userName') === null) ? '' : localStorage.getItem('userName'))
    const [Password, setPassword] = useState('')
    const [Wrongid, setWrongid] = useState(false)
    const user_data = {
        "username": `${Username}`,
        "password": `${Password}`
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // await axios.post(`${BaseURL}/api/v1/user/jwt/login/`, user_data)
        //     .then(response => {
        //         localStorage.setItem('userAuth', `${response.data.status}`);
        //         localStorage.setItem('userAccessToken', `${response.data.AccessToken}`);
        //         localStorage.setItem('userRefreshToken', `${response.data.RefreshToken}`);
        //     })
        //     .catch(err => alert(err))
        localStorage.setItem('userName', `${Username}`)
        localStorage.setItem('userAuth', true);
        window.location.reload()
    }

    useEffect(() => {
        if (localStorage.getItem('userAuth')) {
            setWrongid(true)
        }
        else {
            setWrongid(false)
        }
    }, [])

    return (
        <div className='login'>
            <div className='left'>
                <img alt='' src={Layer_1} className='login_logo'></img>
                <div className='upper_circle'>
                </div>
                <h2>
                    <p>Welcome to</p>
                    <p>Book My Show</p>
                </h2>
                <div className='lower_circle'>
                </div>
            </div>
            <div id='login_right'>
                <div id='login_heading'>
                    <h4>Sign in to continue</h4>
                    <img alt='' src={video_player}></img>
                </div>
                <div className='login_container'>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input className={`inputs ${Wrongid && `error`}`} type="text" placeholder="Username" name="Username" value={Username} onChange={(e) => setUsername(e.target.value)} required />
                        <img alt='' src={user} className='input_icons'></img>
                        <label>Password</label>
                        <span className={`error_msg ${Wrongid && `display_error`}`}>Username or Password is Incorrect</span>
                        <input className={`inputs ${Wrongid && `error`}`} type="password" placeholder="Password" name="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                        <img alt='' src={padlock} className='input_icons pass'></img>
                        <div id='footer'>
                            <label id='radio_container'>
                                <input type='radio' id='radio_btn'></input>
                                <span>Keep me signed in</span>
                            </label>
                            <a href="forgotpassword">Forgot Password? </a>
                        </div>
                        <button id='login_submit_btn' type="submit">SIGN IN</button>
                        <p>Don't have an account yet? <Link to='/register'>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
