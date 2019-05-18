/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Button } from 'antd-mobile-rn';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class TestNavigator extends Component {
  configureScene(route, routeStack)
  {
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
        <Navigator
            style={{flex:1}}
            initialRoute={{component: FirstPage}}
            configureScene={this.configureScene}
            renderScene={(route, navigator) => <route.component navigator={navigator} {...route.passProps} />} />
    );
  }
}

// 首页
class FirstPage extends Component
{
  render()
  {
    return (
        <View>
          {/*<TouchableOpacity onPress={() => this.props.navigator.push({component: SecondPage})}>*/}
            {/*<Text style={{fontSize:28}}>点击跳转到二级页面</Text>*/}
          {/*</TouchableOpacity>*/}
          <Button onClick={() => this.props.navigator.push({component: SecondPage})}>
            <Text style={{fontSize:28}}>点击跳转到二级页面</Text>
          </Button>

          {/*<Button>dianwo</Button>*/}

        </View>
    );
  }
}

// 二级页面
class SecondPage extends Component
{
  render()
  {
    return (
        <View>
          {/*<TouchableOpacity onPress={()=>this.props.navigator.pop()}>*/}
            {/*<Text style={{color: 'red', fontSize: 28}}>点击返回首页</Text>*/}
          {/*</TouchableOpacity>*/}
          <Button onClick={()=>this.props.navigator.pop()}>
            <Text style={{color: 'red', fontSize: 28}}>点击返回首页</Text>
          </Button>

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
});

AppRegistry.registerComponent('TestNavigator', () => TestNavigator);
