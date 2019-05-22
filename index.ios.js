/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, FlatList, Text, TextInput, ListView, View, Image, TouchableOpacity,
    TouchableHighlight,ScrollView, Dimensions, ActivityIndicator, RefreshControl} from 'react-native';
import { Button, List, SearchBar } from 'antd-mobile-rn';
import {Navigator } from 'react-native-deprecated-custom-components';

const Item = List.Item;
const Brief = Item.Brief;
global.aa = 1;

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
        // const{navigator} = this.props;
        this.props.navigator.push(
            {
                component: component,
                passProps: {
                    // title: '二级页面',
                    title: title,
                    lastPageTitle: this.props.title,
                    // id:this.state.id,
                },
                // params :{
                //     id:this.state.id,
                // }
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

                <TouchableOpacity onPress={()=>{this.gotoPage(SecondPage, '客户列表');}}>
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

            id:9,
            newValue:0

        };

        this.num = 1;

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
                    lastPageTitle: this.props.title,
                    id: this.state.id

                }
            })
    }


    //List的分割线
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    // Header
    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    // Footer
    renderFooter = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;

    };

    _keyExtractor = (item, index) => item.id + '_' + index;

//setState 之后的state值不能立即使用,需要调整。
    jian(){
        let id = this.state.id;
        this.setState({id : id-1});
        alert('id减去1后的值：' + id);
    }

    add(){
        let id = this.state.id;
        this.setState({id : id},
            // () =>alert(this.state.id)
        );
        // alert('a加上1后的值：' + a);
    }

    handleSearch=()=>{
        // let id = this.state.id;
        // this.setState({id : id});
        // console.log(this.state.id)			//输出更新后的state
    }


    render()
    {

        // const { params } = this.props.navigation.state;
        return (
            <View style={{flex: 1, paddingTop:100}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <TouchableOpacity style={styles.flatitemview} onPress={()=>{this.gotoPage1(HuiYuan, <Text> {item.name}</Text>);
                    this.setState({id:item.id},() => {
                       //通过全局变量打印最新的值
                        global.aa=this.state.id;
                        // alert(this.state.id);
                        // this.setState({newValue:this.state.id});
                    });
                        // this.setState({id:item.id});
                        // this.jian();
                        // this.add();
                    }}>
                        <Text> {item.name}</Text>
                    </TouchableOpacity>
                    }

                    // keyExtractor={({id}, index) => id}
                    keyExtractor={this._keyExtractor} //把item.id作为key
                />
            </View>
        );
    }
};


class HuiYuan extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            newValue:0,
            dataSource:[]
        };
    }

    componentDidMount() {//组件挂载时执行的代码
        this.timerID = setInterval(
            () => this.tick(),
            1000 //每秒更新一次
        );

        this.setState({
            id:this.props.id,
            newValue:this.props.newValue,
            // id:this.props.num,

        })
    }

    tick() {//定时器
        this.setState({
            date: new Date(),//创建当前时间
            child:'删除',
        });
        this.getCustomerByNo();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);//清理计时器

    }

    //按点击的公司id向后台获取客户公司详情
    getCustomerByNo(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };


        var preurl ="http://119.23.77.187:8080/getCustomerByNo?id=";
        var url=preurl+Number(aa);
        // var url ="http://119.23.77.187:8080/getCustomerByNo?id=1";
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

    _keyExtractor = (item, index) => item.id + '_' + index;

    render() {
        return (
            <ScrollView style={{paddingTop: 80}}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                {/*通过全局变量aa,从上一个页面获取最新的值，即点击的公司id*/}
                <Text>公司id：{aa}</Text>
                <Text>公司名称：{this.state.dataSource.name}</Text>
                <Text>客户来源：{this.state.dataSource.source}</Text>
                <Text>需求产品：{this.state.dataSource.need}</Text>
                <Text>所在城市：{this.state.dataSource.city}</Text>
                <Text>    联系人：{this.state.dataSource.contacts}</Text>
                <Text>       职务：{this.state.dataSource.title}</Text>
                <Text>联系电话：{this.state.dataSource.phone}</Text>
                <Text>公司地址：{this.state.dataSource.address}</Text>
                <Text>公司网址：{this.state.dataSource.url}</Text>
                <Text>       备注：{this.state.dataSource.remark}</Text>
                <Text>创建时间：{this.state.dataSource.inputtime}</Text>
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
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
    flatitemimg: {
        width: '100%',
        height: 200,
    },
    flatitemview: {
        flex: 1,
        marginRight:10,
        marginBottom:10,
    },
    flatlistview: {
        // width: deviceWidth,
        paddingLeft:10,
        paddingTop:23,
        marginBottom:250,
    }

});

AppRegistry.registerComponent('TestNavigator', () => TestNavigator);
