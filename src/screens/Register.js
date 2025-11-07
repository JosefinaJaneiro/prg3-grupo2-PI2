import { Text, View, Pressable, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-web'
import {db, auth} from '../firebase/config'

export class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            userName: "",
            registered: false,
        }
    }

    onSubmit = () => {
        if ((this.state.password.length <= 5) && (!this.state.email.includes('@'))) {
            alert("La contraseña debe tener más de 5 caracteres");
            console.log("La contraseña debe tener más de 5 caracteres")
            alert("El email debe contener un '@'");
            console.log("El email debe contener un '@'")
        }else {
            this.register(this.state.email, this.state.password, this.state.userName)
        } 
    }

    register(email, pass, userName){
      auth.createUserWithEmailAndPassword(email, pass)
        .then(response => {
          db.collection('users').add({
            email: email,
            userName: userName,
            createdAt: Date.now()
          })
          .then(() => {
            this.setState({ registered: true });
            this.props.navigation.navigate('Login');
          })
          .catch(error => {
            console.log(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
/* 
rnce: componentes con estados
rnfe: componentes sin estado
*/

  render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>Register</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Login')} style={styles.boton1}>
            <Text>Ir al Login</Text>
        </Pressable>
        <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')} style={styles.boton2}>
            <Text>Ir al HOME</Text>
        </Pressable>

        <TextInput style={styles.input} keyboardType='email-address' placeholder='email' onChangeText={ text => this.setState({email:text}) } value={this.state.email} />
        <TextInput style={styles.input} keyboardType='default' placeholder='password' secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) } value={this.state.password}/> 
        <TextInput style={styles.input} keyboardType='default' placeholder='userName' onChangeText={ text => this.setState({userName:text}) } value={this.state.userName}/>
        <Pressable onPress={this.onSubmit} style={styles.boton3}>
            <Text style={styles.textoBoton}> Register </Text> 
        </Pressable> 

      </View>
    )
  }
}


export default Register

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
   boton1: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: "lightblue",
    marginBottom: 15
   },
   boton2: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: "orange",
    marginBottom: 15
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
  },
  boton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
    marginVertical: 5,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
}) 