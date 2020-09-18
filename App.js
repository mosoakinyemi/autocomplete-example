import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

const API_KEY = 'Your-API-KEY';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
    };
  }

  searchLocation = async (text) => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <TextInput
            placeholder="Search for an address"
            returnKeyType="search"
            style={styles.searchBox}
            placeholderTextColor="#000"
            onChangeText={(text) => this.searchLocation(text)}
            value={this.state.searchKeyword}
          />
          {this.state.isShowingResults && (
            <FlatList
              data={this.state.searchResults}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      this.setState({
                        searchKeyword: item.description,
                        isShowingResults: false,
                      })
                    }>
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}
        </View>
        <View style={styles.dummmy} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  dummmy: {
    width: 600,
    height: 200,
    backgroundColor: 'hotpink',
    marginTop: 20,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});
