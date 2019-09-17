import React from 'react';
import { Screens } from '../types';
import { Button, View, Text } from 'react-native';
import Styles from './HistoricoEstacionamento.styles';

interface HistoricoEstacionamentoProps {
    setTela(tela: Screens): any;
}

export default class HistoricoEstacionamento extends React.Component<HistoricoEstacionamentoProps, {}> {
    render() {
        const items = (
            <View style={Styles.itemContainer}>
                <Text style={Styles.itemText}>12/09/2019</Text>
                <Text style={Styles.itemText}>13:59</Text>
            </View>
        );
        return (
            <View style={Styles.viewContainer}>
                <View style={Styles.listContainer}>{items}</View>
                <View style={Styles.buttonsContainer}>
                    <View style={Styles.buttonContainer}>
                        <Button title='Voltar' onPress={() => this.props.setTela(Screens.CONTROLE_ESTACIONAMENTO)} />
                    </View>
                    <View style={Styles.buttonContainer}>
                        <Button title='Limpar' onPress={() => this.props.setTela(Screens.CONTROLE_ESTACIONAMENTO)} />
                    </View>
                </View>
            </View>
        );
    }
}
