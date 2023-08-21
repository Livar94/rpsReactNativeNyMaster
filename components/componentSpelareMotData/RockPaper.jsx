import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Animated } from 'react-native';
import Constants from 'expo-constants';
import DisplayResult from './DisplayResult';
import Actions from './Actions';
import Header from './Header';

export default function RockPaper(){
    const [userChoice, setuserChoice] = useState(0);
    const [computerChoice, setComputerChoice] = useState(0);
    const [result, setResult] = useState("");
    const [canPlay, setPlay] = useState(true);

    // Animation
    const fadeAnimation = useRef(new Animated.Value(1)).current;

    function play(choice){
        const randomComputerChoice = Math.floor(Math.random() * 3) + 1;
        let resultString = "";

        if (choice === 1) {
            resultString = randomComputerChoice === 3 ? "WIN" : "LOSE";   
        }
        else if (choice === 2) {
            resultString = randomComputerChoice === 1 ? "WIN" : "LOSE";
        }
        else {
            resultString = randomComputerChoice === 2 ? "WIN" : "LOSE";
        }


        if (choice === randomComputerChoice){
            resultString = "DRAW";
        }
        
        //vänta animation dölj gamla resultat

        setuserChoice(choice);
        setComputerChoice(randomComputerChoice);

        setTimeout (() => {
            setResult(resultString);
        }, 300);

        //animation dölj gamla resultat och visa nytt resultat
        Animated.sequence([
            Animated.timing(fadeAnimation, {
                toValue:0,
                duration:300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue:1,
                duration:300,
                useNativeDriver: true,
            }),
        ]).start();

        //inaktivera åtgärd när animering körs
        setPlay(false);
        setTimeout(() => {
            setPlay(true);
        }, 600);
    }
    return(
        <SafeAreaView style={styles.result.container}>
      
                <Header />
                <View style={styles.content}>
                    <View style={styles.result}>
                        <Animated.Text 
                        style={[styles.resultText, {opacity: fadeAnimation}]}
                        >

                            {result}    
                        </Animated.Text>
                    </View>
                    <View style={styles.screen}>
                        {!result ? (
                            <Text style={styles.readyText}>Let's Play</Text>
                        ) : (
                            
                            <DisplayResult
                                userChoice={userChoice}
                                computerChoice={computerChoice}
                            />
                        )}
                    </View>
                    <Actions play={play} canPlay={canPlay} />

                </View>
          
        </SafeAreaView>
    );

}



const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Constants.StatusBarHeight,
    },
    content : {
        flex:1,
        marginBottom: 5,
        backgroundColor: '#e8eaed',
    },
    result : {
        height:100,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    resultText : {
        fontSize:48,
        fontWeight: 'bold',
        // Lägg till föreslagen stil
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#333',
        marginTop: 10,
    },
    screen : {
        flex:1,
    },
    readyText : {
        marginTop: -70,
        alignSelf:'center',
        textAlign:'center',
        width:'100%',
        fontSize:48,
        fontWeight:'bold',
    }

});
