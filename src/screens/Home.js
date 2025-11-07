import { Text, View, StyleSheet, FlatList} from 'react-native';
import React, { Component } from 'react';
import Post from '../components/Post';
import {db} from '../firebase/config'

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posteos = []
        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posts: posteos,
          loading: false
        })
      }
    )
  }

  render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>Home</Text>
        <Text>posteos</Text>

        {this.state.loading ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList data={this.state.posts} keyExtractor={item => item.id}
            renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={this.props.navigation}/>}
          />
        )}
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
    general: {
        flex: 1,
        margin: 15
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
   }
}) 