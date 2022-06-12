import React, { useState } from 'react'
import axios from "axios"
const URL = process.env.REACT_APP_BACKEND_URL

const UserSubcribe = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleUserSubcribeSubmit = (e) => {
    e.preventDefault();
        
    axios
    .post(`${URL}/subcribe`, {email: email})
    .then(res => {
      setEmail('')
      setMessage(res.data)
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="user-register">
      <h4>Please Subcribe With Your Email</h4>
      <form onSubmit={handleUserSubcribeSubmit}>
          <input type="email" onChange={handleEmailChange} value={email} id="subcribeEmail" placeholder="Your email"></input>
          <input type="submit" value="Subcribe" className="btn btn-primary"></input>
      </form>

      <div className="message">
          {message}
      </div>
    </div>
  )
}

export default UserSubcribe