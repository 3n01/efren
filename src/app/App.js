import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            description: '',
            image: '',
            images: [],
            _id: '',
            actualImage: [],

        }
        this.guardarImage = this.guardarImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
       
    }


    guardarImage(e){
        //console.log(this.state);

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
                this.setState({ name: '', description: '', _id: '', image: ''});
                this.getImagenesMejor();
            })
            .catch(err => console.log(err))

        }else{
            const formData  = new FormData();   
            formData.append('image', this.state.image);
            formData.append('name', this.state.name);
            formData.append('description', this.state.description)
            
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
            })
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

    getImagenesMejor(){
        fetch('/api/images')
        .then(result => result .json())
        .then(data => { 
            this.setState({ images: []});
            data.result.sort((a,b) => a.sort - b.sort).map( (image, i) => {          
                fetch(`/api/images/img/${image._id}`)
                .then( res => {
                    let _image = {
                        _id:  image._id,
                        name: image.name,
                        description: image.description,
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
        //console.log("componente fue montado")
        //console.log(this.state.images)
    }

    render() {
        return (
            <div>
                {/**Esto es la navegación */}
                <nav className="light-blue darken-4">
                 <div className="container">
                    <a className="brand-logo" href="/">Administración</a>
                 </div>
               </nav>
               <div className="container">
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
                                        <th>Imagen</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                               </thead>
                               <tbody>
                                    {this.state.images.map( (image, index) => {
                                        console.log("Loop",image)
                                        return(
                                            <tr key={image._id}>                                    
                                                <td>{image.name}</td>
                                                <td>{image.description}</td>
                                                <td><img src={image.imageFile.url} width="100px" height="100px"/></td>
                                                <td>
                                                   <button onClick={ () => this.editImagen(image._id)} className="btn light-blue darken-4"><i className="material-icons">edit</i></button>
                                                   <button onClick={ () => this.deleteImagen(image._id)} className="btn light-blue darken-4" style={ {margin: '4px'}}><i className="material-icons">delete</i></button>
                                                </td>
                                                <td>
                                                    <button value={image.sort} onClick={() => this.changeSort(image, -1)} className="btn light-blue darken-4"><i className="material-icons">keyboard_arrow_up</i></button>
                                                    <button value={image.sort} onClick={() => this.changeSort(image, 1)} className="btn light-blue darken-4" style={ {margin: '4px'}}><i className="material-icons" >keyboard_arrow_down</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default App;