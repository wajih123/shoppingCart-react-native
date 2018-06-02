import React from 'react'
import {
    StyleSheet, View, FlatList, ScrollView,
    RefreshControl, Modal, TextInput, Picker, Alert, TouchableOpacity
} from "react-native";
import { Card, Text, Button, } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import QuantityManager from './quantityManager'
import TotalPrice from './totalPrise'
export default class Products extends React.Component {
    constructor(props) {
        super(props)
        this.updateTotal = this.updateTotal.bind(this)
    }
    state = {
        data: [],
        categories: [],
        count: false,
        newPrice: 0,
        total: 0
    }

    static navigationOptions = {
        title: "List Product"
    };
    fetchProducts = async (token) => {

        const headers = {
            "x-apicache-bypass": true,
            'Content-Type': 'application/json',
            'token': token


        }
        const response = await fetch(`http://192.168.192.1:3000/products`, {
            headers
        })
        const json = await response.json()
        this.setState({
            data: json.result
        })
    }

    fetchCategories = async (token) => {

        const headers = {
            "x-apicache-bypass": true,
            'Content-Type': 'application/json',
            'token': token
        }
        const response = await fetch(`http://192.168.192.1:3000/categories`, {
            headers
        })
        const json = await response.json()
        this.setState({
            categories: json.result
        })
    }

    async componentDidMount() {
        await this.fetchCategories("HyCgTFUhz")
        await this.fetchProducts("HyCgTFUhz")

    }

    updateTotal = async (amount) => {

        return await this.setState({ total: this.state.total + amount })

    }
    render() {

        var { navigate } = this.props.navigation
        var nameCategory = this.props.navigation.state.params.item
        let new_products = []
        let produit = []
        if (this.state.data.length > 0) {
            new_products = this.state.data.map(product => {
                product.categories = product.categories.map(category => {
                    if (typeof category !== "undefined") {
                        return this.state.categories.find(el => {
                            return el._id === category
                        })
                    }
                })
                return product
            })
        }
        new_products = new_products.filter((product) =>
            product.categories.find(category => {
                if (typeof category !== "undefined") {
                return category.name === nameCategory
                }
            })
        
        )
        return (
            <View style={{ flexDirection: 'column' }}>
                <ScrollView>
                    <View >
                        <FlatList
                            data={new_products}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item }) =>
                                <Card
                                >
                                    <QuantityManager backPrice={this.updateTotal} title={item.name.toUpperCase()} basePrice={item.price} stock={item.available_stock} />
                                </Card>
                            }
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.text}>Total: {this.state.total} $</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        padding: 17,
        margin: 1,
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
        color: 'black',
        fontWeight: 'bold',
    },
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