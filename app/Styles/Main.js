import React from 'react-native';

let { StyleSheet } = React;

const styles = StyleSheet.create({
  deleteIcon:{
    width: 20,
    height: 20,
    margin: 10,
    opacity: 0.6,
  },
  searchHeader: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(100,53,21,0.1)',
    paddingBottom: 6,
    paddingTop: 6,
    flex: 1,
  },
  itemContent: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
  },
  itemHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9',
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 6,
  },
  redText: {
    color: '#db2828',
    fontSize: 15,
  },
  overlay:{
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
  },
  overlayHeader:{
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
  },
  overlaySubHeader:{
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
    paddingTop: 0,
  },
  backgroundimage:{
    flex: 1,
    resizeMode: 'cover'//'stretch'//'contain',
  },
  image:{
    width: 99,
    height: 138,
    margin: 6,
  },
  container:{
    backgroundColor: '#eae7ff',
    flex: 1,
    },
  loading:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText:{
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#6435c9',
    padding: 10,
  },
});

export { styles as default };
