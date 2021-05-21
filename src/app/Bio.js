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
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
        })
    }

    saveDescription(){
        console.log("Se va a guardar descripcion");
    }

    render(){
        return(
            <div>Hola soy bio gestion</div>
        )
    }

}