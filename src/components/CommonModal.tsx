import { StyleSheet } from 'react-native';
import { Dialog, Text } from '@rneui/themed';
import ModalsStore from '../store/ModalsStore';
import { observer } from 'mobx-react-lite';

export default observer(function CommonModal() {
  const items = ModalsStore.commonModalItems;

  return (
    <>
      {items.map((item) => (
        <Dialog
          key={item.message}
          isVisible={true}
          onBackdropPress={() => ModalsStore.popCommonModalItem()}
        >
          <Text>{item.message}</Text>
        </Dialog>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    marginBottom: 20,
  },
});
