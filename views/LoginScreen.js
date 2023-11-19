import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from '@rneui/themed';
import Logo from '../components/Logo';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');

  const Login = () => {
    const auth = getAuth();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate('HomeLogin')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert('Erro de autenticação', 'Email ou senha errados')
        });
    } else {
      Alert.alert('Erro de autenticação', 'Informe usuário e senha')
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={email}
        onChangeText={(val) => { setEmail(val.trim()) }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={(val) => { setSenha(val) }}
      />
      <Button
        title="Login"
        buttonStyle={{
          backgroundColor: '#4682B4',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={Login}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
  },
  title: {
    fontSize: 30,
    marginVertical: 2,
    padding: 20,
    fontWeight: 'bold',
  },
});
