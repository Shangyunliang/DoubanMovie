/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/Main';
import Login from './Login';
import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  AsyncStorage,
  PixelRatio,
} from 'react-native';

class UserProfile extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      token: '',
      user: {},
      loaded: false,
    }

    this.login();


  }

  componentWillUpdate() {
    if (!this.state.token) {
      AsyncStorage.getItem('token')
      .then((token)=>{
         this.setState({
           token: JSON.parse(token).access_token
         })
      })
      .then(()=>{
        if (this.state.token){
          this.getCurrentUser()
        }
      })
    }
  }

  login() {
    AsyncStorage.getItem('token')
    .then((token)=> {
      if (token) {
        this.setState({
          token: JSON.parse(token).access_token
        });
      }
    })
    .then(()=>{
      if (this.state.token) {
        this.getCurrentUser();
      }
    })
    .then(()=>{
      if (!this.state.token){
        this.redirectToLogin();
      }
    })
    .done()
  }

  getCurrentUser() {
    console.log('获取当前用户资料');
    fetch('https://api.github.com/user',{
      headers: {
        'Authorization': `token ${this.state.token}`
      }
    })
    .then(reponse => reponse.json())
    .then(responseData => {
      this.setState({
        user: responseData,
        loaded: true,
      });
    })
    .then(()=> {
      console.log(this.state.user);
    })
    .done();
  }

  redirectToLogin() {
    this.props.navigator.push({
      title: '登录',
      component: Login
    });
  }

  logout() {
    AsyncStorage.clear()
    .then(()=>{
      this.setState({
        token: '',
        user: {},
        loaded: false,
      });
    })
    .then(()=> this.login())
    .done();
  }

  render() {
    if (!this.state.loaded) {
        return(
          <View style={styles.container}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#6435c9"/>
            </View>
          </View>
        );
    }else {
    return (
        <View
        style={[styles.container,{
          flexDirection: 'column',
          paddingTop: 160,
        }]}>
          <View style={{
            flex: 1,
            alignSelf: 'center',
          }}>
           <Image
           source={{uri: this.state.user.avatar_url}}
           style={{
             alignSelf: 'center',
             width: 90,
             height: 90,
             borderRadius: 90 / PixelRatio.get(),
           }}
           />
           <Text style={{
             marginVertical: 15,
             fontSize: 18,
             textAlign: 'center',
           }}>{this.state.user.login}</Text>
           <Text style={{
             color: 'rgba(0,0,0,0.6)',
             marginBottom: 10,
             textAlign: 'center',
           }}>{this.state.user.bio}</Text>
           <TouchableHighlight
           underlayColor="rgba(34,26,38,0.1)"
           onPress={()=> this.logout()}
           style={{
             margin: 10,
             justifyContent: 'flex-end',
             marginBottom: 90,
           }}>

          <View style={{
            backgroundColor: '#9182e6',
            borderRadius: 3,
            padding: 13,
          }}>
            <Text style={{
              alignSelf: 'center',
              color: 'rgba(255,255,255,0.9)'
            }}>
              退出登录
            </Text>
          </View>
          </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

export { UserProfile as default };
