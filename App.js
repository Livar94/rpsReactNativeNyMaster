import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/FrontPage/HomeScreen';
import RockPaper from "./components/componentSpelareMotData/RockPaper";
import Online from './components/componentSpelareMotSpelare/Online';
import Game from './components/componentSpelareMotSpelare/Game'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Online" component={Online} />
                <Stack.Screen name="Game" component={Game} />
                <Stack.Screen name="RockPaper" component={RockPaper} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


