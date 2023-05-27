import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from '@rneui/themed';
import { Request, requestStatuses } from '../models/Request';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

interface RequestItemProps {
  request: Request;
  index: number;
  style?: StyleProp<ViewStyle> | undefined;
}

export default function RequestItem({
  request,
  index,
  style,
}: RequestItemProps) {
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
        <Text>
          Заявка №{index} от{' '}
          {format(new Date(request.createdAt), 'dd MMMM H:mm', {
            locale: ru,
          })}
        </Text>
      </View>
      <View>
        <Text>{requestStatuses[request.status]}</Text>
      </View>
    </View>
  );
}
