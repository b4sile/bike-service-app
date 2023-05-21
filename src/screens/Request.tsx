import { Button, CheckBox, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserStore from '../store/UserStore';
import { RequestStatusType } from '../models/Request';
import { requestService } from '../api/requestService';

export interface RequestForm {
  phone: string;
  description: string;
  userId: number;
  isOuterRequest: boolean;
  status: RequestStatusType;
}

export default function Request() {
  const [requestForm, setRequestForm] = useState<RequestForm>({
    description: '',
    phone: UserStore.currentUser?.phone ?? '',
    isOuterRequest: false,
    userId: UserStore.currentUser?.id ?? -1,
    status: 'Pending',
  });

  const onSubmit = () => {
    requestService.createRequest(requestForm).then(() => {});
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Телефон</Text>
          <Input
            value={requestForm.phone}
            placeholder="Телефон"
            keyboardType="phone-pad"
            onChangeText={(text) =>
              setRequestForm({ ...requestForm, phone: text })
            }
          />
        </View>
        <View>
          <Text>Опишите проблему</Text>
          <Input
            value={requestForm.description}
            onChangeText={(text) =>
              setRequestForm({ ...requestForm, description: text })
            }
            multiline
            numberOfLines={4}
          />
        </View>
        <View>
          <CheckBox
            checked={requestForm.isOuterRequest}
            title="Приехать к клиенту"
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            onPress={() =>
              setRequestForm({
                ...requestForm,
                isOuterRequest: !requestForm.isOuterRequest,
              })
            }
          />
        </View>
      </View>
      <View>
        <Button
          title="Отправить"
          onPress={onSubmit}
          disabled={!requestForm.phone}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  checkBox: {
    backgroundColor: 'transparent',
  },
  checkBoxText: {
    fontWeight: 'normal',
  },
});
