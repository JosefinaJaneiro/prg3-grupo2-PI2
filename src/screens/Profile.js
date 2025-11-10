import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        userName: '',
        posts: [],
      };
    }
    componentDidMount() {
        const user = auth.currentUser;
    
        if (user) {
            this.setState({ email: user.email });
            db.collection('users')
                .where('email', '==', user.email)
                .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.setState({ userName: doc.data().userName });
                });
            });
            db.collection('posts')
                .where('owner', '==', user.email)
                //.orderBy('createdAt', 'desc')
                .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({ id: doc.id, data: doc.data() });
                });
                this.setState({ posts });
            });
        }
    }

    borrarPost(id) {
        db.collection('posts').doc(id).delete()
        .then(() => {
            const nuevosPosts = this.state.posts.filter(post => post.id !== id);
            this.setState({ posts: nuevosPosts });
        })
        .catch(err => console.log(err));
    }

    logout() {
        auth.signOut()
          .then(() => this.props.navigation.navigate('Login'))
          .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.general}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                <View style={styles.container}>
                  <Text style={styles.nombre}>{this.state.userName}</Text>
                  <Text>{this.state.email}</Text>
                </View>
                <Text style={styles.subtitulo}>Últimos posteos:</Text>

                {this.state.posts.length == 0 ? 
                <Text>No tenes posteos!</Text> :
                <FlatList data={this.state.posts} keyExtractor={item => item.id} renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text>{item.data.mensaje}</Text>
                        <Pressable onPress={() => this.borrarPost(item.id)} style={styles.botonBorrar}>
                            <Text style={styles.textoBoton}>Borrar</Text>
                        </Pressable>
                    </View>
                )}
                />
                }

                <Pressable onPress={() => this.logout()} style={styles.botonLogout}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
                </Pressable>
                
            </View>
    );
  }    
}

export default Profile;

const styles = StyleSheet.create({
    general: {
      flex: 1,
      margin: 15,
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    subtitulo: {
      fontSize: 20,
      marginTop: 15,
      marginBottom: 5,
      paddingTop: 10
    },
    postContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    botonBorrar: {
      marginTop: 5,
      backgroundColor: 'tomato',
      padding: 5,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    botonLogout: {
      marginTop: 20,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: 'lightblue',
    },
    textoBoton: {
      color: 'white',
      fontWeight: 'bold',
    },
    nombre:{
      fontWeight: 'bold',
      fontSize: 17,
      paddingBottom: 4,
    },
    container: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    
    },
  });