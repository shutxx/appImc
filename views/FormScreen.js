import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, Alert } from "react-native";
import { Button } from '@rneui/themed';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../config/firebaseconfig';


export default function FormScreen({ navigation, route }) {
    let editPessoa = route.params ? true : false;
    const [pessoa, setPessoa] = useState(route.params ? route.params : {});

    useEffect(() => {
        const calcImc = () => {
            if (pessoa.peso && pessoa.altura) {
                const imc = (parseFloat(pessoa.peso) / (parseFloat(pessoa.altura) * parseFloat(pessoa.altura))).toFixed(2);
                setPessoa((prevPessoa) => ({ ...prevPessoa, imc }));
            } else {
                setPessoa((prevPessoa) => ({ ...prevPessoa, imc: null }));
            }
        };

        calcImc();
    }, [pessoa.peso, pessoa.altura]);

    function setTitulo() {
        if (editPessoa == true) {
            return (
                <View style={style.conteinerTitulo}>
                    <Text style={style.conteinerTitulo}>Alterar Dados</Text>
                </View>
            )
        } else {
            return (
                <View style={style.conteinerTitulo}>
                    <Text style={style.conteinerTitulo}>Dados</Text>
                </View>
            )
        }
    }

    const coloImc = () => {
        const imcValue = parseFloat(pessoa.imc);

        if (isNaN(imcValue)) {
            return (
                <View style={style.imc}>
                    <Text style={style.imcText}>IMC</Text>
                </View>
            )
        }

        let grau = '';
        let risco = '';

        if (imcValue <= 18.5) {
            grau = 'Abaixo do peso';
            risco = 'Baixo risco de problemas de saúde';
        } else if (imcValue <= 24.9) {
            grau = 'Peso normal';
            risco = 'Risco médio de problemas de saúde';
        } else if (imcValue <= 29.9) {
            grau = 'Sobrepeso';
            risco = 'Risco elevado de problemas de saúde';
        } else if (imcValue <= 34.9) {
            grau = 'Obesidade Grau I';
            risco = 'Risco muito elevado de problemas de saúde';
        } else if (imcValue <= 39.9) {
            grau = 'Obesidade Grau II';
            risco = 'Risco extremamente elevado de problemas de saúde';
        } else {
            grau = 'Obesidade Grau III';
            risco = 'Risco extremamente elevado de problemas de saúde';
        }

        return (
            <View style={style.imc}>
                <Text style={style.textImc}>IMC: {pessoa.imc}</Text>
                <Text style={style.imcText}>Grau: {grau}</Text>
                <Text style={style.imcText}>Risco: {risco}</Text>
            </View>
        );
    };

    const gerenciar = async () => {
        if (pessoa.cidade && pessoa.altura && pessoa.idade && pessoa.peso && pessoa.imc && pessoa.nome && pessoa.sexo) {
            try {
                if (editPessoa) {
                    await updateDoc(doc(db, 'PessoaImc', pessoa.id), {
                        nome: pessoa.nome,
                        sexo: pessoa.sexo,
                        cidade: pessoa.cidade,
                        altura: pessoa.altura,
                        idade: pessoa.idade,
                        peso: pessoa.peso,
                        imc: pessoa.imc,
                    });
                } else {
                    await addDoc(collection(db, 'PessoaImc'), {
                        nome: pessoa.nome,
                        sexo: pessoa.sexo,
                        cidade: pessoa.cidade,
                        altura: pessoa.altura,
                        idade: pessoa.idade,
                        peso: pessoa.peso,
                        imc: pessoa.imc,
                    });
                }

                Alert.alert('Sucesso', 'Operação concluída com sucesso');
                navigation.navigate('ListScreen');
            } catch (error) {
                Alert.alert('Erro', `Erro ao realizar a operação: ${error}`);
            }
        } else {
            Alert.alert('Erro', 'Preencha todos os campos');
        }
    };

    const clearInput = () => {
        setPessoa({});
        navigation.navigate('ListScreen');
    };

    return (
        <View>
            <View>
                {setTitulo()}
                <View>
                    <Text style={style.text}>Nome</Text>
                    <TextInput
                        value={pessoa.nome}
                        style={style.input}
                        placeholder="Informe sua cidade"
                        onChangeText={(nome) => setPessoa({ ...pessoa, nome })}
                    />

                    <Text style={style.text}>Idade</Text>
                    <TextInput
                        value={pessoa.idade}
                        style={style.input}
                        placeholder="Informe sua idade"
                        onChangeText={(idade) => setPessoa({ ...pessoa, idade })}
                        keyboardType="numeric"
                    />

                    <Text style={style.text}>Cidade</Text>
                    <TextInput
                        value={pessoa.cidade}
                        style={style.input}
                        placeholder="Informe sua cidade"
                        onChangeText={(cidade) => setPessoa({ ...pessoa, cidade })}
                    />

                    <Text style={style.text}>Altura</Text>
                    <TextInput
                        value={pessoa.altura}
                        style={style.input}
                        placeholder="Informe sua altura"
                        onChangeText={(altura) => setPessoa({ ...pessoa, altura })}
                        keyboardType="numeric"
                    />

                    <Text style={style.text}>Peso</Text>
                    <TextInput
                        value={pessoa.peso}
                        style={style.input}
                        placeholder="Informe seu peso"
                        onChangeText={(peso) => setPessoa({ ...pessoa, peso })}
                        keyboardType="numeric"
                    />

                    <Text style={style.text}>Sexo</Text>
                    <TextInput
                        value={pessoa.sexo}
                        style={style.input}
                        placeholder="Informe seu sexo"
                        onChangeText={(sexo) => setPessoa({ ...pessoa, sexo })}
                    />
                </View>

                <View>
                    {coloImc()}
                </View>

                <View style={style.containerActions}>
                    <Button
                        title="Salvar"
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
                        onPress={() => gerenciar()}
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
                        onPress={() => clearInput()}
                    />
                </View>
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    input: {
        fontSize: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    text: {
        fontSize: 20,
        paddingLeft: 15,
    },
    conteinerTitulo: {
        marginTop: 10,
        alignItems: 'center',
        fontSize: 30,
    },
    containerActions: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        position: 'bottom'
    },
    imc: {
        marginTop: 5,
        alignItems: 'center',
        fontSize: 30,
    },
    imcText: {
        fontSize: 18,
    },
    textImc: {
        fontSize: 30,
    },
    container: {
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
    },
})