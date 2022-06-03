import React from "react";

class CommentSection extends React.Component {
    
    render(){
        return <div className="comment-section">
            <h3>What do you think of this picture?</h3>
            <div className='comment__content'>
                <section className="formarea"> 
                    <form onSubmit={this.props.handleCommentSubmit}>
                        <label>
                            Nickname:<br />
                            <input type="text" name="nicknamevalue" onChange={this.props.handleChange} value={this.props.newNickname} required></input>
                        </label> <br />
                        <label>
                            Email:<br />
                            <input type="email" name="emailvalue" onChange={this.props.handleChange} value={this.props.newEmail} required></input>
                        </label> <br />
                        <label>
                            Comment:<br />
                            <textarea name="newcmtvalue" onChange={this.props.handleChange} value={this.props.newComment} rows='7' required></textarea>
                        </label> <br />
                        <button className="btn btn-primary" type='submit' value="Submit">Send Comment</button>
                    </form>
                    
                    <div className="message">
                        {this.props.err_mess.map((err,index)=><p key={index}>{err}</p>)}
                    </div>
                </section>
                
                <section className="cmtList">
                    <h3>All Comments</h3>
                    <div className="comments">
                        {this.props.comments.reverse().map((cmt,index) => 
                            <div key={index} className='comment_card'>
                                <p className="username">{cmt.username}</p>
                                <p className="cmttext">{cmt.text}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            
        </div>;
    }
}

export default CommentSection;