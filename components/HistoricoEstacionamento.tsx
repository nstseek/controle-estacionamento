import React from 'react';
import { Screens, PersistentStorage } from '../types';
import { Button, View, Text, AsyncStorageStatic, AsyncStorage, ScrollView } from 'react-native';
import Styles from './HistoricoEstacionamento.styles';
import { thisTypeAnnotation } from '@babel/types';

interface HistoricoEstacionamentoProps {
    setTela(tela: Screens): any;
}

interface HistoricoEstacionamentoState {
    items: any;
}

export default class HistoricoEstacionamento extends React.Component<
    HistoricoEstacionamentoProps,
    HistoricoEstacionamentoState
> {
    asyncStorage: AsyncStorageStatic;

    constructor(props: HistoricoEstacionamentoProps) {
        super(props);
        this.asyncStorage = AsyncStorage;
        this.state = {
            items: null
        };
    }

    componentDidMount() {
        this.mountItems();
    }

    render() {
        return (
            <View style={Styles.viewContainer}>
                <ScrollView style={Styles.listContainer}>{this.state.items}</ScrollView>
                <View style={Styles.buttonsContainer}>
                    <View style={Styles.buttonContainer}>
                        <Button title='Voltar' onPress={() => this.props.setTela(Screens.CONTROLE_ESTACIONAMENTO)} />
                    </View>
                    <View style={Styles.buttonContainer}>
                        <Button title='Limpar' onPress={this.clearStore} />
                    </View>
                </View>
            </View>
        );
    }

    mountItems = async () => {
        const stackSize = await this.asyncStorage.getItem(PersistentStorage.historicoStackSize, this.errorFunc);
        const stackNumSize = Number(stackSize);
        if (stackNumSize < 0 || !stackNumSize) {
            this.setState((previousState: HistoricoEstacionamentoState) => ({
                ...previousState,
                items: null
            }));
            return;
        }
        const items: any[] = [];
        for (let i = 0; i <= stackNumSize; i++) {
            const item = await this.asyncStorage.getItem(PersistentStorage.historicoStack + i, this.errorFunc);
            const obj = item.split('|');
            items.push(obj);
        }
        let index = -3;
        const itemElements = items.map((item: string[]) => {
            index = index + 4;
            return (
                <View style={Styles.itemContainer} key={index}>
                    <Text style={Styles.itemText} key={index + 1}>
                        {item[0]}
                    </Text>
                    <Text style={Styles.itemText} key={index + 2}>
                        {item[1]}
                    </Text>
                    <Text style={Styles.itemText} key={index + 3}>
                        {item[2]}
                    </Text>
                </View>
            );
        });
        this.setState((previousState: HistoricoEstacionamentoState) => ({
            ...previousState,
            items: itemElements
        }));
    };

    clearStore = async () => {
        const stackSizeStr = await this.asyncStorage.getItem(PersistentStorage.historicoStackSize, this.errorFunc);
        const stackSize = Number(stackSizeStr);
        for (let i = stackSize; i >= 0; i--) {
            await this.asyncStorage.removeItem(PersistentStorage.historicoStack + i);
        }
        await this.asyncStorage.removeItem(PersistentStorage.historicoStackSize, this.errorFunc);
        this.mountItems();
    };

    errorFunc(error) {
        if (error) {
            throw new Error(error);
        }
    }
}
