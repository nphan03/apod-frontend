import React from "react";

const CommentSection = (formInfo) => {
  const {
    handleChange,
    handleCommentSubmit,
    newNickname,
    newEmail,
    newComment,
    comments,
    err_mess
  } = formInfo

  return <div className="comment-section">
    <h3>What do you think of this picture?</h3>
    <div className='comment__content'>
      <section className="formarea"> 
          <form onSubmit={handleCommentSubmit}>
              <label>
                  Nickname:<br />
                  <input type="text" name="nicknamevalue" onChange={handleChange} value={newNickname} required></input>
              </label> <br />
              <label>
                  Email:<br />
                  <input type="email" name="emailvalue" onChange={handleChange} value={newEmail} required></input>
              </label> <br />
              <label>
                  Comment:<br />
                  <textarea name="newcmtvalue" onChange={handleChange} value={newComment} rows='7' required></textarea>
              </label> <br />
              <button className="btn btn-primary" type='submit' value="Submit">Send Comment</button>
          </form>

          <div className="message">
              {err_mess.map((err,index)=><p key={index}>{err}</p>)}
          </div>
      </section>

      <section className="cmtList">
          <h3>All Comments</h3>
          <div className="comments">
              {comments.reverse().map((cmt,index) => 
                  <div key={index} className='comment_card'>
                      <p className="username">{cmt.username}</p>
                      <p className="cmttext">{cmt.text}</p>
                  </div>
              )}
          </div>
      </section>
    </div>
  </div>
}

export default CommentSection;