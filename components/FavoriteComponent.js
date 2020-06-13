import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { deleteFavorite } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => {
    return {
        deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
    };
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {
    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {
            return(
                <SwipeRow rightOpenValue={-75}>
                    <View style={{ marginLeft: 285, width: 75}}>
                        <Button title='Delete' 
                            buttonStyle={{ backgroundColor: '#c90202', height: 70}}
                            onPress={() => {
                                Alert.alert(
                                    'Delete Favorite',
                                    'Are you sure you want to delete ' + item.name + ' from your favorites?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => {console.log(item.name + ' not deleted')},
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => {this.props.deleteFavorite(item.id)},
                                        }
                                    ],
                                    {cancelable: false}
                                )
                            }} />
                    </View>
                    <View>
                        <ListItem
                            key={index}
                            title={item.name}
                            hideChevron={true}
                            onPress={() => navigate('DishDetail', { dishId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image }}} 
                        />
                    </View>
                </SwipeRow>
            );
        }

        if(this.props.dishes.isLoading) 
            return(<Loading />);
        else if(this.props.dishes.errMess)
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );

        else 
            return(
                <SwipeListView 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);