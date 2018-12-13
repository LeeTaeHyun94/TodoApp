/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView} from 'react-native';
import Todo from './components/Todo';

const {height, width} = Dimensions.get("window");

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
export default class App extends Component<Props> {
  state = {
    newTodo: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
          <Text style={styles.title}>To Do</Text>
          <View style={styles.card}>
            <TextInput style={styles.input} placeholder={"New To Do"} value={this.state.newTodo} onChangeText={this._controlNewTodo} placeholderTextColor={"#999"} returnKeyType={"done"} autoCorrect={false}/>
            <ScrollView>
              <Todo/>
            </ScrollView>
          </View>
      </View>
    );
  }
  _controlNewTodo = text => {
    this.setState({
        newTodo: text
    });
  };
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
});
