import React from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './searchForm.css';

class SearchForms extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            date:'',
            isBtwDate: false,
            fromDate:'',
            toDate:'',
            word:'',
            num:'',
            err_mess: []
        };
        
        this.chooseImgByDate = this.chooseImgByDate.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.chooseImgBtwDates = this.chooseImgBtwDates.bind(this);
        this.handlefromtoDateChange = this.handlefromtoDateChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    chooseImgByDate(event){
        axios.get(`/images/${this.state.date}`)
        .then(result => {
            if(!Array.isArray(result.data)){
                this.setState({err_mess: []});
                let arrayOfImgs = [];
                arrayOfImgs.push(result.data);
                this.props.setState({images:arrayOfImgs, currentImg:arrayOfImgs[0]});
            }else{
                this.setState({err_mess: result.data});
            }
            this.setState({date:''});
        }).catch(err => {
            console.log(err);
        });
    }
    
    handleDateChange(event){
        const formatedDate = event.toISOString().slice(0, 10);
        this.setState({date: formatedDate}, ()=>{
            this.chooseImgByDate();
        });
    }
    
    handlefromtoDateChange(e){
        const formatedFromDate = e[0].toISOString().slice(0, 10);
        const formatedToDate = (e[1]).toISOString().slice(0, 10);
        this.setState({fromDate: formatedFromDate, toDate: formatedToDate}, () => {
            this.chooseImgBtwDates();
        });

    }

    handleCheck(e) {
        this.state.isBtwDate ? this.setState({isBtwDate:false}) : this.setState({isBtwDate:true});        
    }

    chooseImgBtwDates(e){
        if( (Date.parse(this.state.fromDate)) <= (Date.parse(this.state.toDate)) ){ //check valid range of date before send the request
            axios.get(`/images/${this.state.fromDate}&${this.state.toDate}`)
            .then(result => {
                if(typeof(result.data[0])=="object"){
                    this.setState({err_mess: []});
                    let arrayOfImgs = result.data;
                    this.props.setState({images:arrayOfImgs, currentImg:arrayOfImgs[0]});
                    this.setState({err_mess: ["Form submitted."]});
                }else{
                    this.setState({err_mess: result.data});
                }
                this.setState({fromDate:'', toDate:''});
            }).catch(err => {
                console.log(err);
            });
        }else{
            this.setState({err_mess: ["Invalid range of date"], fromDate:'', toDate:''});
        }
    }
    
    render() {
        return <div className="searchforms" id="forms">
            <div className="specificdateform">
                <h3>Choose The Date You Want To See Picture </h3> 
                <input type="checkbox" id="btwDate" name='btwDate' value="btwDate" onChange={this.handleCheck}/>
                <label htmlFor="btwdate"> Search Images on Date Range </label>
                {!this.state.isBtwDate && <Calendar onChange={this.handleDateChange} id="specform" minDate={new Date("06-16-1995")}/>}
                {this.state.isBtwDate && <Calendar onChange={this.handlefromtoDateChange}  returnValue={"range"} selectRange={true} minDate={new Date("06-16-1995")}/>}
            </div>
            
            <div className="message">{this.state.err_mess.map((msg,index) => <p key={index}>{msg}</p>)}</div>
        </div>;
    }
}

export default SearchForms;