import React from 'react';
import './Header.css';
import { Telegram, Home, Explore, Favorite } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { auth, authGoogle } from './firebase';


function Header(props) {
    const { user } = props;

    const signInGoogle = (e) => {
        auth.signInWithPopup(authGoogle).then((e) => {
            // console.log(e.user);
        })
            .catch(err => {
                alert(err);
            })
    }
    const Logout = (e) => {
        auth.signOut().then((e) => {
            console.log('dang xuat thanh cong')
        })
            .catch(err => {
                alert(err);
            })
    }
    return (
        <div className="header">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagrams" className="header__logo" />
            <div className="header__search">
                {user ? <button onClick={Logout} > dang xuat</button>
                    : <button onClick={signInGoogle} > dang nhap bang google</button>
                }
            </div>
            <div className='header__icons'>
                <div className='header__icons--padding'><Home /></div>
                <div className='header__icons--padding'><Telegram /></div>
                <div className='header__icons--padding'><Explore /></div>
                <div className='header__icons--padding'><Favorite /></div>
                <div className='header__icons--padding'>
                    <Avatar alt="Remy Sharp" src={user && user.photoURL} className='header__avatar' />
                </div>

            </div>
        </div>
    )
}

export default Header
