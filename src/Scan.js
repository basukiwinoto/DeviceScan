import React, {useState, useEffect} from 'react'
import {ScrollView, Text} from 'react-native'
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location'
import Contacts from 'react-native-unified-contacts';

import TextBox from './TextBox'

const Scan = (props)=>{
  const [uniqueId, setUniqueId] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [batteryLevel, setBatteryLevel] = useState(0)
  const [carrier, setCarrier] = useState("")
  const [deviceName, setDeviceName] = useState("")

  useEffect(()=>{
    setUniqueId(DeviceInfo.getUniqueId())
    DeviceInfo.getManufacturer().then((result)=>{setManufacturer(result)})
    DeviceInfo.getBatteryLevel().then((result)=>{setBatteryLevel(result)})
    DeviceInfo.getCarrier().then((result)=>{setCarrier(result)})
    DeviceInfo.getDeviceName().then((result)=>{setDeviceName(result)})
  }, [uniqueId, manufacturer, batteryLevel, carrier, deviceName])

  const [location, setLocation] = useState({})
  const [contacts, setContacts] = useState({})

  useEffect(()=>{
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then((result)=>{setLocation(result)})
    .catch(()=>{})
  }, [location])

  useEffect(()=>{
    Contacts.getContacts( (error, result) =>  {
      if (!error) {
        setContacts(result);
      }
    })
  }, [contacts])

  return(
    <ScrollView style={{flex:1}}>
      <TextBox label="Device ID:" content={uniqueId} />
      <TextBox label="Manufacturer:" content={manufacturer} />
      <TextBox label="Battery:" content={Math.floor(batteryLevel*100)} />
      <TextBox label="Carrier:" content={carrier} />
      <TextBox label="Name:" content={deviceName} />
      <Text></Text>
      <TextBox label="Location:" content={JSON.stringify(location)} />
      <Text></Text>
      <TextBox label="Contacts:" content={JSON.stringify(contacts)} />
    </ScrollView>
  )
}

export default Scan
