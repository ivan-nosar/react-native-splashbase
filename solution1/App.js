/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = {
    imageURL: null,
    imageRequested: false,
    isImageLoading: false
  }

  buttonClickHandler = async () => {
    this.setState({ imageURL: null, imageRequested: true, isImageLoading: false })
    const imageURL = await fetch('http://www.splashbase.co/api/v1/images/random')
      .then(res => res.json())
      .then(data => data.url)
    this.setState({ imageURL })
  }

  imageLoadStartHandler = () => {this.setState({ isImageLoading: true })}
  imageLoadEndHandler = () => {this.setState({ isImageLoading: false })}

  render = () => {
    const imageTemplate = this.state.imageURL ?
      <View style={styles.imageContainer}>
        <Text style={styles.instructions}>Current image url:</Text>
        <Text style={styles.instructions}>{ this.state.imageURL }</Text>
        { this.state.isImageLoading &&  <Text style={styles.instructions}>Loading image...</Text> }
        <Image
          style={styles.image}
          source={{uri: this.state.imageURL }}
          onLoadStart={this.imageLoadStartHandler}
          onLoadEnd={this.imageLoadEndHandler}
        />
      </View>
      : <Text style={styles.instructions}>Image URL is loading...</Text>;
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Test application!</Text>
        <Text style={styles.instructions}>Press button below to refresh image</Text>
        
        <Button
          onPress={this.buttonClickHandler}
          title="Refresh"
        />

        { this.state.imageRequested && imageTemplate }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageContainer: {
    width: '90%'
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    alignSelf: 'center'
  }
});
