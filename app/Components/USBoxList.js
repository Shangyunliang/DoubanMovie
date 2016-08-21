/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/Main';
import MovieDetail from './MovieDetail';

import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

const REQUERST_URL = 'https://api.douban.com/v2/movie/us_box'

class USBox extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      movies:new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2
      }),
      loaded:false
    };

    this.fetchData();
  }

  fetchData(){
    fetch(REQUERST_URL)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          movies: this.state.movies.cloneWithRows(responseData.subjects),
          loaded: true
        });
      })
      .done();
  }

  showMovieDetail(movie){
    console.log(movie.subject);
    this.props.navigator.push({
      title: movie.title,
      component:MovieDetail,
      passProps:{movie:movie.subject},
    });
  }

  renderMoveList(movie){
    return(
      <TouchableHighlight
      underlayColor="rgba(34,26,38,0.1)"
      onPress={() => this.showMovieDetail(movie)}
      >
      <View style={styles.item}>
        <View style={styles.itemImage}></View>
          <Image
          source={{uri: movie.subject.images.large}}
          style={styles.image}
          />
        <View style={styles.itemContent}>
          <Text style={styles.itemHeader}>{movie.subject.title}</Text>
          <Text style={styles.itemMeta}>
              {movie.subject.original_title}({movie.subject.year})
          </Text>
          <Text style={styles.redText}>{movie.subject.rating.average}</Text>
        </View>
      </View>
    </TouchableHighlight>
    );

  }

  render() {
    if (!this.state.loaded){
      return(
        <View style = {styles.container}>
          <View style = {styles.loading}>
            <ActivityIndicator size="large" color="#6435c9"/>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container,{paddingTop:64}]}>
        <ListView
        enableEmptySections = {true} 
        dataSource = {this.state.movies}
        renderRow = {this.renderMoveList.bind(this)}/>
      </View>
    );
  }
}

export { USBox as default };
