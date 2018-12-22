import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class Todo extends Component{
    constructor(props) {
        super(props);
        this.state = {isEditing: false, todoValue: props.text}
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        uncompleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired
    };
    // state = {
    //     isEditing: false,
    //     isCompleted: false,
    //     todoValue : "",
    // };
    render() {
        const {isEditing, todoValue} = this.state;
        const {id, isCompleted, text, deleteTodo} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>
                    {
                        isEditing ?
                            (<TextInput style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} value={todoValue} multiline={true} onChangeText={this._controllInput} returnKeyType={"done"} onBlur={this._finishEditing}/>) :
                            (<Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]} >
                                    {text}
                            </Text>)
                    }
                </View>
                {isEditing ?
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View> :
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}

            </View>
        )
    };
    _toggleComplete = () => {
        const {id, isCompleted, uncompleteTodo, completeTodo} = this.props;
        isCompleted ? uncompleteTodo(id) : completeTodo(id);
    };
    _startEditing=() =>{
        this.setState({isEditing : true});
    };
    _finishEditing = () => {
        this.setState({
            isEditing : false
        });
    };
    _controllInput = (text) => {
        this.setState({todoValue : text});
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20,
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "#F23657",
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through",
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width : width / 2,
        // justifyContent: "space-between",
    },
    actions : {
        flexDirection : "row"
    },
    actionContainer : {
        marginVertical : 10,
        marginHorizontal : 10 ,
    },
    input : {
        marginVertical : 20,
        width : width / 2,
    }
})
