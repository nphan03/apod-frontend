import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import Calendar from 'react-calendar'
import { ImageContext } from '../App'
const URL = process.env.REACT_APP_BACKEND_URL

const SearchForms = () => {
  const [date, setDate] = useState('')
  const [isBtwDate, setisBtwDate] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [err_mess, setErr_mess] = useState([])

  const {
    setImages,
    setCurrentImg
  } = useContext(ImageContext)

  const handleDateChange = (e) => {
    const formatedDate = e.toISOString().slice(0, 10)
    setDate(formatedDate)
  }

  useEffect(()=>{
    axios
    .get(`https://alice-apod-backend.herokuapp.com/images/${date}`)
    .then(result => {
      if(!Array.isArray(result.data)){
        setErr_mess([])
        setImages([result.data])
        setCurrentImg(result.data)
      }else{
        setErr_mess(result.data)
      }
    })
    .catch(err => {
      if(err.code === 'ERR_BAD_REQUEST') {
        setErr_mess(["Image for tomorrow is not available yet"])
      }
    })
  },[date, setImages, setCurrentImg])

  const minusToDate = (date) => {
    const newDate = new Date(date.toISOString())
    newDate.setDate( newDate.getDate() - 1);
    return newDate.toISOString()
  }

  const handlefromtoDateChange = (e) => {
    const formatedFromDate = e[0].toISOString().slice(0, 10)
    const formatedToDate = minusToDate(e[1]).slice(0, 10)
    setFromDate(formatedFromDate)
    setToDate(formatedToDate)
  }

  useEffect(()=>{
    if( (Date.parse(fromDate)) <= (Date.parse(toDate)) ){ //check valid range of date before send the request
      axios
      .get(`https://alice-apod-backend.herokuapp.com/images/${fromDate}&${toDate}`)
      .then(result => {
        if(typeof(result.data[0])=="object"){
          setErr_mess([])
          setImages(result.data)
          setCurrentImg(result.data[0])
        }else{
          setErr_mess(result.data)
        }
      })
      .catch(err => {
          console.log(err)
      })
    }else{
      setErr_mess(["Invalid range of date"])
      setFromDate('')
      setToDate('')
    }
  },[toDate, fromDate, setCurrentImg, setImages])

const handleCheck = (e) => {
    isBtwDate ? setisBtwDate(false) : setisBtwDate(true)        
}

  return (
    <div className="searchforms" id="forms">
      <div className="specificdateform">
        <h3>Choose The Date You Want To See Picture </h3> 
        <input type="checkbox" id="btwDate" name='btwDate' value="btwDate" onChange={handleCheck}/>
        <label htmlFor="btwdate" className="searchform__btwdate_label"> Search Images on Date Range </label>
        {!isBtwDate && <Calendar onChange={handleDateChange} id="specform" minDate={new Date("06-16-1995")}/>}
        {isBtwDate && <Calendar onChange={handlefromtoDateChange}  returnValue={"range"} selectRange={true} minDate={new Date("06-16-1995")} />}
      </div>
      
      <div className="message">{err_mess.map((msg,index) => <p key={index}>{msg}</p>)}</div>
    </div>
  )
}

export default SearchForms