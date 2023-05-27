import { Button, CheckBox, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserStore from '../store/UserStore';
import { RequestStatusType } from '../models/Request';
import { requestService } from '../api/requestService';
import ModalsStore from '../store/ModalsStore';
import * as Location from 'expo-location';
import MapView, { Details, LatLng, Region } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

export interface RequestForm {
  phone: string;
  description: string;
  userId: number;
  isOuterRequest: boolean;
  status: RequestStatusType;
}

const initialLatLng: LatLng = { latitude: 61.67642, longitude: 50.80994 };

const initialRegion: Region = {
  ...initialLatLng,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export default function Request() {
  const [requestForm, setRequestForm] = useState<RequestForm>({
    description: '',
    phone: UserStore.currentUser?.phone ?? '',
    isOuterRequest: false,
    userId: UserStore.currentUser?.id ?? -1,
    status: 'Pending',
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState<Region>(initialRegion);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      ...region,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setLocation(location);
  };

  const onChangeRegion = (region: Region, details: Details) => {
    if (details.isGesture) {
      setRegion(region);
    }
  };

  const onSubmit = () => {
    requestService
      .createRequest({
        ...requestForm,
        latitude: region.latitude,
        longitude: region.longitude,
      })
      .then(() => {
        ModalsStore.addCommonModalItem({
          message:
            'Отлично, ваша заявка принята. Мы с вами свяжемся по указанному вами телефону.',
        });
      })
      .catch(() => {
        ModalsStore.addCommonModalItem({
          message: 'Ошибка, проверьте правильность введенных данных.',
        });
      });
  };

  const onPressOuterRequestCheckbox = async () => {
    if (!requestForm.isOuterRequest && !location) {
      getLocation();
    }
    setRequestForm({
      ...requestForm,
      isOuterRequest: !requestForm.isOuterRequest,
    });
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
            onPress={onPressOuterRequestCheckbox}
          />
        </View>
        {requestForm.isOuterRequest && (
          <View style={styles.mapContainer}>
            <MapView
              region={region}
              onRegionChangeComplete={onChangeRegion}
              style={styles.mapView}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
            />
            <View style={styles.marker}>
              <FontAwesome5 name="map-marker-alt" size={24} color="black" />
            </View>
          </View>
        )}
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
  mapView: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    position: 'absolute',
    marginBottom: -12,
    height: 24,
    zIndex: 3,
  },
});
