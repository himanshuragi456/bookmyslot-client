import React, { useState, useEffect } from 'react'
import SidePanel from './SidePanel'
import info from '../images/info.svg'
import upload from '../images/upload.svg'
import Close from '../images/Close.png'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import styles from '../components_css/Settings.module.css'
import cx from 'classnames'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Settings({ BaseURL }) {
    const [ActiveTab,] = useState('Settings')
    const [Name, setName] = useState('')
    const [Company, setCompany] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Email, setEmail] = useState('')
    const [InvalidName, setInvalidName] = useState(false)

    // const [ImageUrl, setImageUrl] = useState(null)


    const fileChangeHandler = (files) => {
        setSendingLogo(files[0])
        uploadImage(files)
    }


    const uploadHandler = () => {
        if (SendingLogo) {
            const formData = new FormData()
            formData.append(
                'logo',
                SendingLogo,
                SendingLogo.name
            )
            axios.post(`${BaseURL}/api/v1/user/update-settings/`, formData, { headers: { "Authorization": `JWT ${token}` } })
                .then(response => { console.log(response); alert("Logo has been Updated!"); setShowPopup(false) })
                .catch(err => console.log(err))
        } else {
            alert('Please Select a File')
        }
    }

    const [InvalidEmail, setInvalidEmail] = useState()

    const [Logo, setLogo] = useState(null)
    const [SendingLogo, setSendingLogo] = useState('')

    const [Allvalid, setAllvalid] = useState(true)

    const [ShowPopup, setShowPopup] = useState(false)

    const [Uploaded, setUploaded] = useState(false)

    let token = localStorage.getItem('userAccessToken')

    const settingsData = new FormData()
    const settingsLogo = new FormData()
    settingsData.append("company", `${Company}`)
    settingsData.append("email", `${Email}`)
    settingsData.append("phone", `+${Mobile}`)
    settingsData.append("name", `${Name}`)
    settingsLogo.append("logo", `${SendingLogo}`)
    // settingsData.append("logo", `${Logo}`)

    const uploadImage = async (acceptedFiles) => {
        // setLogo(acceptedFiles[0])
        const base64 = await convertBase64(acceptedFiles[0])
        setLogo(base64)
        // settingsData.append('logo', `${Logo}`)
    }

    const convertBase64 = (acceptedFiles) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(acceptedFiles)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }


    useEffect(() => {
        if (!(/^[a-zA-Z ]+$/.test(Name)) && !(Name === '')) {
            setInvalidName(true)
        }
        else {
            setInvalidName(false)
        }

    }, [Name])


    // useEffect(() => {
    //     if ((!(RegExp(/^\d{10}$/).test(Mobile)) && !(Mobile === ''))) {
    //         setInvalidMobile(true)
    //     }
    //     else {
    //         setInvalidMobile(false)
    //     }

    // }, [Mobile])

    useEffect(() => {
        if (!(RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(Email)) && !(Email === '')) {
            setInvalidEmail(true)
        }
        else {
            setInvalidEmail(false)
        }

    }, [Email])

    useEffect(() => {
        if ((InvalidName || InvalidEmail)) {
            setAllvalid(false)
        }
        else {
            setAllvalid(true)
        }

    }, [InvalidEmail, InvalidName])


    useEffect(() => {
        if (Logo === null) {
            setUploaded(false)
        }
        else {
            setUploaded(true)
        }
    }, [Logo])

    useEffect(() => {
        axios.get(`${BaseURL}/api/v1/user/retrieve-settings/`, { headers: { "Authorization": `JWT ${token}` } })
            .then(res => {
                setEmail(((res.data.data.email === undefined) ? '' : res.data.data.email))
                setCompany(((res.data.data.company === undefined) ? '' : res.data.data.company))
                setMobile(((res.data.data.phone === undefined) ? '' : res.data.data.phone))
                setName(((res.data.data.name === undefined) ? '' : res.data.data.name))
                // console.log(res.data.data.email)
                // console.log(res.data.data.logo)
                // setImageUrl(res.data.data.logo)
                if (res.data.data.logo) {
                    setLogo(`${BaseURL}${res.data.data.logo}`)
                }
            })
    }, [BaseURL, token])


    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(settingsLogo)
    //     if (Allvalid) {
    //         axios.post(`${BaseURL}/api/v1/user/update-settings/`, settingsLogo, { headers: { "Authorization": `JWT ${token}` } })
    //             .then(response => console.log(response))
    //             .catch(err => console.log(err))
    //     }
    //     else {
    //         console.log('someth wro')
    //     }
    // }

    const handleSave = (e) => {
        e.preventDefault()
        if (Allvalid) {
            axios.post(`${BaseURL}/api/v1/user/update-settings/`, settingsData, { headers: { "Authorization": `JWT ${token}` } })
                .then(response => {console.log(response); alert('Data Saved!')})
                .catch(err => console.log(err))
        }
        else {
            console.log('someth wro')
        }
    }

    return (
        <div className={styles.settings}>
            <SidePanel ActiveTab={ActiveTab} />
            <div className={styles.settings_main}>
                <h1>Your Settings</h1>
                <div className={styles.settings_container}>
                    <form className={styles.settings_form} onSubmit={handleSave} >
                        <div className={styles.settings_form_div}>
                            <label>Name</label>
                            <span className={cx(styles.settings_error_msg, { [styles.settings_display_error]: InvalidName })}>Name can be alphabetic only</span>
                            <input className={cx(styles.settings_inputs, { [styles.settings_error]: InvalidName })} type="text" placeholder="Name" name="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                            <img alt='' src={info} className={cx(styles.settings_error_icon, { [styles.settings_display_error]: InvalidName })}></img>
                        </div>
                        <div className={styles.settings_form_div}>
                            <label>Company</label>
                            <input className={styles.settings_inputs} type="text" placeholder="Company" name="Company" value={Company} onChange={(e) => setCompany(e.target.value)} required />
                        </div>
                        <div className={styles.settings_form_div}>
                            <label>Mobile</label>
                            <span className={cx(styles.settings_error_msg)}>Enter 10 digit number</span>
                            <PhoneInput containerClass={styles.settings_inputs} containerStyle={{ position: 'relative' }} inputStyle={{ backgroundColor: "inherit", border: 'none', position: 'relative', top: '4px' }} buttonStyle={{ border: 'none', backgroundColor: 'inherit' }} value={Mobile} onChange={setMobile} />
                            {/* <input type="tel" placeholder="Mobile" name="Mobile" value={Mobile} onChange={(e) => setMobile(e.target.value)} required /> */}
                            <img alt='' src={info} className={cx(styles.settings_error_icon)}></img>
                        </div>
                        <div className={styles.settings_form_div}>
                            <label>Email</label>
                            <span className={cx(styles.settings_error_msg, { [styles.settings_display_error]: InvalidEmail })}>Enter a valid Email</span>
                            <input className={cx(styles.settings_inputs, { [styles.settings_error]: InvalidEmail })} type="text" placeholder="Email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                            <img alt='' src={info} className={cx(styles.settings_error_icon, { [styles.settings_display_error]: InvalidEmail })}></img>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <button className={styles.settings_submit_btn} style={{ marginTop: '60px', backgroundColor: '#53B7E8' }} type='button' onClick={(e) => { e.preventDefault(); setShowPopup(true) }} >Upload Logo</button>
                            <button className={styles.settings_submit_btn} style={{ marginTop: '60px' }} type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={cx(styles.settings_fade, { [styles.settings_popup_open]: ShowPopup })}></div>
            <div className={cx(styles.settings_popup, { [styles.settings_popup_open]: ShowPopup })}>
                <Dropzone onDrop={fileChangeHandler}>
                    {({ getRootProps, getInputProps }) => (
                        <section className={styles.drag_and_drop}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img alt='' className={styles.drag_and_drop_img} src={upload}></img>
                                <img src={Logo} alt='' className={cx(styles.uploaded_logo, { [styles.image_uploaded]: Uploaded })}></img>
                                <h5>jpg, png or PDF</h5>
                                <p>Drag and drop your image here or</p>
                                <button className={styles.settings_upload_btn}>Upload file</button>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <div className={styles.popup_btn_container}>
                    <button className={cx(styles.settings_submit_btn, styles.popup_btn_left)} onClick={() => { setShowPopup(false) }}>Back</button>
                    <button className={cx(styles.settings_submit_btn, styles.popup_btn_right)} onClick={uploadHandler}>Save and continue</button>
                </div>
                <img className={cx(styles.cross_btn, { [styles.image_uploaded]: Uploaded })} src={Close} alt='' onClick={() => { setLogo(null); }}></img>
            </div>
        </div>
    )
}

export default Settings
