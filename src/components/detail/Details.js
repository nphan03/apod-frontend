import React, { useEffect, useState, useContext } from "react";
import Content from "./content/Content.js";
import axios from "axios";
import CommentSection from "./comment/CommentSection.js";
import { ImageContext } from '../App'
const URL = process.env.REACT_APP_URL

const Details = () => {
  const [newNickname, setNewNickname] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])
  const [err_mess, setErr_mess] = useState([])

  const { currentImg } = useContext(ImageContext)

  useEffect(() => {
    const currentImgComments = [];
    console.log(currentImg.date)
    axios
    .get(`${URL}/comments/${currentImg.date}`)
    .then(results => {
      console.log(results)
      results.data.forEach(cmt => {
        currentImgComments.push(cmt);
      });
      setComments(currentImgComments);
    })
    .catch(err=>console.log(err));
    
  },[currentImg.date])

  const handleChange = (e) => {
    if(e.target.name === "nicknamevalue"){
      setNewNickname(e.target.value);
    }else if(e.target.name === "emailvalue"){
      setNewEmail(e.target.value);
    }else{
      setNewComment(e.target.value);
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
        
    const clonedComments=[...comments]
    
    const comment = {
        nickname:  newNickname,
        email: newEmail,
        date: currentImg.date,
        text: newComment,
    };

    axios.post("/comments", comment)
    .then(res=>{
        if(Array.isArray(res.data)){
            setErr_mess(res.data);
        }else{
          setErr_mess(["Sent Comment. Thanks"])
          clonedComments.push(res.data);
        }
        setNewNickname("")
        setNewEmail("")
        setComments(clonedComments)
    })
    .catch(err=>console.log(err));
  }

  const formInfo = {
    handleChange,
    handleCommentSubmit,
    newNickname,
    newEmail,
    newComment,
    comments,
    err_mess
  } 

  return <div className="details">
  <Content />
  <CommentSection {...formInfo}/>
</div>
}

export default Details;