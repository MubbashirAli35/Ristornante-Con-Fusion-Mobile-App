import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { fetchComments, fetchDishes, fetchPromos, fetchLeaders} from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => {
    return {fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),}
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const Stack = createStackNavigator();

function MenuNavigator({props, navigation}) {
    return(
        <Stack.Navigator initialRouteName='Menu'
                         screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                             },
                             headerLeft: () => {
                                <Icon name="menu"/>
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff'
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="Menu" options={{title: 'Menu', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }}>
                {props => <Menu {...props} />}
            </Stack.Screen>

            <Stack.Screen name="DishDetail" component={DishDetail} options={{title: 'Dish Details', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);}}}/>
            <Stack.Screen name="ContactUs" component={Contact} options={{ title: 'Contact Us', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />
            <Stack.Screen name="AboutUs" component={About} options={{ titile: 'About Us', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

function AboutNavigator({ navigation }){
    return(
        <Stack.Navigator     screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff'
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="AboutUs" component={About} options={{ title: 'About Us', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

function ContactNavigator({ navigation }) {
    return(
        <Stack.Navigator     screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff'
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="ContactUs" component={Contact} options={{ title: 'Contact Us', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

function ReservationNavigatior({ navigation }) {
    return(
        <Stack.Navigator     screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff'
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="Reservation" component={Reservation} options={{ title: 'Reserve a Table', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

function FavoritesNavigatior({ navigation }) {
    return(
        <Stack.Navigator     screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff'
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'My Favorites', headerLeft: () => {return(<Icon name='menu' size={24} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function HomeNavigator({ navigation }) {
    return(
        <Stack.Navigator     screenOptions={{
                             headerStyle:  {
                                 backgroundColor: '#512DA8',
                                 height: 60
                             },
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 color: '#fff',
                                 marginBottom: 20
                             }
                         }} >

            {/*<Stack.Screen name="Menu" component={() => <Menu dishes={props.dishes} onPress={props.onDishPress}
                                                             navigation={props.navigation} />} /> */}

            <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerLeft: () => {return(<Icon name='menu' iconStyle={{marginLeft: 13, marginBottom: 20}} size={24} color='white'
                                                                                                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />);} }} />

        </Stack.Navigator>
    );
}

function CustomDrawerContentComponent(props) {
    return(
        <DrawerContentScrollView {...props} >
            <SafeAreaView style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText} >Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
           
        </DrawerContentScrollView>
    );
}

/*const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}} style={styles.drawerImage} >
                    <Image source={require('./images/logo.png')} />
                </View>
                <View style={{flex: 2}, styles.drawerHeaderText}>
                    <Text>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);*/

function MainNavigator(props) {
    return(
        <Drawer.Navigator initialRouteName="Home" 
            drawerStyle={{ backgroundColor: '#D1C4E9'}}
            drawerContent={props => <CustomDrawerContentComponent {...props} />} >
            <Drawer.Screen name="Home" component={HomeNavigator} options={{ title: 'Home', 
                                                                            drawerLabel: 'Home', 
                                                                            drawerIcon: ({tintColor}) => {return(<Icon name='home' type='font-awesome' size={24} color={tintColor} />);}
                                                                         }} />
            <Drawer.Screen name="Menu" options={{ title: 'Menu', 
                                                  drawerLabel: 'Menu',
                                                  drawerIcon: ({tintColor}) => {return(<Icon name='list' type='font-awesome' size={24} color={tintColor} />);} }}>
                {((props) => <MenuNavigator {...props} />)}
            </Drawer.Screen>
            <Drawer.Screen name="ContactUs" component={ContactNavigator} options={{ title: 'Contact Us', 
                                                                                    drawerLabel: 'Contact Us',
                                                                                    drawerIcon: ({tintColor}) => {return(<Icon name='address-card' type='font-awesome' size={20} color={tintColor} />);} }} />
            <Drawer.Screen name="AboutUs" component={AboutNavigator} options={{ title: 'About Us', 
                                                                                drawerLabel: 'About Us',
                                                                                drawerIcon: ({tintColor}) => {return(<Icon name='info-circle' type='font-awesome' size={26} color={tintColor} />);}}} />
            
            <Drawer.Screen name="Reservation" component={ReservationNavigatior} options={{ title: 'Reservation', 
                                                                                drawerLabel: 'Reserve a Table',
                                                                                drawerIcon: ({tintColor}) => {return(<Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />);}}} />
            
            <Drawer.Screen name="Favorites" component={FavoritesNavigatior} options={{ title: 'My Favorites', 
                                                                                drawerLabel: 'My Favorites',
                                                                                drawerIcon: ({tintColor}) => {return(<Icon name='heart' type='font-awesome' size={24} color={tintColor} />);}}} />
            
        </Drawer.Navigator>
    );
}

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }

        this.props.fetchLeaders();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchDishes();
    }

    componentDidMount() {
        
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        });
    }

    /* MenuNavigator() {
        return(
            <Stack.Navigator initialRouteName='Menu'
                             screenOptions={{
                                 headerStyle:  {
                                     backgroundColor: '#512DA8',
                                     height: 50
                                 },
                                 headerTintColor: '#fff',
                                 headerTitleStyle: {
                                     color: '#fff'
                                 }
                             }} >
    
                <Stack.Screen name="Menu" component={<Menu dishes={this.state.dishes}
                                                           onPress={(dishId) => {this.onDishSelect(dishId)}}
                                                           navigation={this.props.navigation} />} />

                <Stack.Screen  name="DishDetail" component={<DishDetail />} />
    
            </Stack.Navigator>
        );
    } */

    render() {
        return(
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>

                    {/*<Stack.Navigator initialRouteName="Menu">
                        {/*<Menu dishes={this.state.dishes} 
                            onPress={(dishId) => this.onDishSelect(dishId)} 
                        />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />}
                        <Stack.Screen name="Menu" component={() => <Menu dishes={this.state.dishes} 
                                                                    onPress={(dishId) => this.onDishSelect(dishId)} />} />
                        <Stack.Screen name="DishDetail" component={() => <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />} />
    </Stack.Navigator>*/}
                <SafeAreaProvider>
                    <NavigationContainer>
                        <MainNavigator dishes={this.props.dishes.dishes} onDishPress={(dishId) => {this.onDishSelect(dishId)}} />
                    </NavigationContainer>
                </SafeAreaProvider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8', 
        height: 140,
        alignItems: "center",
        justifyContent: 'center',
        flex: 1, 
        flexDirection: 'row',

    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    }
}); 

export default connect(mapStateToProps, mapDispatchToProps)(Main);