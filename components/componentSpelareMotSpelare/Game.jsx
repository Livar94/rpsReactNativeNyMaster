import React , {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function Game({route, navigation }) {
  const [gameOver, setGameOver] = useState(false)
  const [gameInfo, setGameInfo] = useState(null)
  const choices = ['ROCK', 'PAPER', 'SCISSORS']
  const [gameData, setGameData] = useState(null)
  const [user1Label, setUser1Label] = useState('')
  const [user2Label, setUser2Label] = useState('')
  const [userScore, setUserScore] =useState(0)
  const [user2Score, setUser2Score] =useState(0)
  const [result_p, setResult_p] =useState('')
  const [intervalId, setIntervalId] = useState(null);
  const [movesMade, setMovesMade] = useState(false);
  const [userMove, setUserMove] = useState(null);


    useEffect(() => {
      setGameInfo(route?.params?.data)

    }, []);

    useEffect(() => {
      if (!gameInfo?.gameId || !gameInfo.playerOne?.playerId) {
          console.log("Incomplete gameInfo, not starting the game loop.");
          return;
      }
  
      const id = setInterval(() => {
          fetchGameInfo(gameInfo);
      }, 1000);
  
      setIntervalId(id);
  
      return () => {
          clearInterval(id);
      };
  }, [gameInfo]);

  

  
    useEffect(() => {
      const id = setInterval(() => {
        fetchGameInfo(gameInfo);
      }, 1000);
  
      setIntervalId(id);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [gameInfo]);
  
    function fetchGameInfo(gameInfo) {

      if (!gameInfo?.gameId) {
        console.log("No game ID provided, not making the fetch call.");
        return;
    }

      console.log("Current gameInfo:", gameInfo); // Added console log





        if (!gameInfo.gameId || !gameInfo.playerOne?.playerId) {
          console.log("Incomplete gameInfo, not making the fetch call.");
          return;
  }

  fetch(`http://192.168.1.108:8080/api/games/${gameInfo?.gameId}`,{
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          playerId: gameInfo?.playerOne?.playerId
      })
  })
  .then(response => {
      if (!response.ok) {
          console.error("Server returned an error:", response.statusText); 
          return null; 
      }
      return response.json();
  })
  .then(data => {
      if (data && data.message !== "No game found") { 
                console.log("Received gameData:", data);
      
        setGameData(data)
        if (gameInfo?.playerOne?.playerName == data?.playerOne) {
            
      setUser1Label(gameInfo?.playerOne?.playerName)
      setUser2Label(data?.playerTwo)
  
            } else {
         
      setUser1Label(data?.playerOne)
      setUser2Label(gameInfo?.playerOne?.playerName)
      }
      setUserScore(data?.playerOneWins)
      setUser2Score(data?.playerTwoWins)
  
              if (gameInfo?.playerOne?.playerName == data?.playerOne) {
                
                setResult_p(`You ${data?.playerOneMove}, ${data?.playerTwo} ${data?.playerTwoMove}`)
  
              } else {
                
                setResult_p(`You ${data?.playerTwoMove}, ${data?.playerOne} ${data?.playerOneMove}`)
              };
            } else if (data.message === "No game found") {
              console.log("No game exists yet.");
          }
      })
      .catch(error => {
      });
  }


  function makeMove(move) {
    if (!gameInfo) return
    fetch(`http://192.168.1.108:8080/api/games/move`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        playerId: gameInfo?.playerOne?.playerId,
        gameId: gameInfo?.gameId,
        playerMove: move
  
        
      })
    })
    .then(response => response.json())
    .then(data => {
        setGameData(data)
      console.log(gameInfo, 'Moved')
    })
    .catch(error => {
      console.log(error, "createGame");
     
  
    });
  
  }






  return (
    <View style={styles.container} >
     
    <Text style={styles.heading}>Rock Paper Scissors</Text>
    <View style={styles.score}>
      <Text style={styles.scoreText}>{user1Label} : {userScore}</Text>
      <Text style={styles.scoreText}>{user2Label}: {user2Score}</Text>
    </View>
    <View style={styles.buttonDiv}>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={choice}
          style={styles.button}
          onPress={() => makeMove(choice)}
        >
          <Text style={styles.buttonText}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.buttonDiv}>
      {gameOver && (
        <TouchableOpacity style={styles.button} onPress={() => reset()}>
          <Text style={styles.buttonText}>Restart Game</Text>
        </TouchableOpacity>
      )}
    </View>
    <View>
    {gameOver && <Text>{result_p}</Text>}
    {!gameOver && movesMade && <Text>{result_p}</Text>}
    {!gameOver && !movesMade && userMove && <Text>You {userMove}</Text>}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    score: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    scoreText: {
      fontSize: 18,
    },
    buttonDiv: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  
  });
  

export default Game