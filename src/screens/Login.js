import { Text, View, Pressable, StyleSheet, TextInput} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            loggedIn: false
        }
    }

    onSubmit = () => {
      if (!this.state.email.includes('@')) {
        alert("Email mal formateado")
      }
      if (this.state.password.length < 6) {
        alert("La password debe tener una longitud mínima de 6 caracteres")
      }
      this.login(this.state.email, this.state.password)
    }

    login(email, pass){
      auth.signInWithEmailAndPassword(email, pass)
       .then((response) => {
           this.setState({loggedIn: true});
           this.props.navigation.navigate('HomeMenu')
       })
       .catch(error => {
         console.log(error)
         alert('El email o la contrasena son incorrectos')
       })
    }
   
    // componentDidMount(){
    //   auth.onAuthStateChanged( user => {
    //       if (user) {
    //         console.log('user')
    //         this.props.navigation.navigate('HomeMenu')
    //       }
    //     })
    //   }

    render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>Login</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Register')} style={styles.boton1}>
            <Text>Ir al Register</Text>
        </Pressable>
        <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')} style={styles.boton2}>
            <Text>Ir al HOME</Text>
        </Pressable>
        <TextInput style={styles.input} keyboardType='email-address' placeholder='email' onChangeText={ text => this.setState({email:text}) } value={this.state.email} />
        <TextInput style={styles.input} keyboardType='default' placeholder='password' secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) } value={this.state.password}/> 
        <Pressable onPress={this.onSubmit} style={styles.boton3}>
            <Text style={styles.textoBoton}> Login </Text> 
        </Pressable> 

      </View>

      
    )
  }
}

export default Login


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
