import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapDispatchToProps = dispatch => {
    return {
        postFavorite: (dishId) => dispatch(postFavorite(dishId)),
        postComment: (dishId, author, comment, rating) => dispatch(postComment(dishId, author, comment, rating))
    };
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

function RenderDish(props) {
    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if(dx < -200)
            return true;
        else 
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {return true; },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add' + dish.name + ' to your favorites',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('')
                        },
                        {
                            text: 'Yes',
                            onPress: () => {props.favorite ? console.log('Already favorite') : props.onFavoritePress()}
                        }
                    ],
                    {cancelable: true}
                )
        } 
    })

    if(dish != null) {
        return(
            <Animatable.View animation='fadeInDown' duration={1000} delay={1000} {...panResponder.panHandlers} >
                <Card featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.iconsRow}>
                        <Icon raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o' }
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onFavoritePress()} />
                        <Icon raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onCommentPress()} />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return(
            <View>
                <Text></Text>
            </View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <Animatable.View animation='fadeInUp' duration={1000} delay={1000} >
                <View key={index}>
                    <Text style={{fontSize: 14}} >{item.comment}</Text>
                    <Text style={{fontSize: 12}} >{item.rating} stars</Text>
                    <Text style={{fontSize: 12}} >{'-- ' + item.author + ', ' + item.date}</Text>
                    <Text></Text>
                </View>
            </Animatable.View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList data={comments}
                      renderItem={renderCommentItem}
                      keyExtractor={item => item.id.toString()} />
        </Card>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.author = '';
        this.comment = '';
        this.rating = 3;

        this.state = {
            favorites: [],
            modalVisible: false, 
            rating: 0,
            author: '',
            comment: '',
            modVisible: false
        }
    }

    updateRating = (rating) => {
        this.rating = rating;
    }

    updateAuthor = (author) => {
        this.author = author;
    }

    updateComment = (comment) => {
        this.comment = comment;
    }

    handleSubmission(dishId) {
        this.setState({
            rating: this.rating,
            author: this.author,
            comment: this.comment
        });

        console.log(this.state.author);
        console.log(this.state.comment);
        console.log(this.state.rating);

        this.props.postComment(
            dishId, 
            this.author, 
            this.comment, 
            this.rating
        );

        this.toggleModal();
    }

    toggleMod() {
        this.setState({
            modVisible: !this.state.modVisible
        });
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOption = {
        title: 'Dish Details'
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                            favorite={this.props.favorites.some(el => el === dishId)}
                            onFavoritePress={() => this.markFavorite(dishId)}
                            onCommentPress={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType='slide'
                       visible={this.state.modalVisible} 
                       transparent={false}
                        >
                    <View style={styles.ratingComponent}>
                        <Rating ratingCount={5}
                                showRating={true}
                                onFinishRating={(rating) => this.updateRating(rating)}
                                 />
                    </View>
                    <View style={{ marginBottom: 0}} >
                        <Input placeholder='Author' 
                               leftIcon={<Icon type='font-awesome' name='user-o' />}
                               onChangeText={(input) => this.updateAuthor(input)} />
                        <Input placeholder='Comment' 
                               leftIcon={<Icon type='font-awesome' name='comment-o'/>}
                               onChangeText={(input) => {this.updateComment(input)}} />
                    </View>
                    <View style={{ marginBottom: 200, marginTop: 20}}>
                        <View style={{width: 200, marginLeft: 70 }} >
                            <Button title='SUBMIT' color='#512DA8' onPress={() => this.handleSubmission(dishId)} />
                        </View>
                        <View style={{ marginTop: 10, width: 200, height: 75, marginLeft: 70 }} >
                            <Button title='CANCEL' color='#969696' onPress={() => this.toggleModal()} />
                        </View>
                    </View>
                </Modal>
                <Modal animationType='slide'
                       transparent={false}
                       visible={this.state.modVisible} >
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    iconsRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    ratingComponent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    inputFormRow: {
       
        flexDirection: 'row'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);