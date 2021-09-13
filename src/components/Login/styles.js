import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15,
        backgroundColor: '#F2f6fc'
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 15,
        borderColor: '#141414',
        borderRadius: 5,
        padding: 10
    },
    handleLogin: {
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    handleLoginText: {
        color: '#FFF',
        fontSize: 18
    }
});

export default styles;