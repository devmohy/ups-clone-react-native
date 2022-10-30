import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { OrderScreenNavigationProp } from './OrdersScreen'
import { RootStackParamList } from '../navigator/RootNavigator'
import DeliveryCard from '../components/DeliveryCard'

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">

const OrderScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrderScreenNavigationProp>()
  const { params:{ order } } = useRoute<OrderScreenRouteProp>()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#EB6A7C",
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries"
    })
  }, [order])
  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={order} fullwidth />
    </View>
  )
}

export default OrderScreen