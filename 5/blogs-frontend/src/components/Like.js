import React from 'react'

const Like = ({ handleLikes, likeButton }) => {
    return (
    <button className='like' onClick={handleLikes}>
        {likeButton ? 'unlike' : 'like'}
    </button>   
    )
}

export default Like