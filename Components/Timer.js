import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import CountDown from 'react-native-countdown-component'
import CountDownTimer from 'react-native-countdown-timer-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Timer = () => {
  const [uid, setUid] = React.useState('');
  const [data, setData] = React.useState('');
  const [Cal, setCal] = React.useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid').then(value => {
        setUid(value);
        addProduct('');
      });
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addProduct = async data => {
    console.log(uid);
    try {
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setCal(documentSnapshot.data().Calories);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // const complete =()=>{

  const Calories = async data => {
    try {
      await firestore().collection('Users').doc(uid).set(
        {
          Calories: data,
        },
        {merge: true},
      );
      console.log('Value Added!');
    } catch (error) {
      console.log(error);
    }
  };
  // }
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(true);
  const [timerEnd, setTimerEnd] = useState(false);

  const timerCallbackFunc = timerFlag => {
    // Setting timer flag to finished
    setCal(Cal + 100);
    Calories(Cal);
    setTimerEnd(timerFlag);
    navigation.navigate('Exercises');
  };

  return (
    <View style={styles.container}>
      <CountDownTimer
        size={30}
        timestamp={2}
        timerCallback={timerCallbackFunc}
        digitStyle={{
          backgroundColor: '#FFF',
          borderWidth: 2,
          borderColor: '#1CC625',
        }}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        // timeLabels={{h:"H",m: "M", s: "S"}}
        showSeparator
        containerStyle={{
          height: 56,
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          backgroundColor: '#2196f3',
        }}
        textStyle={{
          fontSize: 25,
          color: '#FFFFFF',
          fontWeight: '500',
          letterSpacing: 0.25,
        }}
      />
      {isLoading ? (
        <View />
      ) : (
        <TouchableOpacity
          style={{
            height: 50,
            margin: 20,
            backgroundColor: '#D268CC',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
          }}
          onPress={() => navigation.navigate('Exercises')}>
          <Text style={{color: 'white'}}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});