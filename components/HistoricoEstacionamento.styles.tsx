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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    itemContainer: {
        width: '80%',
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
