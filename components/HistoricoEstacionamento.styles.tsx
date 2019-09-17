import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    listContainer: {
        width: '100%',
        height: '80%'
    },
    itemContainer: {
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#999',
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 12,
        fontWeight: '500'
    }
});

export default styles;
