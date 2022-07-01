import React, { Component }  from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:8080/";

class Candidate extends Component{
state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      nombre: '',
      apellido: '',
      dni: '',
      numero_Votacion: ''
     
    }
  }
  //candidato
  peticionGet=()=>{
    axios.get(url+"candidatos").then(response=>{ this.setState({data: response.data});}).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPost=async()=>{
    delete this.state.form.id;
    await axios.post(url+"candidatos/create",this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message +"ERRORRRRRRR?");
    })
  }
  
  peticionPut=()=>{
    axios.put(url+"candidatos/update/"+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+"candidatos/delete/"+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarCandidato=(candidato)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: candidato.id,
        nombre: candidato.nombre,
        apellido: candidato.apellido,
        numero_votacion: candidato.numero_votacion
      }
    })
  }
  
  handleChange=async e=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }
  
  componentDidMount() {
    this.peticionGet();
  }
    



  render(){
    
    const {form}=this.state;
    return (
      
      <div className="App">
        <div className="scrollbar scrollbar-juicy-peach">
      <br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Candidato</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Numero de Votacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {

            (this.state.data || []).map(candidato=>{
            return(
              <tr key={candidato.id}>
            <td>{candidato.id}</td>
            <td>{candidato.nombre}</td>
            <td>{candidato.apellido}</td>
            <td>{candidato.dni}</td>
            <td>{candidato.numero_votacion}</td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarCandidato(candidato); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarCandidato(candidato); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
            </tr>
            )
          })}
        </tbody>
      </table>



      <Modal isOpen={this.state.modalInsertar}>
                  <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                  </ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      <input className="form-control" type="hidden" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: '' }/>
                      <br />
                      <label htmlFor="nombre">Nombre</label>
                      <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                      <br />
                      <label htmlFor="apellido">Apellido</label>
                      <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form?form.apellido: ''}/>
                      <br />
                      <label htmlFor="dni">DNI</label>
                      <input className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form?form.dni: ''}/>
                      <br />
                      <label htmlFor="numero_votacion">Numero de Votacion</label>
                      <input className="form-control" type="text" name="numero_votacion" id="numero_votacion" onChange={this.handleChange} value={form?form.numero_votacion:''}/>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    {this.state.tipoModal=='insertar'?
                      <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                      Insertar
                    </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                      Actualizar
                    </button>
    }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>
                      Cancelar
                    </button>
                  </ModalFooter>
      </Modal>


      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
            Estás seguro que deseas eliminar a la candidato {form && form.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
          <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
        </ModalFooter>
      </Modal>
    </div>
    </div>


    );
  }
}

export default Candidate;