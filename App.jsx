import React, {useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import MainScreen from './views/MainScreen';
import IntroScreen from './views/IntroScreen';

const App = () => {
  const [isloaded, setisloaded] = useState(false);
  setTimeout(() => {
    setisloaded(true);
  }, 2000);
  return (
    <View style={styles.container}>
      {isloaded ? <MainScreen /> : <IntroScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
