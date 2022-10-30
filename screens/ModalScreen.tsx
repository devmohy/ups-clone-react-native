import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import userCustomerOrders from '../hooks/userCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>, 
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<ModalScreenNavigationProp>()
  const {params: { name, userId }} = useRoute<ModalScreenRouteProp>()
  const { loading, error, orders} = userCustomerOrders(userId)

  return (
    <View style={tw("mt-10")}>
      <TouchableOpacity onPress={navigation.goBack} style={tw("absolute right-5 top-5 z-10")}>
        <Icon
          name="closecircle"
          type="antdesign"
          />
      </TouchableOpacity>

      <View style={tw("mt-10")}>
        <View style={[tw("py-5 border-b"), { borderColor: "#59C1CC"}]}>
          <Text style={[tw("text-center text-xl font-bold"), {color: "#59C1CC"}]}>{name}</Text>
          <Text style={[tw("text-center text-sm italic")]}>deliveries</Text>
        </View>
      </View>

      <FlatList data={orders} keyExtractor={order => order.trackingId} renderItem={({item: order}) => <DeliveryCard order={order} />}  />
    </View>
  )
}

export default ModalScreen