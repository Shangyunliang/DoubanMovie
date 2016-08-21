

import React, { Component } from 'react';
import styles from '../Styles/Main';

import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class  MovieDetail extends React.Component{
    constructor(props){
      super(props);

      console.log(this.props.movie);
      this.state = {
        MovieDetail: '',
        loaded: false,
      };

      const REQUERST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;

      this.fetchData(REQUERST_URL);
    }

    fetchData(REQUERST_URL){
      fetch(REQUERST_URL)
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          this.setState({
              MovieDetail:responseData,
              loaded: true,
          });
        })
        .done();
    }


    render(){
      if (!this.state.loaded){
        return(
          <View style = {styles.container}>
            <View style = {styles.loading}>
              <ActivityIndicator size="large" color="#6435c9"/>
            </View>
          </View>
        );
      }

      let movie= this.state.MovieDetail;
      let id = 0
      let summary = movie.summary.split(/\n/).map(p => {
        id = id + 1;
        return (
          <View style={{marginTop: 15,paddingLeft: 6,paddingRight: 6}} key={id}>
            <Text style={styles.itemText}>{p}</Text>
          </View>
        );
      });

      return(
          <View style={[styles.container,{paddingTop:70}]}>
              <View style={[styles.item,{flexDirection:'column'}]}>
                  {summary}
              </View>
          </View>
        );
    }

}

export { MovieDetail as default };
