import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatGrid } from 'react-native-super-grid';
import BluetoothSerial from 'react-native-bluetooth-serial'
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';
import database from '@react-native-firebase/database';

export default class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: [
        { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness', isOn: false },
        { deviceName: 'TV', icon: 'ios-tv', status: '65% Brightness', isOn: false },
        { deviceName: 'CCTV Camera', icon: 'ios-camera', status: '65% Brightness', isOn: false },
        { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness', isOn: false },
        { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness', isOn: false },
      ],
      connected: false

    }
  }

  componentDidMount(){
    this.state.connected = false
    const reference = database().ref('/Rooms');
                          reference.update({
                              connected:this.state.connected
                          })
  }

  render() {
    const { navigation } = this.props;
    console.log("connected",this.state.connected);
    return (
      <LinearGradient
        colors={['#006994', '#a5cdd9']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

        <View style={styles.container}>
          <View>
            <View style={{ elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#006994', padding: 20 }} >
              <TouchableOpacity>
                <Icon name='ios-arrow-back' onPress={() => navigation.goBack()} size={32} color="#ffffff" />

              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1, justifyContent: 'center' }} >
                  <Text style={styles.room}>Living Room</Text>
                  <Text style={styles.welcome}>Welcome to Home</Text>
                </View>
                <View style={{ justifyContent: 'center', paddingTop: 10, alignItems: 'center' }} >
                  <Icon name='ios-cog' size={30} color="#ffffff" />
                </View>
              </View>
              <View style={{ marginTop: 30 }} >
                <View style={{ flexDirection: 'row' }} >
                  <View style={{ flexDirection: 'row', flex: 1 }} >
                    <View style={{
                      backgroundColor: '#006994', height: 50, paddingLeft: 16, width: 50, justifyContent: 'center', alignContent: 'center', borderRadius: 50
                    }}>
                      <Icon name='ios-thermometer' size={40} color="#ffffff" />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10 }} >
                      <Text style={{ color: "#ffff", fontWeight: '700', fontSize: 18 }} >24 °C</Text>
                      <Text style={{ color: "#ffff" }}>TEMP</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1 }} >
                    <View style={{
                      backgroundColor: '#006994', paddingLeft: 12, height: 50, width: 50, justifyContent: 'center', alignContent: 'center', borderRadius: 50
                    }}>
                      <Icon name='ios-water' size={40} color="#ffffff" />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10 }} >
                      <Text style={{ color: "#ffff", fontWeight: '700', fontSize: 18 }} >50%</Text>
                      <Text style={{ color: "#ffff" }}>HUMIDITY</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <FlatGrid
            spacing={15}
            style={styles.flatGrid}
            itemDimension={300}
            data={this.state.devices}
            renderItem={({ item, index }) =>
            (<TouchableOpacity style={styles.flatrow}>
              <View style={{ flexDirection: 'row' }} >
                <View style={{ justifyContent: 'center', paddingBottom: 20 }} >
                  <Icon name={item.icon} size={35} color="#006994" />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }} >
                  <Text style={styles.place} >{item.deviceName}</Text>
                  <Text style={styles.description}>{item.status}</Text>
                </View>
                <View style={{ justifyContent: 'center' }} >
                  <Switch
                  activeText={'On'}
                  inActiveText={'Off'}
                  circleSize={20}
                  barHeight={15}
                  circleBorderWidth={0}
                  backgroundActive={'#a5cdd9'}
                  backgroundInActive={'#f7f7f7'}
                  circleActiveColor={'#006994'}
                  circleInActiveColor={'#e5e5e5'}
                  changeValueImmediately={true}
                  
                  innerCircleStyle={{
                    alignItems:'center',
                    justifyContent:'center'

                  }}
                  outerCircleStyle={{}}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2}
                  switchRightPx={2}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}

                    onValueChange={(val) => {
                      let btn = this.state.devices;
                      btn[index].isOn = val;
                      this.setState({ devices: btn });
                      let data = "";

                      if (val != true) {
                        data = "T"
                      }
                      else {
                        data = "F"
                      }
                      BluetoothSerial.write(data)
                        .then((res) => {
                          console.log(res);
                          console.log(data);
                          console.log('Successfuly wrote to device')
                          this.setState({ connected: true })
                            const reference = database().ref('/Rooms');
                          reference.update({
                              toggled:val,
                              connected:this.state.connected
                          })
                          // reference.on('value',snapshot=>{
                          //   console.log('user data',snapshot.val());
                          // })
                        })
                        .catch((err) => console.log(err.message))

                    }}
                    value={item.isOn}
                  />
                </View>
              </View>
            </TouchableOpacity>
            )} />
        </View>
      </LinearGradient>
    );
  };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  room: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    marginTop: 20
  },
  welcome: {
    color: '#ffdccb',
    fontSize: 12
  },
  title: {
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  desc: {
    color: '#ffdccb',
    fontSize: 12
  },
  flatGrid: {
    flex: 1,
    marginHorizontal: 20
  },
  flatrow: {
    backgroundColor: '#FFFf',
    height: 100,
    borderRadius: 12,
    elevation: 2,
    padding: 20
  },
  place: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    color: '#ababab',
    marginBottom: 20
  },
  deviceCount: {
    fontWeight: 'bold',
    color: "#fa8a49",
    marginVertical: 10
  }
});
