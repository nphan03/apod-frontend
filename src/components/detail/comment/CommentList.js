import React from 'react'

const CommentList = ({ comments }) => {
  return (
    <section className="cmtList">
      <div className="comments">
        {comments.map((cmt,index) => 
          <div key={index} className='comment_card'>
            <p className="username">{cmt.username}</p>
            <p className="cmttext">{cmt.text}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CommentList