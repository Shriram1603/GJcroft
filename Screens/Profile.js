import React,{useEffect}from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';


import firestore from '@react-native-firebase/firestore';




import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('loggedin', value);
    } catch (e) {
      // saving error
    }
  };

  const [uid, setUid] = React.useState('');
  const [data, setdata] = React.useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid').then(value => {
        setUid(value);
     
      });
    } catch (e) {
      // error reading value
      console.log('Error', e.message);
    }
  };

  useEffect(() => {
    getData();
    addProduct()
   
  }, []);

  const addProduct = async data => {
    console.log(uid);
   
    console.log(data)
    try {
      await firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('User data: ', documentSnapshot.data());
            setdata(documentSnapshot.data())
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 25, fontWeight: '700'}}>
        Profile
      </Text>
      <View>
        <Image source={require('../assets/dp.jpg')} style={styles.dp} />
        <Text
          style={{
            fontWeight: '700',
            marginTop: 15,
            alignSelf: 'center',
            fontSize: 18,
            color: 'black',
          }}>
          Jack!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(50,50,59,0.4)',
            flex: 0,
            width: 140,
            alignItems: 'center',
            height: 120,
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <Text style={{fontWeight: '500', fontSize: 16, color: 'black'}}>
            Height : {data.height} cm
          </Text>
          <Text
            style={{
              fontWeight: '500',
              marginTop: 15,
              fontSize: 16,
              color: 'black',
            }}>
            Weight : {data.weight} kg
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(50,50,59,0.4)',
            flex: 0,
            width: 140,
            alignItems: 'center',
            height: 120,
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <Text style={{fontWeight: '900', fontSize: 20, color: 'black'}}>
            BMI
          </Text>
          <Text
            style={{
              fontWeight: '500',
              marginTop: 15,
              fontSize: 18,
              color: 'black',
            }}>
            {Math.round(data.weight / (data.height/100)^2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'lightblue',
          flex: 0,
          width: '100%',
          alignItems: 'center',
          height: 90,
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
            color: 'black',
            marginLeft: 20,
          }}>
          Water Level:
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            color: 'black',
            marginLeft: 60,
          }}>
          80%
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'lightblue',
          flex: 0,
          width: '100%',
          alignItems: 'center',
          height: 90,
          borderRadius: 20,
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
            color: 'black',
            marginLeft: 20,
          }}>
          Sleep Schedule:
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            color: 'black',
            marginLeft: 20,
          }}>
          8 hrs
        </Text>
      </View>
      <Text
        onPress={() => {
          storeData('false');
          navigation.navigate('FitLogin');
        }}
        style={styles.logout}>
        Log Out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  nav: {
    marginTop: 30,
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'flex-start',
    marginLeft: 10,

    // backgroundColor:'black',
  },
  dp: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  logout: {
    margin: 20,
    fontWeight: '500',
    fontSize: 15,
    color: 'red',
  },
});
export default Profile;
