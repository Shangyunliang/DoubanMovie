/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/Main';
import SearchResult from './SearchResult';
import icons from '../Assets/Icons'

import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
  TextInput,
  AlertIOS,
  AsyncStorage,
} from 'react-native';

class SearchForm extends React.Component {

  constructor(props){
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });

    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
      searchHistory: [],
    }

    AsyncStorage.getItem('searchHistory')
    .then((searchHistory)=>{
      if (searchHistory) {
        this.setState({
          searchHistory:  JSON.parse(searchHistory)
        });
      }
    });

  }

  searchHistory(){
     let newSearchHistory = [...new Set([this.state.query,...this.state.searchHistory])];

     this.setState({
       searchHistory: newSearchHistory
     });

     AsyncStorage.setItem(
       'searchHistory', JSON.stringify(newSearchHistory)
     );
  }

  fetchData() {
    this.searchHistory();

    this.setState({
      loaded: false,
      opacity: 1
    });

    const REQUERST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`;

    fetch(REQUERST_URL)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        loaded: true,
        opacity: 0,
      });
      console.log(responseData);
      this.props.navigator.push({
        title: responseData.title,
        component: SearchResult,
        passProps:{
          results: responseData.subjects
        }
      });
    })
    .catch(
      error => {
        console.log(error);
        AlertIOS.alert(
          'Error',
          'There seems to be an issue connecting to the network.'
        );}
    )
    .done();
  }

async search(item) {
  try {
    await this.setState({
      query: item
    });

    this.fetchData();
  } catch (error) {
    console.log(error);
  }
}
  deleteSearchHistoryList(item){
    let newSearchHistory = new Set(this.state.searchHistory);
    newSearchHistory.delete(item);
    this.setState({
      searchHistory: [...newSearchHistory]
    });
  }


  renderSearchHistoryList(item){
    return(
      <TouchableHighlight
      underlayColor="rgba(34,26,38,0.1)"
      onPress={() => {this.search(item)}}
      >
        <View style={styles.item}>
            <TouchableHighlight
            underlayColor="rgba(34,26,38,0.1)"
            onPress={() => {this.deleteSearchHistoryList(item)}}
            >
            <Image
            source={{uri:icons.delete}}
            style={styles.deleteIcon}
            />
            </TouchableHighlight>
            <View style={styles.itemContent}>
              <Text style={styles.itemHeader}>{item}</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={[styles.container,{paddingTop: 60}]}>
          <View style={{
            paddingTop: 7,
            paddingLeft: 7,
            paddingRight: 7,
            borderColor: 'rgba(100,53,201,0.1)',
            borderWidth: 1
          }}>
            <TextInput
            value={this.state.query}
            style={{height: 50}}
            placeholder="搜索..."
            placeholderTextColor="#6435c9"
            // secureTextEntry
            // editable={true}
            autoFocus
            clearButtonMode="while-editing"
            // clearTextOnFocus={true}
            returnKeyType="search"
            // onFocus={() => console.log('onFocus')}
            // onBlur={() => console.log('onBlur')}
            // onChange={() => console.log('onChange')}
            // onChangeText={(text) => console.log(text)}
            // onEndEditing={() => console.log('onEndEditing')}
            // onSubmitEditing={()=> console.log('onSubmitEditing')}
            onChangeText={(query) => {
              this.setState({
                query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
            ></TextInput>
            <ActivityIndicator
            size="small"
            color="#6435c9"
            animating={!this.state.loaded}
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              opacity: this.state.opacity,
            }}
            />
          </View>

          <Text style={styles.searchHeader}>搜索历史</Text>
          <ListView
          enableEmptySections = {true} 
          dataSource={this.dataSource.cloneWithRows(
            this.state.searchHistory
          )}
          renderRow={this.renderSearchHistoryList.bind(this)}
          />

      </View>
    );
  }
}

export { SearchForm as default };
