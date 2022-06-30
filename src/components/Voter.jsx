import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:8080/";
//candidato
class Voter extends Component {
  state={
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        id: '',
        nombre: '',
        apellido: '',
        dni: '',
        lugar_votacion: '',
        candidato_voto: ''
       
      }
    }
    //candidato
    peticionGet=()=>{
      axios.get(url+"votantes").then(response=>{ this.setState({data: response.data});}).catch(error=>{
        console.log(error.message);
      })
    }
    
    peticionPost=async()=>{
      delete this.state.form.id;
      await axios.post(url+"votantes/create",this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      }).catch(error=>{
        console.log(error.message +"ERRORRRRRRR?");
      })
    }
    
    peticionPut=()=>{
      axios.put(url+"votantes/update/"+this.state.form.id, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      })
    }
    
    peticionDelete=()=>{
      axios.delete(url+"votantes/delete/"+this.state.form.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
      })
    }
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    seleccionarVotante=(votante)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          id: votante.id,
          nombre: votante.nombre,
          apellido: votante.apellido,
          lugar_votacion:votante.lugar_votacion,
          candidato_voto: votante.candidato_voto
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
        <br /><br />
      <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Votante</button>
      <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Lugar de Votacion</th>
              <th>Numero de Votacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
  //lugar_votacion
              (this.state.data || []).map(votante=>{
              return(
              <tr key={votante.id}>
              <td>{votante.id}</td>
              <td>{votante.nombre}</td>
              <td>{votante.apellido}</td>
              <td>{votante.dni}</td>
              <td>{votante.lugar_votacion}</td>
              <td>{votante.candidato_voto}</td>
              <td>
                    <button className="btn btn-primary" onClick={()=>{this.seleccionarVotante(votante); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarVotante(votante); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                        <input className="form-control" type="hidden" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: 1 }/>
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
                        <label htmlFor="lugar_votacion">Numero de Votacion</label>
                        <input className="form-control" type="text" name="lugar_votacion" id="lugar_votacion" onChange={this.handleChange} value={form?form.lugar_votacion:''}/>
                        <br />
                        <label htmlFor="candidato_voto">Numero de Votacion</label>
                        <input className="form-control" type="text" name="candidato_voto" id="candidato_voto" onChange={this.handleChange} value={form?form.candidato_voto:''}/>
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
              Estás seguro que deseas eliminar a la votante {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
          </ModalFooter>
        </Modal>
      </div>
  
  
  
      );
    }
  }
export default Voter;