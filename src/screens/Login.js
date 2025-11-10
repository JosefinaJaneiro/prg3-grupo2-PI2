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
         alert('Email o contraseña inválidos');
       })
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.navigate('HomeMenu');
        }
      });
    }

    render() {
    return (
      <View style={styles.general}>
        <Text style={styles.titulo}>Login</Text>
        <Text>Email:</Text>
        <TextInput style={styles.input} keyboardType='email-address' placeholder='email' onChangeText={ text => this.setState({email:text}) } value={this.state.email} />
        <Text>Contraseña:</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='password' secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) } value={this.state.password}/> 
        <Pressable onPress={this.onSubmit} style={styles.login}>
            <Text> Iniciar sesion </Text> 
        </Pressable> 
        <Pressable onPress={() => this.props.navigation.navigate('Register')} style={styles.register}>
            <Text>No tenes una cuenta? Registrate!</Text>
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
  register: {
    alignItems: 'center',
    textDecorationLine: "underline",
  },
  login: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "lightblue",
    alignItems: 'center',
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
  titulo:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25

  }
}) 
