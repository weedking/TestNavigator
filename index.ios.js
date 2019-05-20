/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, TextInput, ListView, View, Image, TouchableOpacity, TouchableHighlight,ScrollView} from 'react-native';
import { Button, List } from 'antd-mobile-rn';
import {Navigator } from 'react-native-deprecated-custom-components';

const Item = List.Item;
const Brief = Item.Brief;

export default class TestNavigator extends Component {
  configureScene(route, routeStack)
  {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
        <Navigator
            style={{flex:1}}
            initialRoute={{component: FirstPage, passProps: {title: '首页', rightText: '菜单'}}}
            configureScene={this.configureScene}
            renderScene={(route, navigator) => <route.component route={route} navigator={navigator} {...route.passProps} />}
            navigationBar={
              <Navigator.NavigationBar
                  style={styles.navContainer}
                  routeMapper={NavigationBarRouteMapper}
              />}
        />
    );
  }
}

// 首页
class FirstPage extends Component
{
  /**
   * 跳转
   */
  gotoPage(component, title)
  {
    this.props.navigator.push(
        {
          component: component,
          passProps: {
            title: '二级页面',
            lastPageTitle: this.props.title

          }
        })
  }

  render()
  {
    return (
        <View style={{paddingTop: 80}}>

          {/*<Button onClick={() => this.gotoPage(SecondPage, '二级页面')}>*/}
            {/*<Text style={{fontSize:28, padding: 12}}>点击跳转到二级页面</Text>*/}
            {/*/!*<Text style={{padding: 10, fontSize: 20}}>这是首页，这是首页，这是首页，这是首页，这是首页</Text>*!/*/}
          {/*</Button>*/}

         <TouchableOpacity onPress={()=>{this.gotoPage(SecondPage, '二级页面');}}>
            <Image source={require('./img/customer64.png')} />
         </TouchableOpacity>
        </View>
    );
  }
}

// 二级页面
class SecondPage extends Component
{
    gotoPage1(component, title)
    {
        this.props.navigator.push(
            {
                component: component,
                passProps: {
                    title: '深圳市汇源肾宝有限公司',
                    lastPageTitle: this.props.title

                }
            })
    }
  render()
  {
    return (
        <ScrollView style={{paddingTop: 60}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
          {/*<TouchableOpacity onPress={()=>this.props.navigator.pop()}>*/}
            {/*<Text style={{color: 'red', fontSize: 28}}>点击返回首页</Text>*/}
          {/*</TouchableOpacity>*/}

          {/*<Button onClick={()=>this.props.navigator.pop()}>*/}
            {/*<Text style={{color: 'red', fontSize: 28}}>点击返回首页</Text>*/}
          {/*</Button>*/}

          {/*<Image source={require('./img/crm16.png')} />*/}

            <List renderHeader={'客户列表'}>
                <Item   arrow="horizontal"  onClick={() => {this.gotoPage1(HuiYuan, '深圳市汇源肾宝有限公司');}}>
                    深圳市汇源肾宝有限公司
                </Item>
                <Item   arrow="horizontal" onPress={() => {}}>
                    深圳市恒源祥集团有限公司
                </Item>

            </List>
        </ScrollView>
    );
  }
}


class HuiYuan extends Component{
    render() {
        return (
            <ScrollView style={{paddingTop: 60}}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                <Button>我是汇源肾宝</Button>

            </ScrollView>
        );
    }
}


// 导航栏的Mapper
var NavigationBarRouteMapper =
    {
      // 左键
      LeftButton: (route, navigator, index, navState) =>
        {
            if (index <= 0) {
                return null;
            } else {
                return (
                    <TouchableHighlight style={{ marginTop: 10 }} onPress={() => navigator.pop()}>
                        <Text>返回</Text>
                    </TouchableHighlight>
                );
            }
        },
      // 右键
      RightButton(route, navigator, index, navState)
      {
        // if(!route.passProps.rightText) return null;
        // return (
        //     <View style={{paddingTop: 80}}>
        //
        //       <Button onClick={() => alert('测试菜单')}>
        //         {route.passProps.rightText}
        //       </Button>
        //
        //     </View>
        //
        // );
          return null;
      },
      // 标题
      Title(route, navigator, index, navState)
      {
        return (
            <Text style={styles.title}>
              {route.passProps.title || '默认标题'}
            </Text>
        );
      }
    };

const styles = StyleSheet.create({
  // 页面框架
  container: {
    flex: 4,
    marginTop: 100,
    flexDirection: 'column'
  },
  // 导航栏
  navContainer: {
    backgroundColor: '#41ABF7',
    paddingTop: 12,
    paddingBottom: 10,
    flex: 1
  },
  // 导航栏文字
  headText: {
    color: '#ffffff',
    fontSize: 22
  },
  // 按钮
  button: {
    height: 120,
    marginTop: 10,
    justifyContent: 'center', // 内容居中显示
    backgroundColor: '#ff1049',
    alignItems: 'center'
  },
  // 按钮文字
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13,
    marginTop: 12,
    flex: 1
  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13,
    marginTop: 12,
    flex: 1
  },
  // 标题
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 12
  }
});

AppRegistry.registerComponent('TestNavigator', () => TestNavigator);
