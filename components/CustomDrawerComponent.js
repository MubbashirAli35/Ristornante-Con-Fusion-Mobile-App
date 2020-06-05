import React from 'react';
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItems } from '@react-navigation/drawer';

function CustomDrawerContentComponent(props) {
    return(
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
    );
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

export default CustomDrawerContentComponent;