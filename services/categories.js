import React from 'react';
export const fetchCategories = (token) => {

    const headers = {
        "x-apicache-bypass": true,
        'Content-Type': 'application/json',
        'token': token


    }

    return fetch(`http://192.168.0.122:3000/categories`, {
        headers
    })

        .then(response => response.json())
        
        .then(res => {
            return Promise.resolve(res)
        })
}
deleteProduct = (token, _id) => {

    const headers = {
        "x-apicache-bypass": true,
        'Content-Type': 'application/json',
        'token': token


    }

    return fetch(`http://192.168.0.122:3000/products/${_id}`, {
        headers,
        method: 'DELETE'
    })



}

handleDelete=(_id, name)=> {


    Alert.alert(
        'you want to delete',
        '==>  ' + ' ' + name.toUpperCase(),
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => this.deleteProduct("HyCgTFUhz", _id) },
        ],
        { cancelable: false }
    )

}
handleDelete=(_id, name)=> {
    Alert.alert(
        'you want to delete',
        '==> ' + ' ' + name.toUpperCase(),
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => this.deleteCategorie("HyCgTFUhz", _id) },
        ],
        { cancelable: false }
    )
}

deleteCategorie = (token, _id) => {

    const headers = {
        "x-apicache-bypass": true,
        'Content-Type': 'application/json',
        'token': token
    }
    return fetch(`http://192.168.0.122:3000/categories/${_id}`, {
        headers,
        method: 'DELETE'
    })
}