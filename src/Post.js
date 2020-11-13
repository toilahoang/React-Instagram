import React, { useState, useEffect } from 'react'
import './Post.css';
import { db, firebase } from './firebase'
import { Avatar } from '@material-ui/core'
import { MoreHoriz, Telegram, FavoriteBorder, Favorite, BookmarkBorder, ChatBubbleOutline } from '@material-ui/icons';

function Post(props) {
    const { username, caption, avatar, id, imgurl, likes, user } = props;
    const [clickLike, setclickLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [TextComment, setTextComment] = useState('');
    useEffect(
        () => {
            db.collection('posts').doc(id).collection('comments').orderBy('timestamp', 'asc').onSnapshot(
                (snapshot) => {
                    setComments(snapshot.docs.map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    }))
                })
        }, [id])

    const handleTextComment = (e) => {
        if (e.target.value) {
            setTextComment(e.target.value)
        }
        else {
            setTextComment('')
        }
    }
    const handleSubmitComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(id).collection('comments').add({
            username: user.displayName,
            text: TextComment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((comment) => {
            console.log('da comment thanh cong', comment)
        }
        )
        setTextComment('')
    }
    return (
        <div className="post">
            <div className='post__header'>
                <div className='post__headerTitle'>
                    <Avatar alt="Remy Sharp" src={avatar} className='post__headerAvatar' />
                    <span>{username}</span>
                </div>
                <MoreHoriz />
            </div>
            <div className='post__image'>
                <img src={imgurl} alt='hoang deptrai' className='post__imageStatus' />
            </div>
            <div className='post__icons'>
                <div className='post__iconsLeft'>
                    {clickLike
                        ? (<Favorite className='post__iconsLeftAll'
                            onClick={e =>
                                setclickLike(false)
                            }
                            style={{ color: "red" }} />)
                        : (<FavoriteBorder className='post__iconsLeftAll'
                            onClick={e =>
                                setclickLike(true)
                            }
                        />)}
                    <ChatBubbleOutline className='post__iconsLeftAll' />
                    <Telegram className='post__iconsLeftAll' />
                </div>
                <BookmarkBorder className='post__iconsLeftAll' />
            </div>
            <div className='post__likes'>
                {clickLike ? (likes + 1) : likes} likes
            </div>
            <div className='post__status'>
                <strong>{username}</strong>
                <span>{caption}</span>
            </div>
            <div className='post__comments'>
                {comments && comments.map(
                    (comment) => (
                        <div key={comment.id} className='post__comment--padding'>
                            <strong>{comment.username}</strong>
                            <span>{comment.text}</span>
                        </div>
                    )
                )}
            </div>
            {
                user
                    ? (<form className='post__form'>
                        <input onChange={handleTextComment} value={TextComment} type='text' className='post__formInput' placeholder='Viet vao day...' />
                        <button onClick={handleSubmitComment} disabled={!TextComment} className='post__formButton' type='submit'>Post</button>
                    </form>)
                    : (<div></div>)
            }

        </div>
    )
}

export default Post


