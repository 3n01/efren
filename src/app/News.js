import React, { Component } from 'react';
import '../public/css/style.css';


class NewsClass extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: ''
        }
        this.saveNews = this.saveNews.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    saveNews(e) {

    }

    handleChange(e){
        const { name, value } = e.target;
        console.log(`Name: ${name} Value: ${value}`);

    }

    componentDidMount(){
        console.log("Cargó el componente");
    }

    render(){
        return(
            <div className="news-container">
                <div className="row">
                    <div className="col s6">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.saveNews}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Nombre"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} className="materialize-textarea" value={this.state.description} placeholder="Descripción"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn light-blue darken-4">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function News() {
    return <NewsClass/>;
}

export default News;