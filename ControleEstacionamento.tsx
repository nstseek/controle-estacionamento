import React from "react";
import { View, TextInput, Text, Button, AsyncStorage } from "react-native";

interface ControleEstacionamentoState {
    saldo: number,
    saldoTemp: string,
    valor: number,
    valorTemp: string
}

enum PersistentStorage {
    'saldo' = 'saldo',
    'valor' = 'valor'
}

const setContainerStyle = {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 200
}

const inputStyle = {
    borderColor: '#555',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3
}

const saldoStyle = {
    fontSize: 70
}

const inputContainerStyle = {
    width: 200,
    height: 40,
    marginRight: 10
}

const buttonContainerStyle = {
    width: 80,
    height: 40
}

export default class ControleEstacionamento extends React.Component {
    state: ControleEstacionamentoState;

    constructor(props) {
        super(props);
        this.state = {
            saldo: 90,
            saldoTemp: `90`,
            valor: 4.5,
            valorTemp: `4.5`
        };
        AsyncStorage.getItem(PersistentStorage.saldo, (error, result) => {
            if (!error && result) {
                this.setState(previousState => {
                    return ({
                        ...previousState,
                        saldo: Number(result)
                    })
                })
            }
            else if (result === null) {
                AsyncStorage.setItem(PersistentStorage.saldo, this.state.saldo.toString(), error => {
                    console.log(error);
                })
            }
        });
        AsyncStorage.getItem(PersistentStorage.valor, (error, result) => {
            if (!error && result) {
                this.setState(previousState => {
                    return ({
                        ...previousState,
                        valor: Number(result)
                    })
                })
            }
            else if (result === null) {
                AsyncStorage.setItem(PersistentStorage.valor, this.state.valor.toString(), error => {
                    console.log(error);
                })
            }
        })
    }

    render() {
        return (<View>
            <Text>Valor do estacionamento:</Text>
            <View style={setContainerStyle}>
                <View style={inputContainerStyle}>
                    <TextInput style={inputStyle} value={this.state.valorTemp.toString()} onChangeText={this.setValorTemp.bind(this)}></TextInput>
                </View>
                <View style={buttonContainerStyle}>
                    <Button title="Set" onPress={this.setValor.bind(this)}></Button>
                </View>
            </View>
            <Text>Forçar saldo atual no cartão:</Text>
            <View style={setContainerStyle}>
                <View style={inputContainerStyle}>
                    <TextInput style={inputStyle} value={this.state.saldoTemp.toString()} onChangeText={this.setSaldoTemp.bind(this)}></TextInput>
                </View>
                <View style={buttonContainerStyle}>
                    <Button title="Set" onPress={this.setSaldo.bind(this)}></Button>
                </View>
            </View>
            <Text>Valor da diaria:</Text>
            <Text>{this.state.valor}</Text>
            <Text>Saldo atual:</Text>
            <Text style={saldoStyle}>{this.state.saldo}</Text>
            <Button title="-" onPress={this.decreaseSaldo.bind(this)}></Button>
        </View>);
    }

    setSaldo() {
        AsyncStorage.setItem(PersistentStorage.saldo, this.state.saldoTemp, error => {
            console.log(error);
        })
        this.setState(previousState => {
            return ({
                ...previousState,
                saldo: Number(this.state.saldoTemp)
            })
        })
    }

    setValor() {
        AsyncStorage.setItem(PersistentStorage.valor, this.state.valorTemp, error => {
            console.log(error)
        })
        this.setState(previousState => {
            return ({
                ...previousState,
                valor: Number(this.state.valorTemp)
            })
        })
    }

    setSaldoTemp(text: string) {
        this.setState(previousState => {
            return ({
                ...previousState,
                saldoTemp: text
            })

        })
    }

    setValorTemp(text: string) {
        this.setState(previousState => {
            return ({
                ...previousState,
                valorTemp: text
            })

        })
    }

    decreaseSaldo() {
        if (this.state.saldo >= this.state.valor) {
            this.setState(previousState => {
                return ({
                    ...previousState,
                    saldo: (this.state.saldo - this.state.valor)
                })
            })
        }
        AsyncStorage.setItem(PersistentStorage.saldo, this.state.saldo.toString(), error => {
            console.log(error);
        })
    }
}