import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import userCustomerOrders from '../hooks/userCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card } from '@rneui/themed';
import { Icon } from '@rneui/base';

type Props = {
  userId: string;
  name: string;
  email: string;
}

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders} = userCustomerOrders(userId)
  const tw = useTailwind()
  const navigation = useNavigation<CustomerScreenNavigationProp>()
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MyModal", {name:name, userId:userId})}>
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), {color: "#59C1CC"}]}>ID: {userId}</Text>
            </View>


            <View style={tw("flex-row items-center justify-end")}>
              <Text>{ loading ? "loading..." : `${orders.length} x` }</Text>
              <Icon 
                style={tw("mb-5 ml-auto")}
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
              />
            </View>            
          </View>

        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default CustomerCard