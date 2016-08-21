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
  NavigatorIOS,
} from 'react-native';

class SearchResult extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.results);

    let dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });

    this.state = {
      movies: dataSource.cloneWithRows(this.props.results)
    }
  }

  showMovieDetail(movie){
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {movie},
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
          source={{uri: movie.images.large}}
          style={styles.image}
          />
        <View style={styles.itemContent}>
          <Text style={styles.itemHeader}>{movie.title}</Text>
          <Text style={styles.itemMeta}>
              {movie.original_title}({movie.year})
          </Text>
          <Text style={styles.redText}>{movie.rating.average}</Text>
        </View>
      </View>
    </TouchableHighlight>
    );
  }

  render() {
    return (
        <ListView
          dataSource={this.state.movies}
          renderRow={this.renderMoveList.bind(this)}
        ></ListView>
    );
  }
}

export { SearchResult as default };
