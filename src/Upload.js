import React, { Fragment, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './Upload.css';
import { storage, db, firebase } from './firebase'
function Upload(props) {

    const { user } = props;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        else {
            setImage(null)
        }
    }
    const handleCaption = (e) => {
        if (e.target.value) {
            setCaption(e.target.value)
        }
        else {
            setCaption('')
        }
    }
    const handleSubmit = e => {
        console.log('da nhan submit')
        e.preventDefault();
        const uploadTask = storage.ref(`image/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot)
            },
            (err) => {
                alert(err);
            },
            () => {
                storage.ref('image').child(image.name).getDownloadURL().then(
                    (url) => {
                        return db.collection('posts').add({
                            username: user.displayName,
                            likes: 0,
                            imgurl: url,
                            caption: caption,
                            avatar: user.photoURL,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                    })
                    .then(
                        (post) => {
                            console.log('them post thanh cong', post)
                        })
            }
        )
        setImage(null)
        setCaption('')
    }
    return (<Fragment>
        {user
            ? (<form className='upload'  >
                <div className='upload__header'>
                    <Avatar className='upload__avatar' src={user.photoURL} alt='avatar' />
                    <span className='upload__username'>{user.displayName}</span>
                </div>
                <div className='upload__content'>
                    <input className='upload__contentInput' placeholder='Bạn đang nghĩ gì...'
                        onChange={handleCaption} value={caption}
                    />
                </div>
                <div className='upload__footer'>
                    <div className='upload__footerFile--position'>
                        <input type='file' className='upload__footerFile' id="file"
                            onChange={handleImage}
                        />
                        <label htmlFor="file" className='upload_footerLabel'>Chọn File</label>
                    </div>

                    <button type='submit' disabled={!image} onClick={handleSubmit} className='upload__footerSubmit'>Đăng</button>
                </div>
            </form>)
            : (<div className='upload_none'></div>)}
    </Fragment>

    )
}

export default Upload
