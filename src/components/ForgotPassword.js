import React, { useState, useEffect } from 'react'
import Layer_1 from '../images/Layer_1.png'
import padlock from '../images/padlock.svg'
import email from '../images/email.svg'
import info from '../images/info.svg'
import axios from 'axios'
import { useHistory } from 'react-router'

function ForgotPassword({ BaseURL }) {

    const [Email, setEmail] = useState('')
    const [Code, setCode] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const [InvalidEmail, setInvalidEmail] = useState(false)
    const [InvalidCode, setInvalidCode] = useState(false)
    const [InvalidPassword, setInvalidPassword] = useState(false)
    const [NotMatched, setNotMatched] = useState(false)
    const [Allvalid, setAllvalid] = useState(true)

    const forgot_form_data = {
        "email": `${Email}`,
        "code": `${Code}`,
        "password": `${Password}`,
        "confirm_password": `${ConfirmPassword}`
    }


    useEffect(() => {
        if (false) {
            setInvalidCode(true)
        }
        else {
            setInvalidCode(false)
        }

    }, [])

    useEffect(() => {
        if (false) {
            setInvalidEmail(true)
        }
        else {
            setInvalidEmail(false)
        }

    }, [])


    useEffect(() => {
        if (Password.length < 8 && !(Password === '')) {
            setInvalidPassword(true)
        }
        else {
            setInvalidPassword(false)
        }

    }, [Password])

    useEffect(() => {
        if (!(ConfirmPassword === '') && !(Password === ConfirmPassword)) {
            setNotMatched(true)
        }
        else {
            setNotMatched(false)
        }

    }, [ConfirmPassword, Password])


    useEffect(() => {
        if ((InvalidEmail || NotMatched)) {
            setAllvalid(false)
        }
        else {
            setAllvalid(true)
        }

    }, [InvalidEmail, NotMatched])

    const sendOTP = () => {
        axios.post(`${BaseURL}/api/v1/user/forgot-password-send-otp/`, { "email": `${Email}` })
            .then(response => { console.log(response); alert('OTP sent!') })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Allvalid) {
            axios.post(`${BaseURL}/api/v1/user/forgot-password-verify-otp/`, forgot_form_data)
                .then(response => { console.log(response); alert('Password has been Reset!') })
                .catch(err => console.log(err))
        }
        else {
            console.log('someth wro')
        }
    }

    const history = useHistory()

    const backHome = () => { history.push('/') }

    return (
        <div className='login'>
            <div className='left'>
                <img alt='' onClick={backHome} src={Layer_1} className='login_logo'></img>
                <div className='upper_circle'>
                </div>
                <h2>
                    <p>Welcome to</p>
                    <p>Book My Show</p>
                </h2>
                <div className='lower_circle'>
                </div>
            </div>
            <div id='register_right'>
                <div id='reset_heading'>
                    <h4>Reset Password</h4>
                </div>
                <div className='login_container'>
                    <form className='register_form' onSubmit={handleSubmit}>
                        <button className='send_otp' type='button' onClick={sendOTP}>Send OTP</button>

                        <label>Email</label>
                        <span className={`error_msg ${InvalidEmail && `display_error`}`}>Enter a valid Email</span>
                        <input className={`inputs ${InvalidEmail && `error`}`} type="text" placeholder="Email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                        <img alt='' src={email} className='input_icons email'></img>
                        <img alt='' src={info} className={`error_icon email_error ${InvalidEmail && `display_error`}`}></img>



                        <label>Authentication code</label>
                        <span className={`error_msg ${InvalidCode && `display_error`}`}>Incorrect Authentication Code</span>
                        <input className={`inputs ${InvalidCode && `error`}`} type="password" placeholder="Enter your authentication code" name="password" value={Code} onChange={(e) => setCode(e.target.value)} required />
                        <img alt='' src={padlock} className='input_icons pass'></img>
                        <img alt='' src={info} className={`error_icon ${InvalidCode && `display_error`}`}></img>




                        <label>New Login Password</label>
                        <span className={`error_msg ${InvalidPassword && `display_error`}`}>Password must be atleast 8 digits</span>
                        <input className={`inputs ${InvalidPassword && `error`}`} type="password" placeholder="Enter your new login password" name="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                        <img alt='' src={padlock} className='input_icons pass'></img>
                        <img alt='' src={info} className={`error_icon ${InvalidPassword && `display_error`}`}></img>



                        <label>Re-enter Login Password</label>
                        <span className={`error_msg ${NotMatched && `display_error`}`}>Password not matched</span>
                        <input className={`inputs ${NotMatched && `error`}`} type="password" placeholder="Re-enter your login password" name="ConfirmPassword" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <img alt='' src={padlock} className='input_icons pass'></img>
                        <img alt='' src={info} className={`error_icon ${NotMatched && `display_error`}`}></img>
                        <button id='reset_submit_btn' type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
