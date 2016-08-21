/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/Main';

import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  WebView,
  AsyncStorage,
} from 'react-native';

class Login extends React.Component {

  constructor(props){
    super(props);

  this.api = {
    key: '688c7e6c5b66dfd97d7c',
    secret: '3b913658459e98a78dce36fe2ee8f395ad797055',
  }

  this.oAuth = {
    authBaseUrl: 'https://github.com/login/oauth/authorize',
    tokenBaseUrl: 'https://github.com/login/oauth/access_token',
    redirectUri: 'https://www.baidu.com',
  }

  this.state = {
    authCode: '',
  }

  this.authUrl = `${this.oAuth.authBaseUrl}
  ?client_id=${this.api.key}
  &redirect_uri=${this.oAuth.redirectUri}`.replace(/(\r\n|\n|\r| )/gm, '');

  console.log(`authUrl => ${this.authUrl}`);
  }

  getToken() {
    let tokenUrl = `${this.oAuth.tokenBaseUrl}
    ?client_id=${this.api.key}
    &client_secret=${this.api.secret}
    &redirect_uri=${this.oAuth.redirectUri}
    &code=${this.state.authCode}`.replace(/(\r\n|\n|\r| )/gm, '');
    console.log(`tokenUrl=>${tokenUrl}`);
    fetch(tokenUrl,{
      method: 'POST',
      headers: {
        'Accept':'application/json'
      }
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
      AsyncStorage.setItem('token',JSON.stringify(responseData));
    })
    .then(()=> this.props.navigator.pop())
    .done()

  }

  async onNavigationStateChange(state){
    console.log(state);
    console.log(`获取到的state=${state.url}&&${state.navigationType}`);

    if (state.url.includes('?code=') && state.navigationType === "other") {
        let code = state.url.split('code=')[1];
        await this.setState({
          authCode: code
        });
        console.log(`获取到的autahCode=${this.state.authCode}`);
        this.getToken();
    }
  }

  render() {
    return (
        <WebView
        renderLoading= {() => {
          return (<View style={styles.container}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#6435c9"/>
            </View>
          </View>);
        }}
        startInLoadingState={true}
        source={{uri:this.authUrl}}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
    );
  }
}

export { Login as default };
