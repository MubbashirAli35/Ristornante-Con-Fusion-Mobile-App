import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigationComponent(props) {
    return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name === 'Login') 
                        iconName = 'sign-in';

                    else   
                        iconName = 'user-plus';

                    return(
                        <Icon name={iconName}
                            type='font-awesome'
                            size={24}
                            iconStyle={{ color: color }} /> 
                    );
                },
            })} 
            tabBarOptions={{
                activeTintColor: '#512DA8',
                inactiveTintColor: 'gray'
            }}
            initialRouteName='Login' >
                <Tab.Screen name='Login' component={Login} />
                <Tab.Screen name='Register' component={RegisterTab} />
            </Tab.Navigator>
    );
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            firsname: '',
            lastname: '',
            email: '',
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync();

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],

            });

            if(!capturedImage.cancelled) {
                this.setState({
                    imageUrl: capturedImage.uri
                });
            }
        }
            
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({
                    username: this.state.username, 
                    password: this.state.password,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email
                })
            )
            .catch((error) => console.log('could not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync(
                'userInfo'
            )
            .catch((error) => console.log('Cannot delete Login Info', error));
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.imageContainer} >
                    <Image source={{ uri: this.state.imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} />

                    <Button title='Camera' onPress={this.getImageFromCamera} />
                </View>
                <View style={styles.container} >
                    <Input placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} />

                    <Input placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    type='password' />

                    <Input placeholder='First Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname: firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput} />

                    <Input placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname: lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput} />

                    <Input placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}
                    containerStyle={styles.formInput} />

                    <CheckBox title='Remember Me'
                        checked={this.state.remember}
                        center
                        onPress={() => {this.setState({remember: !this.state.remember})}}
                        containerStyle={styles.formCheckbox} />

                    <View style={styles.formButton} > 
                        <Button onPress={() => this.handleRegister()}
                            title='Register'
                            color='#512DA8'
                            icon={<Icon name='user-plus'
                                        type='font-awesome'
                                        color='white'
                                        size={24} />} />
                    </View>
                    

                </View>
            </ScrollView>
        );
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userInfo = JSON.stringify(userdata);

                if(userInfo) {
                    this.setState({
                        username: userInfo.username,
                    });
                    this.setState({
                        password: userInfo.password,
                    });
                    this.setState({
                        remember: true,
                    });
                }
            })
    }

    handleLogin = () => {
        console.log(JSON.stringify(this.state));

        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log('could not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync(
                'userInfo'
            )
            .catch((error) => console.log('Cannot delete Login Info', error));
        }
    }

    render() {
        return(
            <View style={styles.container} >
                <Input placeholder='Username'
                   leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                   onChangeText={(username) => this.setState({username: username})}
                   value={this.state.username}
                   containerStyle={styles.formInput} />

                <Input placeholder='Password'
                   leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                   onChangeText={(password) => this.setState({password: password})}
                   value={this.state.password}
                   containerStyle={styles.formInput}
                   type='password' />

                <CheckBox title='Remember Me'
                    checked={this.state.remember}
                    center
                    onPress={() => {this.setState({remember: !this.state.remember})}}
                    containerStyle={styles.formCheckbox} />

                <View style={styles.formButton} > 
                    <Button onPress={() => this.handleLogin()}
                        title='Login'
                        color='#512DA8' />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "blue"
                        }}
                        />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },  
    formInput: {
        margin: 20,
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 20
    }
});

export default TabNavigationComponent;