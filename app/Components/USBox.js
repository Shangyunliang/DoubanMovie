'use strict';

import React, { Component } from 'react';
import styles from '../Styles/Main';
import USBoxList from './USBoxList';

import {
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

class USBox extends React.Component {
    render(){
      return(
        <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: '北美票房',
              component: USBoxList,
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

export { USBox as default };
