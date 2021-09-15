import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard
} from 'react-native';

import firebase from './src/services/firebaseConnection';

import { Feather } from '@expo/vector-icons';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [key, setKey] = useState('');

  const inputRef = useRef(null);

  const changeStatus = user => setUser(user);
  const changeTask = text => setNewTask(text);
  const keyList = item => item.key;

  useEffect(() => {

    function getUser() {
      if (!user) {
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }
          setTasks(oldTasks => [...oldTasks, data]);
        });

      });

    }

    getUser();

  }, [user]);

  function handleAdd() {

    if (newTask === '') {
      return;
    }

    //Usuário quer editar uma tarefa
    if (key !== '') {
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key)
          const taskClone = tasks;
          taskClone[taskIndex].nome = newTask

          setTasks([...taskClone])
        })
        .catch((e) => {
          alert('Ops, algo deu errado')
          console.log(e)
        })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
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
    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(() => {
        const findTask = tasks.filter(item => item.key !== key);
        setTasks(findTask);
      })
      .catch((e) => {
        alert('Ops, algo deu errado!')
        console.log(e)
      })
  }

  function handleEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();

  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  async function logOut() {
    await firebase.auth().signOut();
    setUser(null);
    setNewTask('');
  }

  const render = ({ item }) => (
    <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
  )

  if (!user) {
    return <Login changeStatus={changeStatus} />
  }

  return (
    <SafeAreaView style={styles.container}>

      {key.length > 0 &&
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name='x-circle' color='#F00' size={20} />
          </TouchableOpacity>
          <Text style={{ color: '#F00', marginLeft: 5 }}>
            Você está editando uma tarefa!
          </Text>
        </View>
      }


      <View style={styles.insertTask}>
        <TextInput
          value={newTask}
          onChangeText={changeTask}
          style={styles.input}
          placeholder='O que vai fazer hoje ?'
          ref={inputRef}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={logOut}>
          <Feather name='log-out' color='#FFF' size={15} />
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
