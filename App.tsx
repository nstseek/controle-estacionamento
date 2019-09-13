import React from 'react';
import { StyleSheet, View } from 'react-native';
import ControleEstacionamento from './ControleEstacionamento';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Expo from 'expo';

export const taskName = 'test';

TaskManager.defineTask(taskName, async() => {
    console.log('logging scheduled task');
    const notification = {
        title: 'running background fetch',
        body: 'this is a background notification'
    };
    Expo.Notifications.presentLocalNotificationAsync(notification);
    return BackgroundFetch.Result.NewData;
});
console.log('task defined');

export default function App() {
    const registerTask = async() => {
        await BackgroundFetch.registerTaskAsync(taskName);
        BackgroundFetch.setMinimumIntervalAsync(60);
        console.log(await TaskManager.getRegisteredTasksAsync());
    }
    registerTask();
    return (
        <View style={styles.container}>
            <ControleEstacionamento></ControleEstacionamento>
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
