import React from 'react';
import { StyleSheet, View } from 'react-native';
import Viewer from './containers/viewer/Viewer';

export default function App() {
    return (
        <View style={styles.container}>
            <Viewer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 100
    }
});
