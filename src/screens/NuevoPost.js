import { Text, View, Pressable, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import { TextInput } from 'react-native-web'

export class NuevoPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mensaje: ""
        }
    }

    crearPost(mensaje){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            mensaje: mensaje,
            createdAt: Date.now(),
            likes: [],
            comments: []
        })
        .then(() => {
            this.setState({ mensaje: "" })
        })
        .catch( e => console.log(e))
    }


  render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>Crear nuevo post</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='escribe aqui...' onChangeText={ text => this.setState({mensaje:text}) } value={this.state.mensaje}/>
        <Pressable onPress={() => this.crearPost(this.state.mensaje)} style={styles.boton3}>  
            <Text style={styles.textoBoton}> Publicar </Text> 
        </Pressable> 
      </View>
    )
  }
}

export default NuevoPost


const styles = StyleSheet.create({
    general: {
        flex: 1,
        margin: 15
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
   },
   boton3: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "grey",
    margin: 20,
   },
   input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  }
}) 

