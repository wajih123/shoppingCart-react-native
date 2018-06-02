import React from "react";
import {
    View, Text, ActivityIndicator, FlatList, TextInput,
    Button, Modal, StyleSheet, RefreshControl, ScrollView, Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Categories extends React.Component {

    state = {
        data: [],
        name: null,
        refreshing: false,

    }
    static navigationOptions = {
        title: "List Categories"
    };


    componentDidMount() {
        this.fetchCategories("HyCgTFUhz")

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
            data: json.result
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={{
                borderColor: '#808080',
                borderWidth: 3,
            }}>
                <ScrollView>
                    <FlatList


                        data={this.state.data}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item }) =>
                            <Text style={styles.item} onPress={
                                () => navigate('Products', { item: item.name })} >{item.name}
                            </Text>
                        }
                    />

                </ScrollView>


            </View>

        )
    }
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 17,
        margin: 1,
        borderColor: 'pink',
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'

    },

})