import React from 'react';
import ControleEstacionamento from '../components/ControleEstacionamento';
import { Screens } from '../types';
import HistoricoEstacionamento from '../components/HistoricoEstacionamento';

interface ViewerState {
    tela: Screens;
}

export default class Viewer extends React.Component<{}, ViewerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: Screens.CONTROLE_ESTACIONAMENTO
        };
    }

    render() {
        let content: any;
        switch (this.state.tela) {
            case Screens.HISTORICO_ESTACIONAMENTO:
                content = <HistoricoEstacionamento setTela={this.setTela} />;
                break;
            default:
                content = <ControleEstacionamento setTela={this.setTela} />;
        }
        return content;
    }

    setTela = (tela: Screens) => {
        this.setState({
            tela
        });
    };
}
