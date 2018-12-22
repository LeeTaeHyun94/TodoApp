import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView} from 'react-native';
import Todo from './components/Todo';
import {AppLoading} from "expo";
import uuidv1 from "uuid/v1";

const {height, width} = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  state = {
    newTodo: "",
    loadedTodos : false,
    todos: {}
  };
  componentDidMount = () => {
    this._loadTodos();
  };
  render() {
    const {newTodo, loadedTodos, todos} = this.state;
    console.log(todos);
    if (!loadedTodos) {
      return <AppLoading/>;
    }
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content"/>
          <Text style={styles.title}>Todo List</Text>
          <View style={styles.card}>
            <TextInput style={styles.input} placeholder={"New Todo"} value={newTodo} onChangeText={this._controlNewTodo} placeholderTextColor={"#999"} returnKeyType={"done"} autoCorrect={false} onSubmitEditing={this._addTodo}/>
            <ScrollView contentContainerStyle={styles.todos}>
              {Object.values(todos).map(todo => <Todo key={todo.id} {...todo} deleteTodo={this._deleteTodo} uncompleteTodo={this._uncompleteTodo} completeTodo={this._completeTodo}/>)}
            </ScrollView>
          </View>
        </View>
    );
  };
  _controlNewTodo = text => {
    this.setState({
      newTodo: text
    });
  };
  _loadTodos = () => {
    this.setState({
      loadedTodos: true
    });
  };
  _addTodo = () => {
    const {newTodo} = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        };
        return {...newState};
      });
    }
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };
      return {...newState};
    });
  };
  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false
          }
        }
      };
      return {...newState};
    });
  };
  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true
          }
        }
      };
      return {...newState};
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F23657',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50,
    fontWeight: "100"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // ios : shadowRadius
    // android : elevation
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height:-1,
          width:1
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: {
    alignItems: "center",
  },
});
