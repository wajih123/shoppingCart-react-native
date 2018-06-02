import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Modal, TouchableHighlight } from "react-native";

export default class Card extends React.Component {

    static navigationOptions = {
        title: "details card"
    };
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            quantity: '',
            totalPrice: '',
            nameValidate: true,
            modalVisible: false,



        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    editProduct = async (token, product) => {

        const headers = {
            "x-apicache-bypass": true,
            'Content-Type': 'application/json',
            'token': token,
            'Request-Type': 'MAINTENANCE',

        }

        const response = await fetch(`http://192.168.0.122:3000/products/` + product._id, {
            headers,
            method: 'PUT',
            body: JSON.stringify(product)

        })


        const json = await response.json()
        this.setState({
            data: json.result
        })
    }

    handleSubmit = async () => {
        let product = this.props.navigation.state.params.item
        product.available_stock -= this.state.quantity
        this.editProduct("HyCgTFUhz", product)

        this.setState({ totalPrice: product.price * this.state.quantity, modalVisible: true })


    }



    validate(text) {
        num = /^[0-9]+$/

        if (num.test(text)) {
            this.setState({ nameValidate: true, quantity: text })
        }
        else { this.setState({ nameValidate: false }) }


    }

    render() {
        var { params } = this.props.navigation.state
        var { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.inputStyle, !this.state.nameValidate ? styles.error : null]}
                    placeholder="Number Product"
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'

                    onChangeText={(text) => this.validate(text)} />
                <Button style={styles.button} title='confirm' onPress={() => {
                    this.handleSubmit()

                }} />
                <View >
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>

                        <View style={styles.model}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                                {params.item.name}
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                                {this.state.quantity}
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                                {this.state.totalPrice}
                            </Text>

                            <Button style={styles.button}
                                title='close'
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>

                            </Button>
                        </View>

                    </Modal>
                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    error: {

        borderColor: 'red',
        borderWidth: 3,
    },
    container: {

        backgroundColor: '#26ae90',
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: 20,
        paddingLeft: 20
    },
    inputStyle: {
        marginTop: 20,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 20,
        paddingLeft: 15
    },
    button: {
        fontSize: 16,
        color: '#fff',
        marginTop: 70,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    model: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 3,

        backgroundColor: '#d2f7f1',




    }

})