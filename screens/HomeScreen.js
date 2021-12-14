import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const[devices,setDevices] = useState([
    { place: 'Living Room', desc: '3 family members have access', deviceCount: '4' },
    { place: 'Bed Room', desc: '3 family members have access', deviceCount: '5' },
    { place: 'Dining Room', desc: '3 family members have access', deviceCount: '3' },
    { place: 'Hall', desc: '3 family members have access', deviceCount: '2' },
    { place: 'Kitchen', desc: '3 family members have access', deviceCount: '1' },
    { place: 'Gallery', desc: '3 family members have access', deviceCount: '3' },
  ])

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
          (<TouchableOpacity onPress={()=>navigation.navigate('Details',item)} style={{height: 150,
    borderRadius: 12,
    elevation: 3,
    padding:20}}>
            <Text style={{fontWeight:'bold',
    fontSize:18,}} >{item.place}</Text>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.deviceCount}>{item.deviceCount} devices</Text>
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
    color:'gray',
    marginTop:5
  },
  deviceCount:{
    fontWeight:'bold',
    color:"blue",
    marginVertical:10
  }
});
