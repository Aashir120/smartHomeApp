import React,{useState} from 'react';
import { View, Text, Button, StyleSheet,StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatGrid } from 'react-native-super-grid';
import BluetoothSerial from 'react-native-bluetooth-serial'
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';

const DetailsScreen = ({navigation}) => {
  let devices = [
    { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness' },
    { deviceName: 'TV', icon: 'ios-tv', status: '65% Brightness' },
    { deviceName: 'CCTV Camera', icon: 'ios-camera', status: '65% Brightness' },
    { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness' },
    { deviceName: 'Lamp', icon: 'ios-bulb', status: '65% Brightness' },
  ]
  const [toggled, setToggled] = useState(false);
  const [connected, setConnected] = useState(false);

  const toggleSwitch = (value) => {
    let data = "";
    
    setToggled(value)
    if(toggled != true){
        data = "T"
    }
    else{
      data = "F"
    }
    BluetoothSerial.write(data)
    .then((res) => {
      console.log(res);
      console.log(data);
      console.log('Successfuly wrote to device')
      setConnected(true)
    })
    .catch((err) => console.log(err.message))
  };

  const { colors } = useTheme();
  const theme = useTheme();
    return (
      <LinearGradient
        colors={['#006994', '#a5cdd9']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
                
      <View style={styles.container}>
          <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
          <View>
          <View style={{elevation:3,borderBottomRightRadius:20,borderBottomLeftRadius:20,backgroundColor:'#006994',padding:20}} >
          <TouchableOpacity>
          <Icon name='ios-arrow-back' size={32} color="#ffffff"/>
          
          </TouchableOpacity>
          <View style={{flexDirection:'row'}} >
          <View style={{flex:1,justifyContent:'center'}} >
          <Text style={styles.room}>Bed Room</Text>
          <Text style={styles.welcome}>Welcome to Home</Text>
          </View>
          <View style={{justifyContent:'center', paddingTop:10, alignItems:'center'}} >
          <Icon name='ios-cog' size={30} color="#ffffff"/>
          </View>
          </View>
          <View style={{marginTop:30}} >
          <View style={{flexDirection:'row'}} >
          <View style={{flexDirection:'row',flex:1}} >
          <View style={{
            backgroundColor:'#006994',height:50, paddingLeft:16, width:50,justifyContent:'center',alignContent:'center',borderRadius:50}}>
          <Icon name='ios-thermometer' size={40} color="#ffffff"/>
          </View>
          <View style={{justifyContent:'center',marginLeft:10}} >
          <Text style={{color:"#ffff",fontWeight:'700',fontSize:18}} >24 °C</Text>
          <Text style={{color:"#ffff"}}>TEMP</Text>
          </View>
          </View>
          <View style={{flexDirection:'row',flex:1}} >
          <View style={{
            backgroundColor:'#006994', paddingLeft:12, height:50,width:50,justifyContent:'center',alignContent:'center',borderRadius:50}}>
          <Icon name='ios-water' size={40} color="#ffffff"/>
          </View>
          <View style={{justifyContent:'center',marginLeft:10}} >
          <Text style={{color:"#ffff",fontWeight:'700',fontSize:18}} >50%</Text>
          <Text style={{color:"#ffff"}}>HUMIDITY</Text>
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
          data={devices}
          renderItem={({ item,index }) =>
          (<TouchableOpacity style={styles.flatrow}>
          <View style={{flexDirection:'row'}} >
          <View style={{justifyContent:'center',paddingBottom:20}} >
                    <Icon name={item.icon} size={35} color="#006994"/>
                    </View>

          <View style={{flex:1,justifyContent:'center',marginLeft:20}} >
            <Text style={styles.place} >{item.deviceName}</Text>
            <Text style={styles.description}>{item.status}</Text>
        </View>
            <View style={{justifyContent:'center'}} >
            <Switch
          onValueChange={toggleSwitch}
          value={toggled}
         />
         <Text>{toggled ? 'ON1': 'OFF1'}</Text>
            </View>
            </View>
            </TouchableOpacity>
          )}/>
      </View>
      </LinearGradient>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 

  },
  room:{
    fontWeight:'bold',
    fontSize:28,
    color:'#fff',
    marginTop:20
  },
  welcome:{
    color:'#ffdccb',
    fontSize:12
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
    marginHorizontal:20
  },
  flatrow: {
    backgroundColor: '#FFFf',
    height: 100,
    borderRadius: 12,
    elevation: 2,
    padding:20
  },
  place:{
    fontWeight:'bold',
    fontSize:18,
  },
  description:{
    fontSize:12,
    color:'#ababab',
    marginBottom:20
  },
  deviceCount:{
    fontWeight:'bold',
    color:"#fa8a49",
    marginVertical:10
  }
});
