import React from 'react';
import '../public/css/style.css';

class Bio extends React.Component{
    constructor(){
        super();
        this.state= {
            es : '',
            en: ''
        }
        this.saveDescription = this.saveDescription.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log(e.target.value);
        const { name, value } = e.target;
        console.log(`Name: ${name} Value: ${value}`);
        this.setState({
            [name]:value
        })
    }

    saveDescription(e){
        
        const formData  = {
            es: this.state.es,
            en: this.state.en,

        }
        console.log("Se va a guardar: " + JSON.stringify(formData));
        fetch('/api/bio', {
            method: 'POST',
            header: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(
            result => result.json()
                .then(data => {
                    console.log(data);
                }) ,
            err => console.log(err)
        );

        e.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.saveDescription}>
                    <input type="text" name="es" onChange={this.handleChange} value={this.state.es} placeholder="Español"/>
                    <input type="text" name="en" onChange={this.handleChange} value={this.state.en} placeholder="Inglés"/>
                    <input type="submit" value="Guardar"/>
                </form>
            </div>
        )
    }

}

export default Bio;