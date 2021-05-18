import React, { Component } from 'react';
import '../public/css/style.css';



class NewsClass extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            date: '',
            description: '',
            link: '',
            _id: '',
            news: []
        }
        this.saveNews = this.saveNews.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    saveNews(e) {
        const formData  = {
            name: this.state.name,
            date: this.state.date,
            description: this.state.description,
            link: this.state.link
        }
        console.log(`Se va a mandar al servicio /api/news con datos ${JSON.stringify(formData)}`);
        
        if (this.state._id){
            fetch(`/api/news/${this.state._id}`, {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            }).then( 
                    result => {
                        this.setState({ name: '', date : '', description: '',link: '', _id: ''});
                        this.getNews()
                        
                    },
                    err => alert(err)
                )
        }else{
            fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                } ,
                body: JSON.stringify(formData)
            }).then(
                result => result.json()
                    .then(data => {
                        console.log(data);
                        this.setState({ name: '', date : '', description: '',link: '', _id: ''});
                        this.getNews();
                    }) ,
                err => console.log(err)
            );
            
        }
        
        e.preventDefault();

    }

    getNews(){
        fetch('/api/news')
            .then(result => result.json())
            .then(data => {
                this.setState({ news: data.result})
                console.log(this.state.news)
            })
            .catch( err => console.log(err));
    }

    editNews(id){
        fetch(`/api/news/${id}`, {
            method: 'GET',
            header: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(result => result.json())
        .then(data =>{
            this.setState({
                name: data.result.name,
                date: data.result.date,
                description: data.result.description,
                link: data.result.link,
                _id: data.result._id
            },
             err => console.log(err)
            )
        })

    }

    deleteNews(id){
        if (confirm("¿Seguro que quieres eliminar noticia?")){
            fetch(`/api/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(
                result => this.getNews(),
                err => console.log(err)
            )
        }
    }

    handleChange(e){
        const { name, value } = e.target;
        console.log(`Name: ${name} Value: ${value}`);
        this.setState({
            [name]:value
        })

    }

    componentDidMount(){
        console.log("Cargó el componente");
        this.getNews();
    }

    render(){
        return(
            <div className="news-container" style={{ margin: '20px'}}>
                <div className="news-row">
                    <div className="col s3">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.saveNews}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="name" onChange={this.handleChange} value={this.state.name}  type="text" placeholder="Nombre"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="date" onChange={this.handleChange} value={this.state.date}  type="text" placeholder="Fecha"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} className="materialize-textarea" value={this.state.description} placeholder="Descripción"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="link" onChange={this.handleChange} className="materialize-textarea" value={this.state.link} placeholder="Enlace"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn light-blue darken-4">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s9">
                        <table className="">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Enlace</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.news.map( (n, i) => {
                                    return(
                                        <tr key={n._id}>
                                            <td>{n.name}</td>
                                            <td>{n.date}</td>
                                            <td>{n.description}</td>
                                            <td>{n.link}</td>
                                            <td><button onClick={() => this.editNews(n._id)} className="btn light-blue darken-4"><i className="material-icons">edit</i></button></td>
                                            <td><button onClick={() => this.deleteNews(n._id)} className="btn light-blue darken-4"><i className="material-icons">delete</i></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const News = () => {
    return <NewsClass/>;
}

export default News;