import React, { useState } from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core'
import { MoreHoriz, Telegram, FavoriteBorder, Favorite, BookmarkBorder, ChatBubbleOutline } from '@material-ui/icons';

function Post(props) {
    const { username, caption, avatar, id, imgurl, likes } = props;
    const [clickLike, setclickLike] = useState(false);

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
                {clickLike ? (likes + 1) : likes}
            </div>
            <div className='post__status'>
                <strong>{username}</strong>
                <span>{caption}</span>
            </div>
            <div className='post__comments'>
                <div className='post__comment--padding'>
                    <strong>Hoaminzi</strong>
                    <span>Dem nay</span>
                </div>
                <div className='post__comment--padding'>
                    <strong>Hoaminzi</strong>
                    <span>Dem nay</span>
                </div>
            </div>
            <form className='post__form'>
                <input className='post__formInput' placeholder='Viet vao day...' />
                <button className='post__formButton' type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post


