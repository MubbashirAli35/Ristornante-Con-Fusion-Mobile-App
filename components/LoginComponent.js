import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;