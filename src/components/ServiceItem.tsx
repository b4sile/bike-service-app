import { StyleProp, View, ViewStyle } from 'react-native';
import { Service } from '../models/Service';
import { Text } from '@rneui/themed';

interface ServiceProps {
  service: Service;
  style?: StyleProp<ViewStyle> | undefined;
}

export default function ServiceItem({ service, style }: ServiceProps) {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: '#726D6D',
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
        },
        style,
      ]}
    >
      <View>
        <Text>{service.name}</Text>
      </View>
      <View>
        <Text>{service.price}р</Text>
      </View>
    </View>
  );
}
