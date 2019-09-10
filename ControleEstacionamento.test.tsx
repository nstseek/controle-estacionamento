import React from 'react';
import ControleEstacionamento, { PersistentStorage } from './ControleEstacionamento';
import renderer from 'react-test-renderer';
import { AsyncStorage } from 'react-native';

const mockAsyncStorage = {
    ...AsyncStorage,
    getItem: jest.fn(),
    setItem: jest.fn()
}

it('renders correctly', () => {
    expect(renderer.create(<ControleEstacionamento />).toJSON()).toMatchSnapshot();
});
describe('testa funcoes', () => {
    it('deve chamar o asyncStorage pra salvar o saldo', () => {
        const component = new ControleEstacionamento(null);
        component.asyncStorage = mockAsyncStorage;
        component.decreaseSaldo();
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(PersistentStorage.saldo, component.state.saldo.toString(), component.errorFunc);
    })
    it('deve chamar o asyncStorage pra salvar o saldo', () => {
        const component = new ControleEstacionamento(null);
        component.asyncStorage = mockAsyncStorage;
        component.setSaldo();
        expect(mockAsyncStorage.setItem).toHaveBeenLastCalledWith(PersistentStorage.saldo, component.state.saldoTemp, component.errorFunc);
    })
    it('deve chamar o asyncStorage pra salvar o valor', () => {
        const component = new ControleEstacionamento(null);
        component.asyncStorage = mockAsyncStorage;
        component.setValor();
        expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(PersistentStorage.valor, component.state.valorTemp.toString(), component.errorFunc);
    })
});
