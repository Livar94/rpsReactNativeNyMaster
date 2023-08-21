import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';



export default function Player({ navigation }) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  function getToken(func, p1) {
    fetch('http://192.168.1.108:8080/api/user/auth/token', {
      method: 'post',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'token');
        setToken(data);
        func(p1, data);
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  }

  function postName(name, token) {
    console.log(token, name, 'nameToken');
    fetch('http://192.168.1.108:8080/api/user/name', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'response');
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error.message);
      });
  }

  function createGame() {
    fetch('http://192.168.1.108:8080/api/games/game', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerId: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('Game', {
          
            data
      
        });
      })
      .catch((error) => {
        console.log(error, 'createGame');
      });
  }

  function fetchGames() {
    fetch('http://192.168.1.108:8080/api/games/games', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'games');
        setGames(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function joinGame(gameId) {
    console.log(gameId, token, 'getting game and player id');
    fetch(`http://192.168.1.108:8080/api/games/join`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        gameId: gameId,
      },
      body: JSON.stringify({
        playerId: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'joined game');
        navigation.navigate('Game', {
         
            data: {
              gameId,
              playerOne: { playerId: token, playerName: name },
            }

        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
    




    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{ borderWidth: 1, padding: 10, width: 200 }}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="write name"
        />
        <Button
          title="Write Name"
          onPress={() => {
            if (!token) getToken(postName, name);
          }}
        />
      </View>
      {token ? (
        <View>
          <Button title="Create Game" onPress={createGame} />
          <Text>All open games:</Text>
          <FlatList
              data={games}
              keyExtractor={(item) => String(item?.gameId)}
              renderItem={({ item, index }) => (
            <View style={{ marginVertical: 5 }}>
            <Button 
                    title={`Game #${index + 1}`} 
                    onPress={() => joinGame(item?.gameId)} 
                  />
            </View>
              )}
          />
        </View>
      ) : null}
    </View>
    );
};

