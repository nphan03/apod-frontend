import React from "react";
import axios from "axios";

class UserSubcribe extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            email:'',
            mess:''
        };
        
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handleUserSubcribeSubmit=this.handleUserSubcribeSubmit.bind(this);
    }
    
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handleUserSubcribeSubmit(e){
        e.preventDefault();
        
        axios.post(`/subcribe`, {email:this.state.email})
        .then(res => {
            this.setState({email:'', mess:res.data});
        })
        .catch(err => console.log(err));
    }
    render(){
        return <div className="user-register">
            <h4>Please Subcribe With Your Email</h4>
            <form onSubmit={this.handleUserSubcribeSubmit}>
                <input type="email" onChange={this.handleEmailChange} value={this.state.email} id="subcribeEmail" placeholder="Your email"></input>
                <input type="submit" value="Subcribe" className="btn btn-primary"></input>
            </form>
            
            <div className="message">
                {this.state.mess}
            </div>
            
        </div>;
    }
}

export default UserSubcribe;