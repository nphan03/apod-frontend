import React from "react";
import Content from "./content/Content.js";
import axios from "axios";
import CommentSection from "./comment/CommentSection.js";
import './detail.css';

class Details extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            newNickname:'',
            newEmail:'',
            newComment:'',
            comments:[],
            err_mess:[]
        };
        
        this.handleChange=this.handleChange.bind(this);
        this.handleCommentSubmit=this.handleCommentSubmit.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.date != this.props.date){
            
            let currentImgComments = [];
            
            axios.get(`/comments/${this.props.date}`)
            .then(results => {
                results.data.forEach(cmt => {
                    currentImgComments.push(cmt);
                });
                this.setState({comments:currentImgComments});
            })
            .catch(err=>console.log(err));
            
        }
    }
    
    handleChange(e){
        if(e.target.name == "nicknamevalue"){
            this.setState({newNickname: e.target.value});
        }else if(e.target.name == "emailvalue"){
            this.setState({newEmail: e.target.value});
        }else{
            this.setState({newComment: e.target.value});
        }
    }
    
    handleCommentSubmit(e){
        e.preventDefault();
        
        let clonedComments=this.state.comments.slice();
        
        let inputs = {
            nickname:  this.state.newNickname,
            email: this.state.newEmail,
            date: this.props.date,
            text: this.state.newComment,
        };

        axios.post("/comments", inputs)
        .then(res=>{
            if(Array.isArray(res.data)){
                this.setState({err_mess: res.data});
            }else{
                this.setState({err_mess: ["Sent Comment. Thanks"]});
                clonedComments.push(res.data);
            }
            this.setState({newNickname:'', newEmail:'', newComment:'', comments:clonedComments});
        })
        .catch(err=>console.log(err));
    }
    
    render(){
        
        let formProps = {
            handleChange: this.handleChange,
            handleCommentSubmit: this.handleCommentSubmit,
            newNickname: this.state.newNickname,
            newEmail: this.state.newEmail,
            newComment: this.state.newComment,
            comments: this.state.comments,
            err_mess:this.state.err_mess
        };
        
        return <div className="details">
            <Content {...this.props}/>
            <CommentSection {...formProps}/>
        </div>;
    }
}

export default Details;