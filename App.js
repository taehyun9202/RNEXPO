import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/Header'
import StartGame from './Screens/StartGame'
import GameScreen from './Screens/GameScreen'
import GameOver from './Screens/GameOver'

export default function App() {
  const [ userNumber, setUserNumber ] = useState()
  const [ rounds, setRounds ] = useState(0)

  const newGameHandler = () => {
    setRounds(0);
    setUserNumber(null)
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = numOfRounds => {
    setRounds(numOfRounds)
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number'/>
      { userNumber && rounds <= 0 ? 
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/> :
        <StartGame onStartGame={startGameHandler} />
      }
      { rounds > 0 ? <GameOver roundsNumber={rounds} userNumber={userNumber} onRestart={newGameHandler}/> : false }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
