
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Categories from './screens/categories'
import Products from './screens/products'
import Card from './screens/card'



const Navigation = StackNavigator({

  Categories: { screen: Categories },
  Products: { screen: Products },
  Card: { screen: Card }
  


})
export default Navigation