import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import { Switch } from 'react-native-switch';


const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();
  let devices = [
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
  ]
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    //To handle switch toggle
    setSwitchValue(value);
    //State changes according to switch
  };


  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.sub_container}>
        <Image style={styles.tinyLogo} source={require('../assets/dp.png')} />
        <Text style={styles.title}>Syed Aashir</Text>
        <Text style={styles.desc}>Welcome to Home!</Text>
        <FlatGrid
          style={styles.flatGrid}
          itemDimension={130}
          data={devices}
          renderItem={({ item,index }) =>
          (<TouchableOpacity style={{backgroundColor: !switchValue ? '#fff' : '#33b2f2',height: 150,
    borderRadius: 12,
    elevation: 3,
    padding:20}}>
            <Text style={{color: !switchValue ? '#006944' : '#fff',fontWeight:'bold',
    fontSize:18,}} >{item.place}</Text>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.deviceCount}>{item.deviceCount} devices</Text>
            <Switch
              onValueChange={toggleSwitch}
              value={switchValue}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={20}
              barHeight={15}
              backgroundActive={'#afdaf0'}
              backgroundInactive={'#f7f7f7'}
              circleActiveColor={'#006994'}
              circleBorderWidth={0}
              circleInActiveColor={'#676f73'}
              changeValueImmediately={true}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf0f0'
  },
  tinyLogo: {
    width: 50,
    height: 50
  },
  sub_container: {
    flex: 1,
    margin: 20,
  },
  title: {
    color: '#006994',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  desc: {
    color: '#006994',
    fontSize: 12,
  },
  flatGrid: {
    flex: 1,
 
  },
  flatrow: {
    
  },
  place:{
  },
  description:{
    fontSize:12,
    color:'#bababa',
  },
  deviceCount:{
    fontWeight:'bold',
    color:"blue",
    marginVertical:10
  }
});
