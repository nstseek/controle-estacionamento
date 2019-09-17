import React from 'react';
import { View, TextInput, Text, Button, AsyncStorage, AsyncStorageStatic } from 'react-native';
import Styles from './ControleEstacionamento.styles';
import { Screens, PersistentStorage } from '../types';

interface ControleEstacionamentoState {
    saldo: number;
    saldoTemp: string;
    valor: number;
    valorTemp: string;
    ready: boolean;
}

interface ControleEstacionamentoProps {
    setTela(tela: Screens): any;
}

export default class ControleEstacionamento extends React.Component<
    ControleEstacionamentoProps,
    ControleEstacionamentoState
> {
    asyncStorage: AsyncStorageStatic;
    hisStackSize: number;

    constructor(props: ControleEstacionamentoProps) {
        super(props);
        this.asyncStorage = AsyncStorage;
        this.hisStackSize = -1;
        this.state = {
            saldo: 90,
            saldoTemp: `90`,
            valor: 4.5,
            valorTemp: `4.5`,
            ready: false
        };
        this.getDataFromStorage();
    }

    render() {
        return (
            <View>
                <Text>Valor do estacionamento:</Text>
                <View style={Styles.setContainerStyle}>
                    <View style={Styles.inputContainerStyle}>
                        <TextInput
                            style={Styles.inputStyle}
                            value={this.state.valorTemp.toString()}
                            onChangeText={this.setValorTemp.bind(this)}
                        ></TextInput>
                    </View>
                    <View style={Styles.buttonContainerStyle}>
                        <Button title='Set' onPress={this.setValor.bind(this)}></Button>
                    </View>
                </View>
                <Text>Forçar saldo atual no cartão:</Text>
                <View style={Styles.setContainerStyle}>
                    <View style={Styles.inputContainerStyle}>
                        <TextInput
                            style={Styles.inputStyle}
                            value={this.state.saldoTemp.toString()}
                            onChangeText={this.setSaldoTemp.bind(this)}
                        ></TextInput>
                    </View>
                    <View style={Styles.buttonContainerStyle}>
                        <Button title='Set' onPress={this.setSaldo.bind(this)}></Button>
                    </View>
                </View>
                <Text>Valor da diaria:</Text>
                <Text>{this.state.valor}</Text>
                <Text>Saldo atual:</Text>
                <Text style={Styles.saldoStyle}>{this.state.saldo}</Text>
                <View style={Styles.button}>
                    <Button title='Subtrair' disabled={!this.state.ready} onPress={this.decreaseSaldo.bind(this)} />
                </View>
                <View style={Styles.button}>
                    <Button
                        title='Ver histórico'
                        disabled={!this.state.ready}
                        onPress={() => this.props.setTela(Screens.HISTORICO_ESTACIONAMENTO)}
                    />
                </View>
            </View>
        );
    }

    getDataFromStorage = async () => {
        const saldo = await this.asyncStorage.getItem(PersistentStorage.saldo);
        const valor = await this.asyncStorage.getItem(PersistentStorage.valor);
        const hisStackSize = await this.asyncStorage.getItem(PersistentStorage.historicoStackSize);
        this.hisStackSize = hisStackSize ? Number(hisStackSize) : this.hisStackSize;
        this.setState((previousState) => ({
            ...previousState,
            valor: valor ? Number(valor) : previousState.valor,
            saldo: saldo ? Number(saldo) : previousState.saldo,
            ready: true
        }));
    };

    getHistoricoKey = (write: boolean) => PersistentStorage.historicoStack + (this.hisStackSize + (write ? 1 : 0));
    // se o stackSize for < 0, n pode ler pq n existe stack negativo ne
    // se for escrever, passa true como parametro e false caso va ler

    updateStackSize = (): Promise<null> =>
        new Promise(async (resolve) => {
            this.hisStackSize = this.hisStackSize + 1;
            await this.asyncStorage.setItem(
                PersistentStorage.historicoStackSize,
                this.hisStackSize.toString(),
                this.errorFunc
            );
            resolve(null);
        });

    writeToStack = (data: string): Promise<null> =>
        new Promise(async (resolve) => {
            await this.asyncStorage.setItem(this.getHistoricoKey(true), data, this.errorFunc);
            await this.updateStackSize();
            resolve(null);
        });

    formatDate = (date: Date) =>
        `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${
            date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        }/${date.getFullYear()}`;

    formatTime = (date: Date) =>
        `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        }:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;

    setSaldo = async () => {
        await this.asyncStorage.setItem(PersistentStorage.saldo, this.state.saldoTemp, this.errorFunc);
        const date = new Date();
        await this.writeToStack(`${this.formatDate(date)}|Saldo - ${this.state.saldoTemp}|${this.formatTime(date)}`);
        this.setState((previousState) => {
            return {
                ...previousState,
                saldo: Number(this.state.saldoTemp)
            };
        });
    };

    setValor = async () => {
        this.asyncStorage.setItem(PersistentStorage.valor, this.state.valorTemp, this.errorFunc);
        const date = new Date();
        await this.writeToStack(`${this.formatDate(date)}|Valor - ${this.state.valorTemp}|${this.formatTime(date)}`);
        this.setState((previousState) => {
            return {
                ...previousState,
                valor: Number(this.state.valorTemp)
            };
        });
    };

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

    decreaseSaldo = async () => {
        if (this.state.saldo >= this.state.valor) {
            const date = new Date();
            await this.asyncStorage.setItem(
                PersistentStorage.saldo,
                (this.state.saldo - this.state.valor).toString(),
                this.errorFunc
            );
            await this.writeToStack(`${this.formatDate(date)}|Decrease - ${this.state.valor}|${this.formatTime(date)}`);
            this.setState((previousState) => {
                return {
                    ...previousState,
                    saldo: this.state.saldo - this.state.valor
                };
            });
        }
    };

    errorFunc(error) {
        if (error) {
            throw new Error(error);
        }
    }
}
