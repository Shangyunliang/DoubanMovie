/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/Main';
import UserProfile from './UserProfile'

import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  AsyncStorage,
} from 'react-native';

class User extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '我的',
          component: UserProfile
        }}
        shadowHidden={true}
        barTintColor="darkslateblue"
        titleTextColor="rgba(255,255,255,0.8)"
        tintColor="rgba(255,255,255,0.8)"
        transluent={true}
      />
    );
  }
}

export { User as default };
