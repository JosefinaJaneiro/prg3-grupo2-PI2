import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export class Comentario extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          postId: this.props.route.params.postId,
          comment: '',
          comments: [],
          post: null
        };
    }
    componentDidMount() {
        db.collection('posts')
          .doc(this.state.postId)
          .onSnapshot(doc => {
              this.setState({ 
                comments: doc.data().comments || [],
                post: {
                    owner: doc.data().owner, 
                    mensaje: doc.data().mensaje
                } 
            });
            });
    }

    addComment() {
        if (this.state.comment.length === 0){
            alert('El comentario no puede estar vacío');
            return;
        }
        db.collection('posts')
        .doc(this.state.postId)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            mensaje: this.state.comment,
            createdAt: Date.now(),
            }),
        })
        .then(() => this.setState({ comment: '' }))
        .catch(e => console.log(e));
    }


  render() {
    return (
        <View style={styles.container}>
        {this.state.post && (
        <View style={styles.postContainer}>
            <Text style={styles.postOwner}>{this.state.post.owner}</Text>
            <Text style={styles.postMensaje}>{this.state.post.mensaje}</Text>
        </View>
        )}
        <FlatList data={this.state.comments} keyExtractor={(item, idx) => idx.toString()} renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentOwner}>{item.owner}</Text>
              <Text style={styles.commentText}>{item.mensaje}</Text>
            </View>
          )}
        />

        <TextInput placeholder="Deja tu comentario!" value={this.state.comment} onChangeText={text => this.setState({ comment: text })} style={styles.input}/>

        <Pressable style={styles.button} onPress={() => this.addComment()}>
          <Text style={styles.buttonText}>Enviar comentario</Text>
        </Pressable>
      </View>
    )
  }
}

export default Comentario

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff',
    },
    postContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    postOwner: { 
        fontWeight: 'bold', 
        marginBottom: 5 
    },
    postMensaje: { 
        fontSize: 16 
    },
    commentItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 8,
    },
    commentOwner: {
      fontWeight: 'bold',
    },
    commentText: {
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
    },
    button: {
      backgroundColor: 'lightblue',
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
  });