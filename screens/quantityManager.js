import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default class QuantityManager extends Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 0, total: 0 };
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
    }
    handleQuantityChange =({ decrease })=> {
        if (this.state.quantity > 0 && decrease) {
            this.setState({ quantity: this.state.quantity - 1 })
            this.setState({total: this.state.total - this.props.basePrice})
            this.props.backPrice(this.state.total)
        } else if (this.props.stock > 0) {
            this.setState({ quantity: this.state.quantity + 1 })
            this.setState({total: this.state.total +this.props.basePrice})
            this.props.backPrice(this.state.total)
        }
    }
    
    render() {
 
        return (
            <View style={styles.wrapper}>
            
                <TouchableOpacity
               
                onPress={()=>this.handleQuantityChange({ decrease: false }) } style={styles.buttons}>

                   <Text style={{ color: 'black' }}> {this.props.title}</Text>
                    <Button title="  -  " onPress={() => this.handleQuantityChange({ decrease: true })} />
                    <View style={{ flexDirection: 'column',}}>
                    <Text style={{ color: 'black' }}> Quantity:  {this.state.quantity} </Text>
                    <Text  style={{ color: 'black' }} > Price:  {this.state.quantity * this.props.basePrice} $ </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    buttons: {
        flexDirection: 'row',
        flex: 2,
        //borderWidth: 1,
        justifyContent: 'space-evenly'
    }
});


