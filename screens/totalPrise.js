import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
export  default class TotalPrice extends Component{
    constructor(props) {
        super(props)
       
    }

    render(){
console.warn('wajih',this.props.amount)
        return(
            <View style={styles.wrapper}>
            <Text style={styles.text}>Total: {this.props.amount} $</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
   
    wrapper: {
        height: 44,
        backgroundColor: 'darkorange',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: '300'
    }
})