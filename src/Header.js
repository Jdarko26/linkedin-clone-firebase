import React from 'react';
import './Header.css';

import HeaderOption from './HeaderOption';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import  BusinessCenterIcon  from '@material-ui/icons/BusinessCenter';
import SearchIcon  from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon  from '@material-ui/icons/Notifications';
import { useDispatch} from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebase';


function Header() {

    const dispactch = useDispatch();
    const logoutOfApp =() => {
        dispactch(logout());
        auth.signOut();
    };
    return (
      
       <div className="header">
             <div className="header_left">
                <img src="/images/linkedin.jpg" alt="" />

                <div className="header_search">
                 <SearchIcon />
                    <input placeholder="Search" type="text" />
                </div>
            </div>
            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                <HeaderOption onClick={logoutOfApp} title="Me" avatar={true} />
            </div> 
       </div>
        
    )
}

export default Header
