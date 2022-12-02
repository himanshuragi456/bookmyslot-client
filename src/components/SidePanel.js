import React, { useEffect, useState } from 'react'
import Layer_1 from '../images/Layer_1.png'
import avatar from '../images/avatar.png'
import menu from '../images/menu.svg'
import settings from '../images/settings.svg'
import exit from '../images/exit.svg'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import upload from '../images/upload.svg'

function SidePanel({ ActiveTab}) {
    const [Name, setName] = useState('')
    const [Drop, setDrop] = useState(false)
    const [PopUPOf, setPopUPOf] = useState('')

    const [Layer, setLayer] = useState(null)

    const history = useHistory()

    const handleLogout = () => {
        history.push('/')
        localStorage.clear()
        window.location.reload()
    }

    const backHome = () => { history.push('/') }
    

    return (
        <div className='side_panel'>
            <img alt='' src={Layer? Layer : Layer_1} onClick={backHome} className='logo_sidepanel'></img>
            <div className='upper_circle_side_panel'>
            </div>
            <div className={`side_panel_drop_down ${Drop && `side_panel_show_drop_down`}`}>
                            <span className='side_panel_drop_down_btn' onClick={()=>{setDrop(false);setPopUPOf('show_image')}}>Show Image</span>
                            <span className='side_panel_drop_down_btn' onClick={()=>{setDrop(false);setPopUPOf('update_image')}}>Update Image</span>
                        </div>
            <h4 className='user_name'>{Name}</h4>
            <div className='side_panel_btn_container'>
                <Link className='side_panel_btn' to='/'>
                    <span className={`indicator ${ActiveTab === 'Dashboard' && `active_tab`}`}></span>
                    <img alt='' src={menu} className='side_panel_btn_icon'></img>
                    <h5 className='side_panel_btn_text'>Dashboard</h5>
                </Link>
                <Link className='side_panel_btn' to='/settings'>
                    <span className={`indicator ${ActiveTab === 'Settings' && `active_tab`}`}></span>
                    <img alt='' src={settings} className='side_panel_btn_icon'></img>
                    <h5 className='side_panel_btn_text'>Your Settings</h5>
                </Link>
                <Link onClick={handleLogout} className='logout_btn' to='/'>
                    <span className={`indicator`}></span>
                    <img alt='' src={exit} className='side_panel_btn_icon'></img>
                    <h5 className='side_panel_btn_text'>Logout</h5>
                </Link>
            </div>
            <div className='lower_circle_side_panel'>
            </div>
            <div className={`side_panel_fade ${!(PopUPOf==='') && 'side_panel_popup_open'}`}></div>


            <div className={`side_panel_popup ${(PopUPOf==='show_image') && 'side_panel_popup_open'}`}>
                <div style={{height:'70%'}}>
                </div>
                <div className={`popup_btn_container`}>
                    <button className={`popup_btn_left`} onClick={()=>setPopUPOf('')}>Back</button>
                    {/* <button className={`popup_btn_right`} onClick={``}>Save and continue</button> */}
                </div>
            </div>
        </div>
    )
}

export default SidePanel
