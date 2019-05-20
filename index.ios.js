/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, FlatList, Text, TextInput, ListView, View, Image, TouchableOpacity, TouchableHighlight,ScrollView} from 'react-native';
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
            // title: '二级页面',
              title: title,
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
     // test1=111;
    constructor(props){
        super(props);
        this.state = {
            // dataSource: [],
            a:1,
            b:2,
            id:9,
            c:99,
            dataSource2:[
                {
                    "id": 1,
                    "key1": "1",
                    "name": "深圳汇源果汁有限公司",
                    "city": "深圳",
                    "phone": "13799998888",
                    "contacts": "王大鹏",
                    "email": "260815998@qq.com",
                    "source": "广交会",
                    "title": "总经理",
                    "need": "软件",
                    "url": "http://www.sohu.com/",
                    "address": "广东省深圳市南山区桃园路22号天源大厦B座1123室",
                    "remark": "初步接触",
                    "inputtime": null
                },
        {
            "id": 70,
            "key1": "请填写key",
            "name": "请填写公司名称",
            "city": "请填写城市",
            "phone": "请填写电话",
            "contacts": "请填写联系人",
            "email": "请填写邮箱",
            "source": "请填写来源",
            "title": "请填写职务",
            "need": "请填写产品kk",
            "url": "请填写网址",
            "address": "请填写公司地址",
            "remark": "请填写备注",
            "inputtime": null
        }]

        };
    }

    componentDidMount() {//组件挂载时执行的代码
        this.timerID = setInterval(
            () => this.tick(),
            1000 //每秒更新一次
        );
    }

    tick() {//定时器
        this.setState({
            date: new Date(),//创建当前时间
            child:'删除',
        });
        this.getCustomerList();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);//清理计时器

    }

    //从后台获取用户列表
    getCustomerList(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };

        var url ="http://119.23.77.187:8080/getCustomerList";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    dataSource: responseJson

                })

            })
            .catch((error) => {
                console.error(error);
            });
    }


    gotoPage1(component, title)
    {
        this.props.navigator.push(
            {
                component: component,
                passProps: {
                    title: title,
                    lastPageTitle: this.props.title

                }
            })
    }


    jian(){
        const {a} = this.state.a;
        // const {id} = this.state.dataSource[0].id
        this.setState({ a: a-1,}
            // dataSource:dataSource+''}
            );
        alert('a减去1后的值：' + a);
    }

    add(){
        const {a} = this.state.a;
        // this.setState({a : a+1});
        this.setState({a : a+1});
        alert('a加上1后的值：' + a);
    }


  render()
  {

    return (



                            <View style={{flex: 1, paddingTop:100}}>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={({item}) => <Text>{item.title}, {item.name}</Text>}
                                    keyExtractor={({id}, index) => id}
                                />
                            </View>


      // <div>
      //
      //     {this.state.dataSource.map(
      //         //传递点中的ID
      //         u => <div key={u.id} >{u.name}</div>)
      //     }
      // </div>
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
