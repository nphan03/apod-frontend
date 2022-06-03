import React from "react";

class Content extends React.Component {
    
    render(){
        return <div className="content">
            <h2>{this.props.title}</h2>
            <div className='content__details'>
                <section className='content__picture'>
                    {(this.props.media_type === "video") ? <iframe width="420" height="315" src={this.props.url}></iframe>   
                        : <img src={this.props.url} alt={this.props.title}/>
                    }
                    <p className='photographer'><b>Copyright:</b> {this.props.copyright}</p>
                </section>
                <section className='content__text'>
                    <p>{this.props.explanation}</p>
                </section>
            </div>            
        </div>;
    }
}

export default Content;