import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import Logo from '../compo/Logo';


export default function ListaScreen({ navigation }) {

  return (
    <View style={style.container}>

      <View style={style.logo}>
        <Logo />
        <Text style={style.text}>Trabalho Roni</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ flexDirection: 'row', borderColor: 'gray', borderWidth: 1 }}>

          <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate("FormScreen")} color='#336699'>
              <Icon name="add" /> Add
            </Button>
          </View>

          <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate("ListScreen")} color='#336699'>
              <Icon name="list" /> List
            </Button>
          </View>

        </View>

      </View>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logo: {
    flex: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
     margin: 25
  }
});
