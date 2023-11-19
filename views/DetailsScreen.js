import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';

export default function DetailsScreen(props) {
    const [pessoa, setPessoa] = useState(
        props.route.params ? props.route.params : {}
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textoPadrao}>Nome: {pessoa.nome}</Text>
            <Text style={styles.textoPadrao}>Cidade: {pessoa.cidade}</Text>
            <Text style={styles.textoPadrao}>Idade: {pessoa.idade}</Text>
            <Text style={styles.textoPadrao}>Altura: {pessoa.altura}</Text>
            <Text style={styles.textoPadrao}>Peso: {pessoa.peso}</Text>
            <Text style={styles.textoPadrao}>IMC: {pessoa.imc}</Text>
            <Text style={styles.textoPadrao}>Sexo: {pessoa.sexo}</Text>
            <View style={styles.containerActions}>
                <Button
                    title="Editar"
                    buttonStyle={{
                        backgroundColor: 'green',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 150,
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => props.navigation.navigate('FormScreen', pessoa)}
                />
                <Button
                    title="Cancelar"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 150,
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    textoPadrao: {
        fontSize: 20,
        padding: 10,
    },
    textoDestaque: {
        fontWeight: "bold",
    },
    botao: {
        margin: 10,
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 10,
    }, 
    containerActions: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 50,
        position: 'bottom'
    },
});