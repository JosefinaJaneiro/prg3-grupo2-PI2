import { View, Text, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import { Pressable } from 'react-native-web'
import firebase from 'firebase'

export class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      likeado: false
    }
  }

  componentDidMount(){
    let usuarioActual = firebase.auth().currentUser.email
    if (this.props.data.likes && this.props.data.likes.includes(usuarioActual)) {
    this.setState({
      likeado: true
    });
  }
  }

  likear(){
    db.collection('posts')
      .doc(this.props.id) 
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => this.setState({ likeado: true }))
      .catch(e => console.log(e))
  }

  quitarLike(){
    db.collection('posts')
      .doc(this.props.id) 
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => this.setState({ likeado: false }))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>{this.props.data.owner}</Text>
        
        
        <Text style={styles.mensajes}>{this.props.data.mensaje}</Text>
        <Text>likes: {this.props.data.likes ? this.props.data.likes.length : 0}</Text>
        {this.state.likeado ? (
          <Pressable onPress={() => this.quitarLike()} style={styles.botonQuitar}>
            <Text>Quitar Like</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => this.likear()} style={styles.botonLike}>
            <Text>Like</Text>
          </Pressable>
        )}
        <Pressable onPress={() => this.props.navigation.navigate('Comentarios', { postId: this.props.id })}>
          <Text style={styles.comentar}>Comentar</Text>
          <Text style={styles.fecha}>Creado en: {new Date(this.props.data.createdAt).toLocaleString()}</Text>
        </Pressable>
      </View>
    )
  }
}

export default Post

const styles = StyleSheet.create({
  general: {
      flex: 1,
      margin: 15,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10
  },
  titulo: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  botonLike: {
    backgroundColor: 'lightgreen',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: 'center'
  },
  botonQuitar: {
    backgroundColor: 'lightcoral',
    padding: 8,
    borderRadius: 6,
    marginTop: 5,
    alignItems: 'center'
  },
  comentar:{
    paddingTop: 7,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  mensajes: {
    fontSize: 17,
    paddingBottom: 7
  },
  fecha:{
    paddingTop: 10
  }
})
