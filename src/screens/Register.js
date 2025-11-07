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
      if (!this.state.userName) {
        alert("Completá todos los campos");
      } else if (this.state.password.length <= 5) {
        alert("La contraseña debe tener 6 o más caracteres");
      } else if (!this.state.email.includes('@')) {
        alert("El email debe contener un '@'");
      } else {
        this.register(this.state.email, this.state.password, this.state.userName);
      }  
    };

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
          alert(error.message);
          console.log(error);
        });
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
        <Text>Email:</Text>
        <TextInput style={styles.input} keyboardType='email-address' placeholder='email' onChangeText={ text => this.setState({email:text}) } value={this.state.email} />
        
        <Text>Nombre de usuario:</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='usuario' onChangeText={ text => this.setState({userName:text}) } value={this.state.userName}/>

        <Text>Contraseña:</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='password' secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) } value={this.state.password}/> 

        <Pressable onPress={this.onSubmit} style={styles.register}>
            <Text>Registrarse</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Login')} style={styles.login}>
            <Text>Ya tenes una cuenta? Inicia sesion!</Text>
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
  login: {
    alignItems: 'center',
    textDecorationLine: "underline",
  },
  register: {
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
}) 