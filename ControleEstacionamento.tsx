import React from 'react';
import { View, TextInput, Text, Button, AsyncStorage, AsyncStorageStatic } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Expo from 'expo';
import { LocalNotification } from 'expo/build/Notifications/Notifications.types';
import { taskName } from './App';

interface ControleEstacionamentoState {
    saldo: number;
    saldoTemp: string;
    valor: number;
    valorTemp: string;
    permNotifications: boolean;
}

export enum PersistentStorage {
    saldo = 'saldo',
    valor = 'valor'
}

const setContainerStyle = {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 200
};

const inputStyle = {
    borderColor: '#555',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3
};

const saldoStyle = {
    fontSize: 70
};

const inputContainerStyle = {
    width: 200,
    height: 40,
    marginRight: 10
};

const buttonContainerStyle = {
    width: 80,
    height: 40
};

export default class ControleEstacionamento extends React.Component {
    state: ControleEstacionamentoState;
    asyncStorage: AsyncStorageStatic;
    expoPermissions: any;

    constructor(props) {
        super(props);
        this.asyncStorage = AsyncStorage;
        this.state = {
            saldo: 90,
            saldoTemp: `90`,
            valor: 4.5,
            valorTemp: `4.5`,
            permNotifications: false
        };
        this.asyncStorage.getItem(PersistentStorage.saldo, this.saveSaldo.bind(this));
        this.asyncStorage.getItem(PersistentStorage.valor, this.saveValor.bind(this));
        this.askNotifPermissions();
    }

    askNotifPermissions = async () => {
        this.expoPermissions = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (this.expoPermissions.status !== 'granted') {
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    };

    sendNotification = async (title: string, body: string) => {
        const notification: LocalNotification = {
            title: title,
            body: body
        };
        Expo.Notifications.presentLocalNotificationAsync(notification);
    };

    render() {
        return (
            <View>
                <Text>Valor do estacionamento:</Text>
                <View style={setContainerStyle}>
                    <View style={inputContainerStyle}>
                        <TextInput
                            style={inputStyle}
                            value={this.state.valorTemp.toString()}
                            onChangeText={this.setValorTemp.bind(this)}
                        ></TextInput>
                    </View>
                    <View style={buttonContainerStyle}>
                        <Button title='Set' onPress={this.setValor.bind(this)}></Button>
                    </View>
                </View>
                <Text>Forçar saldo atual no cartão:</Text>
                <View style={setContainerStyle}>
                    <View style={inputContainerStyle}>
                        <TextInput
                            style={inputStyle}
                            value={this.state.saldoTemp.toString()}
                            onChangeText={this.setSaldoTemp.bind(this)}
                        ></TextInput>
                    </View>
                    <View style={buttonContainerStyle}>
                        <Button title='Set' onPress={this.setSaldo.bind(this)}></Button>
                    </View>
                </View>
                <Text>Valor da diaria:</Text>
                <Text>{this.state.valor}</Text>
                <Text>Saldo atual:</Text>
                <Text style={saldoStyle}>{this.state.saldo}</Text>
                <Button title='-' onPress={this.decreaseSaldo.bind(this)}></Button>
            </View>
        );
    }

    setSaldo() {
        this.asyncStorage.setItem(PersistentStorage.saldo, this.state.saldoTemp, this.errorFunc);
        this.sendNotification('Controle Estacionamento', 'Saldo salvo.');
        this.setState((previousState) => {
            return {
                ...previousState,
                saldo: Number(this.state.saldoTemp)
            };
        });
    }

    setValor() {
        this.asyncStorage.setItem(PersistentStorage.valor, this.state.valorTemp, this.errorFunc);
        this.sendNotification('Controle Estacionamento', 'Valor salvo.');
        this.setState((previousState) => {
            return {
                ...previousState,
                valor: Number(this.state.valorTemp)
            };
        });
    }

    setSaldoTemp(text: string) {
        this.setState((previousState) => {
            return {
                ...previousState,
                saldoTemp: text
            };
        });
    }

    setValorTemp(text: string) {
        this.setState((previousState) => {
            return {
                ...previousState,
                valorTemp: text
            };
        });
    }

    decreaseSaldo() {
        if (this.state.saldo >= this.state.valor) {
            this.setState((previousState) => {
                return {
                    ...previousState,
                    saldo: this.state.saldo - this.state.valor
                };
            });
        }
        this.asyncStorage.setItem(PersistentStorage.saldo, this.state.saldo.toString(), this.errorFunc);
    }

    errorFunc(error) {
        if (error) {
            console.log(error);
        }
    }

    saveValor(error, result) {
        if (!error && result) {
            this.setState((previousState) => {
                return {
                    ...previousState,
                    valor: Number(result)
                };
            });
        } else if (result === null) {
            this.asyncStorage.setItem(PersistentStorage.valor, this.state.valor.toString(), this.errorFunc);
        }
    }

    saveSaldo(error, result) {
        if (!error && result) {
            this.setState((previousState) => {
                return {
                    ...previousState,
                    saldo: Number(result)
                };
            });
        } else if (result === null) {
            this.asyncStorage.setItem(PersistentStorage.saldo, this.state.saldo.toString(), this.errorFunc);
        }
    }
}
