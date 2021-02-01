import React , { useState, useRef, useEffect } from 'react'
import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import NumberContainer from '../component/NumberContainer'
import Card from '../component/Card'

const generateNumber = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randNum = Math.floor(Math.random() * (max - min) + min);
    if( randNum === exclude) {
        return  generateNumber(min, max, exclude)
    } else {
        return randNum
    }
}

const GameScreen = props => {
    const [ currentGuess, setCurrentGuess ] = useState(generateNumber(1, 100, props.userChoice))
    const [ rounds, setRounds ] = useState(0)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice , onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = hint => {
        // check hint is correct
        if((hint === 'lower' && currentGuess < props.userChoice) || (hint === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Wrong!!', 'You can do better', [{text: 'Sorry', style: 'cancel'}])
            return
        }
        if (hint === 'lower') {
            currentHigh.current = currentGuess;
        } else if (hint === 'greater') {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateNumber(currentLow.current, currentHigh.current ,currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttons}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})
