import React , { useState }from 'react'
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../component/Card'
import Colors from '../constants/colors'
import Input from '../component/Input'
import NumberContainer from '../component/NumberContainer'

const StartGame = props => {
    const [ enteredValue, setEnteredValue ] = useState('')
    const [ confirmed, setConfirmed ] = useState(false)
    const [ selectedNumber, setSelectedNumber] = useState()

    const inputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }
    
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', "Number has to be a number between 1 and 99.", [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
        }
        setConfirmed(true)
        setSelectedNumber(parseInt(chosenNumber))
        setEnteredValue('')
    }


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input 
                        style={styles.input}
                        blurOnSubmit 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLength={2}
                        onChangeText={inputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button  title="Confirm" color={Colors.accent} onPress={confirmInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button  title="Reset" color={Colors.primary} onPress={resetInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmed ? 
                    <Card style={styles.summaryContainer}>
                        <Text>You Selected</Text>
                        <NumberContainer>{selectedNumber}</NumberContainer>
                        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
                    </Card>
                    : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default StartGame

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 20
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: 300,
        maxWidth: '80%'
    }
})