import { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { ListItem, Button, Icon } from '@rneui/themed';
import { db } from '../config/firebaseconfig';

export default function ListImc({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const realTime = onSnapshot(collection(db, "PessoaImc"), (snapshot) => {
      const dataList = [];
      snapshot.forEach((doc) => {
        dataList.push({ id: doc.id, ...doc.data() });
      });
      setData(dataList);
    });

    return () => realTime();
  }, []);

  function confirmUserDeletion(item) {
    Alert.alert('Excluir Dado', 'Deseja realmente excluir?', [
      {
        text: 'Sim',
        onPress() {
          deleteDoc(doc(db, "PessoaImc", item.id));
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  function getItens({ item: item }) {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Nome: {item.nome}</ListItem.Title>
          <ListItem.Subtitle>Cidade: {item.cidade}</ListItem.Subtitle>
          <ListItem.Subtitle>IMC: {item.imc}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(item)}
      </ListItem>
    );
  }

  function getActions(item) {
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('DetailsScreen', item)}
          type="clear"
          icon={<Icon name="edit" size={25} color="#4682B4" />}
        />
        <Button
          onPress={() => confirmUserDeletion(item)}
          type="clear"
          icon={<Icon name="delete" size={25} color="#e62e00" />}
        />
      </View>
    );
  }


  return (
    <View>
      <View style={styles.titulo}>
        <Text style={styles.titulo}>Lista De pessoas</Text>
        <Button
          style={styles.titulo}
          onPress={() => confirmUserDeletion(item)}
          type="clear"
          icon={<Icon name="cloud-download" size={25} color="#336699" />}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={getItens}
        contentContainerStyle={{ paddingBottom: 75 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    fontSize: 30,
  }
});