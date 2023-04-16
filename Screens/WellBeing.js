import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import React from 'react';
import Slider from '@react-native-community/slider';

const WellBeing = () => {
  const [Water, setWater] = useState('0');
  const [sleep, setsleep] = useState('');
  const [sliding1, setsliding1] = useState('inActive');
  const [sliding, setsliding] = useState('inActive');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFF',
      }}>
      <Text style={styles.h}>Hydration</Text>
      <View style={styles.water}>
        <View style={styles.btxt}>
          <Text style={styles.data}>{Water} liters</Text>
          <Text style={styles.data}> {sliding}</Text>
        </View>
        <Slider
          style={{width: 300, height: 100}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="skyblue"
          maximumTrackTintColor="blue"
          thumbTintColor="skyblue"
          value={0}
          onValueChange={value => setWater(Math.round(value))}
          onSlidingStart={() => setsliding('Measuring')}
          onSlidingComplete={() => setsliding('inActive')}
        />
      </View>

      <Text style={styles.h}>sleep</Text>
      <View style={styles.sleep}>
        <View style={styles.btxt}>
          <Text style={styles.data}>{sleep} hours</Text>
          <Text style={styles.data}>{sliding1}</Text>
        </View>
        <Slider
          style={{width: 300, height: 100}}
          minimumValue={0}
          maximumValue={12}
          minimumTrackTintColor="purple"
          maximumTrackTintColor="pink"
          thumbTintColor="purple"
          value={0}
          onValueChange={value => setsleep(Math.round(value))}
          onSlidingStart={() => setsliding1('Measuring')}
          onSlidingComplete={() => setsliding1('inActive')}
        />
      </View>
    </View>
  );
};

export default WellBeing;

const styles = StyleSheet.create({
  h: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  water: {
    backgroundColor: 'lightblue',
    width: '90%',
    borderRadius: 40,
    alignItems: 'center',
  },
  btxt: {
    // alignItems:"flex-start",
    // marginLeft:40,
    // marginTop:40,
    marginBottom: -20,
    marginTop: 20,
  },
  data: {
    fontSize: 20,
    fontWeight: '600',
  },
  sleep: {
    backgroundColor: 'violet',
    width: '90%',
    borderRadius: 40,
    alignItems: 'center',
  },
});
