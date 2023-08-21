import {View, Text, StyleSheet} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import React from 'react'

const ICONS = ['hand-rock', 'hand-paper', 'hand-scissors'];

const DisplayResult = ({userChoice, computerChoice}) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.column}>
                    <FontAwesome5
                        name={ICONS[userChoice - 1]}
                        size={32}
                        color='#f9d835'
                        solid
                        style={userChoice === 3 ? styles.scissorsLeftIcon : styles.leftIcon}
                    />
                    <Text style={styles.playerName}>You</Text>
                </View>

                <View style={styles.column}>
                    <FontAwesome5
                        name={ICONS[computerChoice - 1]}
                        size={32}
                        color='#f9d835'
                        solid
                        style={
                            computerChoice === 3 ? styles.scissorsRightIcon : styles.rightIcon
                        }
                    />
                    <Text style={styles.playerName}>Computer</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 70,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 75
    },
    playerName: {
        color: '#373737',
        fontSize: 16,
        marginTop: 16,
    },
    leftIcon: {
        transform: [{rotateZ: '90deg'}],
    },
    scissorsLeftIcon: {
        transform: [{rotateZ: '180deg'}, {rotateX: '180deg'}],
    },
    rightIcon: {
        transform: [
            {rotateZ: '180deg'}, {rotateY: '180deg'}, {rotateX: '180deg'}
        ],
    },

    scissorsRightIcon: {
        transform: [{rotateZ: '180deg'}, {rotateX: '180deg'}, {rotateY: '180deg'}],
    },
});

export default DisplayResult