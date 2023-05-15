import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Service } from '../models/Service';
import { serviceService } from '../api/serviceService';
import ServiceItem from '../components/ServiceItem';
import { Image, Text } from '@rneui/themed';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [services, setServices] = useState<Array<Service>>([]);

  useEffect(() => {
    serviceService.getAll().then((services) => {
      setServices(services);
    });
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/bikeServiceIcon.png')}
          />
          <Text style={styles.headerText}>Bike service</Text>
        </View>
        <View style={styles.mainImageContainer}>
          <Image
            style={styles.mainImage}
            source={require('../../assets/main-image.png')}
          />
        </View>
        {services.map((service, idx) => (
          <ServiceItem
            service={service}
            style={{ marginTop: idx > 0 ? 10 : 0 }}
            key={service.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  logo: {
    width: 50,
    height: 30,
  },
  mainImage: {
    width: 250,
    height: 200,
  },
  headerText: {
    marginLeft: 10,
    color: '#0778BE',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mainImageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
