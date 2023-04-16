import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import React,{useEffect} from 'react';
import Motivation from '../Components/Motivation';
import Steps from '../Components/Steps';
import Calories from '../Components/Calories';
import Navbar from '../Components/Nav';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const FitHome = () => {

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image source={require('../assets/dp.jpg')} style={styles.dp} />
        <View style={{flexDirection: 'column', marginTop: 15}}>
          <Text style={{color: 'gray', fontWeight: '700'}}>Hello Jack!</Text>
          <Text style={{color: 'black', fontWeight: '800', fontSize: 17}}>
            Good learner
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#F4EFFE',
            width: '10%',
            height: '30%',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 18,
            marginLeft: 90,
          }}>
          <Foundation name={'indent-more'} style={{fontSize: 18}} />
        </TouchableOpacity> */}
      </View>
      <Motivation />
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          fontSize: 20,
          marginBottom: 20,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Today's Goal
      </Text>
      <Calories Totcalories="800" Burntcalories="460" />
      <Steps TotSteps="10000" FinishedSteps="3000" />
    </View>
  );
};

export default FitHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nav: {
    marginTop: 30,
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,

    // backgroundColor:'black',
  },
  dp: {
    resizeMode: 'contain',
    height: '90%',
    width: '20%',
  },
});