import React, { Component } from 'react';
import '../public/css/style.css';

class ImagesClass extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            description: '',
            m1: null,
            m2: null,
            year: null,
            image: '',
            images: [],
            _id: '',
            tab: 1 // por defecto Carrusel
      

        }
        this.guardarImage = this.guardarImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.comboChange = this.comboChange.bind(this);
       
    }

    //ACTUALIZAR O GUARDAR
    guardarImage(e){
        //console.log(this.state);
        //Actualizar
        if (this.state._id){
            fetch(`/api/images/${this.state._id}`, {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                } ,
                body: JSON.stringify(this.state)
            }).then(result => result.json())
            .then(data => {
                //console.log(data);
                M.toast({html: "Imagen actualizada con exito"});
                this.setState({ name: '', description: '', m1: 0, m2: 0, year: 0, _id: '', image: ''});
                this.getImagenesMejor();
            })
            .catch(err => console.log(err))

        }else{//Guardar
            const formData  = new FormData();   
            formData.append('image', this.state.image);
            formData.append('name', this.state.name);
            formData.append('description', this.state.description);
            formData.append('m1', this.state.m1);
            formData.append('m2', this.state.m2);
            formData.append('year', this.state.year);
            formData.append('tab', this.state.tab);

            fetch('/api/images', {
                method: 'POST',
                body: formData
            }).then(
                result => result.json()
                    .then(data => {
                        //console.log(data);
                        M.toast({html: "Imagen guardada en base de datos"});
                        this.setState({ name: '', description: '',image: ''});
                        this.getImagenesMejor();
                    }) ,
                err => console.log(err)
            );
        }


        e.preventDefault();
    }

    handleChange(e){
        const { name, value } = e.target;
        if (name === 'image'){
            //console.log("handleChange: ", e.target.files[0])
            this.setState({
                image: e.target.files[0]
            })
        }else{
            this.setState({
                [name]:value
            });
            if (name === 'tab'){
                this.getImagenesMejor(value);
            }
        }

    }

    deleteImagen(id){
        if (confirm("Seguro que quieres eliminarlo??")){
            console.log(`Borrando imagen -> ${id}`);
            fetch(`api/images/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(result => result.json())
            .then(data => {
                //console.log(data);
                M.toast({html: "Imagen borrada de base de datos"});
                this.getImagenesMejor();
            })
            .catch(err => console.log(err));
        }

    }

    editImagen(id){
        fetch(`api/images/${id}`,{
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        }).then(result => result.json())
        .then(data => {
            //console.log('Data!!\n',data.result);
            this.setState({
                name: data.result.name,
                description: data.result.description,
                m1: data.result.m1,
                m2: data.result.m2,
                year: data.result.year,
                _id: data.result._id
            })
        })
        .catch(err => console.log(err));
    }

    getImagenes(){
        fetch('/api/images')
        .then(result => result .json())
        .then(data => { 
            //console.log("Retorna: ", data.result);
            this.setState({images: data.result})
            this.setState({actualImage: []})
            this.state.images.map( (image, i) => {          
                fetch(`/api/images/img/${image._id}`)
                .then( res =>{
                    this.setState(prevState => ({
                        actualImage: [...prevState.actualImage, res.url]
                    }))
                })
                .catch(er => console.log("Image error: "+er));
            })
        })
        .catch(err => console.log(err))
    }

    getImagenesMejor(ptab){
        //recuperar todas la imagenes
        //alert(`getImagenesMejor -> ${this.state.tab}`);
        var _tab = ptab || this.state.tab;
        fetch(`/api/images/${_tab}`)
        .then(result => result .json())
        .then(data => { 
            //si ok, limpiar el array de imagenes 
            this.setState({ images: []});
            //e iterar, por cada una de ellas recupero el fichero imagen desde express
            data.result.sort((a,b) => a.sort - b.sort).map( (image, i) => {          
                fetch(`/api/images/img/${image._id}`)
                .then( res => {
                    //y si lo recupero ok, se lo meto en el parametro imageFile y guardo el registro en el array
                    let _image = {
                        _id:  image._id,
                        name: image.name,
                        description: image.description,
                        m1: image.m1,
                        m2: image.m2,
                        year: image.year,
                        imageFile: res,
                        sort: image.sort
                    }
                    
                    this.setState(prevState => ({
                        images: [...prevState.images, _image]
                    }))

                    console.log(this.state.images)

                })
                .catch(er => console.log("Recuperando imagen en getImagenesMejor: "+er));
            })
        })
        .catch(err => console.log(err))
    }

    cambiaOrden(array, from, to){
         let item = array.splice(from, 1);
         array.splice(to, 0, item[0]);
    }

    changeSort(image, accion){
        let body = {
            _id: image._id,
            name: image.name,
            description: image.description,
            image: image.image,
            sort: image.sort,
            accion: accion
            
        }
        console.log("changeSort")
        fetch(`/api/images/${image._id}`, {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            } ,
            body: JSON.stringify(body)
        }).then(result => result .json()).then( x => {
            console.log("Acabó de llamar");
            this.getImagenesMejor();
        })
        .catch(err => console.log(err))
        
    }

    componentDidMount(){   
        this.getImagenesMejor();
        console.log("ComponentDidMount state-> ", this.state)
    }

    comboChange(e){
        this.setState({ tab : e.target.value})
    }

    render() {
        return (
               <div className="container">
               <div className="row">
                       <div className="input-field col s12">
                       <select className="browser-default" name="tab" onChange={this.handleChange}>
                        <option defaultValue value="1">Carrusel</option>
                        <option value="2">Pinturas</option>
                        <option value="3">Bio</option>
                        <option value="4">Contacto</option>
                        </select>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col s5">
                           <div className="card">
                               <div className="card-content">
                                   <form onSubmit={this.guardarImage}>
                                       <div className="row">
                                           <div className="input-field col s12" >
                                               <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Nombre"></input>
                                           </div>
                                       </div>
                                       <div className="row">
                                           <div className="input-field col s12" >
                                               <textarea name="description" onChange={this.handleChange} value={this.state.description} className="materialize-textarea" placeholder="Descripción"></textarea>
                                           </div>
                                       </div>
                                       <div className="row">
                                           <div className="input-field col s4" >
                                               <input type="number" name="m1"  onChange={this.handleChange} value={this.state.m1} placeholder="Medida 1"></input>
                                           </div>
                                           <div className="input-field col s4" >
                                               <input type="number"  name="m2" onChange={this.handleChange} value={this.state.m2}  placeholder="Medida 2"></input>
                                           </div>
                                           <div className="input-field col s4" >
                                               <input type="number"  name="year" onChange={this.handleChange} value={this.state.year}  placeholder="Año"></input>
                                           </div>
                                       </div>
                                       <div className="row">
                                           <div className="col s12 file-field input-field">
                                                <div className="btn light-blue darken-4">
                                                    <span>Imagen</span>
                                                    <input id="inputImage"  name="image" onChange={this.handleChange} type="file"/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input  className="file-path validate" type="text" value={this.state.image} onChange={() => {}} />
                                                </div>
                                           </div>

                                       </div>
                                       <div className="row">
                                       <div className="col s12">
                                              <button type="submit" className="btn light-blue darken-4">{this.state._id ? 'EDITAR':'GUARDAR'}</button>
                                           </div>
                                       </div>
                                       
                                   </form>
                               </div>
                           </div>
                       </div>
                       <div className="col s7">
                           <table className="">
                               <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>                                       
                                        <th>M1</th>
                                        <th>M2</th>
                                        <th>Año</th>
                                        <th>Imagen</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                               </thead>
                               <tbody>
                                    {this.state.images.sort((a,b) => a.sort - b.sort).map( (image, index) => {
                                        console.log("Loop",image)
                                        return(
                                            <tr key={image._id}>                                    
                                                <td>{image.name}</td>
                                                <td>{image.description}</td>
                                                <td>{image.m1}</td>
                                                <td>{image.m2}</td>
                                                <td>{image.year}</td>
                                                <td><img src={image.imageFile.url} width="100px" height="100px"/></td>
                                                
                                                <td>
                                                   <button onClick={ () => this.editImagen(image._id)} className="btn light-blue darken-4"><i className="material-icons">edit</i></button></td>
                                                 <td>  <button onClick={ () => this.deleteImagen(image._id)} className="btn light-blue darken-4" style={ {margin: '4px'}}><i className="material-icons">delete</i></button>
                                                </td>
                                                <td>
                                                    <button value={image.sort} onClick={() => this.changeSort(image, -1)} className="btn light-blue darken-4"><i className="material-icons">keyboard_arrow_up</i></button></td>
                                                  <td>  <button value={image.sort} onClick={() => this.changeSort(image, 1)} className="btn light-blue darken-4" style={ { margin: '4px'}}><i className="material-icons" >keyboard_arrow_down</i></button>
                                                </td>
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

const Images = () => {
    return <ImagesClass/>
}

export default Images;