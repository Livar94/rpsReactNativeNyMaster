import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';



const Button = ({title, onPress}) => {

    return (

        <TouchableOpacity style={styles.button} onPress={onPress}>

            <Text style={styles.title}>{title}</Text>

        </TouchableOpacity>

    );

};


const styles = StyleSheet.create({

    button: {

        marginTop: 100,

        backgroundColor: '#2196F3',

        padding: 100,

        borderRadius: 5,

    },

    title: {

        fontSize: 16,

        color: '#fff',

        textAlign: 'center',

    },

});


export default Button;





