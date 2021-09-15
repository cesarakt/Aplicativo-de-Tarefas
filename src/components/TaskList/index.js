import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function TaskList({ data, deleteItem, editItem }) {
    const task = data.nome;
    const deleteTask = () => deleteItem(data.key);
    const editTask = () => editItem(data);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={deleteTask}>
                <Feather name='trash' color='#F00' size={20} />
            </TouchableOpacity>
            
            <View>
                <TouchableWithoutFeedback onPress={editTask}>
                    <Text style={styles.tasks}>{task}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}