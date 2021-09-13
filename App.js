import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, View, FlatList } from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

let lista = [
  { id: '1', task: 'Comprar arroz e feijão' },
  { id: '2', task: 'Ir ao dentista' }
]

export default function App() {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState('');

  const changeStatus = user => setUser(user);
  const changeTask = text => setTask(text);
  const keyList = item => item.key;

  function handleDelete(key){
    console.log(key);
  }

  function handleEdit(data){
    console.log(data);
  }

  const render = ({ item }) => (<TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />)

  if (!user) { return <Login changeStatus={changeStatus} /> }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.insertTask}>
        <TextInput
          value={task}
          onChangeText={changeTask}
          style={styles.input}
          placeholder='O que vai fazer hoje ?'
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={keyList}
        data={lista}
        renderItem={render}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F2f6fc',
    paddingHorizontal: 10
  },
  insertTask: {
    flexDirection: 'row',
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#141414',
    borderRadius: 5,
    padding: 10
  },
  addButton: {
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: 5,
    borderRadius: 5
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  }
});
