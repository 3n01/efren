import React from 'react';
import '../public/css/style.css';



const style = {
    margin: '20px'
}

class BioClass extends React.Component{
    constructor(){
        super();
        this.state= {
            espanol : '',
            english: ''
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

    fetchBioDesc(){
        fetch(`/api/bio`,{
          method : 'GET',
          mode : 'cors'
        }).then(result => result.json())
        .then(
            desc => {
                const es = desc[0].espanol;
                const en = desc[0].english;
                console.log(`Es: ${es} En: ${en}`);
            
                this.setState({
                    espanol: es,
                    english: en
                })
            },
            err => console.log(err)
        )
        

      }

    saveDescription(e){  
        const formData  = {
             espanol: this.state.espanol,
             english: this.state.english,
         }
        // const formData  = new FormData();   
        // formData.append('espanol', this.state.espanol);
        // formData.append('en', this.state.en);

        console.log("Se va a guardar:: " + JSON.stringify(formData));
        fetch('/api/bio', {
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
                    alert(`Se modificó ${data.insercion} en base de datos, ya debería verse el cambio en BIO tras recargar la página`);
                }) ,
            err => console.log(err)
        );

        e.preventDefault();
    }

    componentDidMount(){
        console.log("Cargó bio");
        this.fetchBioDesc();
    }



    render(){
        return(
            <div style={style} className="gestion-bio-container">
                <form onSubmit={this.saveDescription}>
                    <textarea type="text" name="espanol" className="materialize-textarea" onChange={this.handleChange} value={this.state.espanol} placeholder="Español"/>
                    <textarea type="text" name="english" className="materialize-textarea" onChange={this.handleChange} value={this.state.english} placeholder="Inglés"/>
                    <input type="submit" value="Guardar"/>
                </form>
            </div>
        )
    }
}

const Bio = () => {
    return <BioClass/>;
}

export default Bio;