// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Choose a Game Mode:</Text>
            <Button
                title="Spelare mot Data"
                onPress={() => navigation.navigate('RockPaper')}
            />
            <Text style={{ marginVertical: 20 }}>or</Text>
            <Button
                title="Spelare mot Spelare"
                onPress={() => navigation.navigate('Online')}      />
        </View>
    );
}
