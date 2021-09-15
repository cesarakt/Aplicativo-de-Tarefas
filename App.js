import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, View, FlatList, Keyboard } from 'react-native';

import firebase from './src/services/firebaseConnection';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');

  const changeStatus = user => setUser(user);
  const changeTask = text => setNewTask(text);
  const keyList = item => item.key;

  function handleAdd() {
    if (newTask === '') {
      return;
    }
    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask
        };

        setTasks(oldTasks => [...oldTasks, data]);

      })
      .catch((e) => {
        alert('ops algo deu errado!');
        console.log(e);
      })

    Keyboard.dismiss();
    setNewTask('');

  }

  function handleDelete(key) {
    console.log(key);
  }

  function handleEdit(data) {
    console.log(data);
  }

  const render = ({ item }) => (
    <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
  )

  if (!user) {
    return <Login changeStatus={changeStatus} />
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.insertTask}>
        <TextInput
          value={newTask}
          onChangeText={changeTask}
          style={styles.input}
          placeholder='O que vai fazer hoje ?'
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={keyList}
        data={tasks}
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
