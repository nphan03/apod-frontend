import React from "react";
import axios from "axios";
import Header from "./components/header/Header";
import ImageList from "./components/imageList/ImageList";
import SearchForms from "./components/searchForm/SearchForms.js";
import Details from "./components/detail/Details.js";
import Footer from "./components/footer/Footer.js";

class App extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            images : [],
            currentImg: undefined
        };

        this.setState = this.setState.bind(this);
        this.chooseImg = this.chooseImg.bind(this);
    }
    
    chooseImg(img){
        this.setState({currentImg: img});
    }
    
    componentDidMount(){
        axios.get("/images")
        .then(result => {
            let arrayOfImgs = [];
            arrayOfImgs.push(result.data);
            this.setState({images:arrayOfImgs, currentImg:arrayOfImgs[0]});
        }).catch(err => {
            console.log(err);
        });
    }
    
    render() {
        return <>
            <Header />
            <div className="img_nav clearfix">
                <SearchForms setState={this.setState}/>
                <ImageList images={this.state.images} chooseImg={this.chooseImg}/>
            </div> 
            <Details {...this.state.currentImg}/>
            <Footer />
        </>;
    }
}

export default App;