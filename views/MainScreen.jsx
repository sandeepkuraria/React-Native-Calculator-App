import React, {useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MainScreen = () => {
  const [value, setvalue] = useState('0');
  const [bracketOpen, setbracketOpen] = useState(false);
  const scrollViewRef = useRef();

  const handlePress = val => {
    console.log('pressed', val);
    if (val == 'AC') {
      setvalue('0');
    } else if (val == '=') {
      try {
        if (
          (value.match(/\(/g) || []).length ===
          (value.match(/\)/g) || []).length
        ) {
          setvalue(`${eval(value.replace('()', '(0)'))}`);
        } else {
          setvalue('Format Error');
        }
      } catch (error) {
        setvalue('Format Error');
      }
    } else if (val == 'back') {
      setvalue(value.slice(0, -1));
    } else if (val == '()') {
      if (value == '0') {
        setvalue('(');
        setbracketOpen(true);
      } else {
        if (bracketOpen == true) {
          setvalue(value + ')');
          setbracketOpen(false);
        } else {
          setvalue(value + '(');
          setbracketOpen(true);
        }
      }
    } else {
      if (value == '0') {
        if (isNaN(val)) {
          setvalue(value + val);
        } else {
          setvalue(val);
        }
      } else if (isNaN(val)) {
        if (
          value.slice(-1) == '+' ||
          value.slice(-1) == '-' ||
          value.slice(-1) == '*' ||
          value.slice(-1) == '/' ||
          value.slice(-1) == '%' ||
          value.slice(-1) == '.'
        ) {
          setvalue(value.slice(0, -1) + val);
        } else {
          setvalue(value + val);
        }
      } else {
        setvalue(value + val);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.main_screen}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.main_screen_display}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <Text style={styles.main_screen_display_text}>{value}</Text>
        </ScrollView>

        <View style={styles.main_screen_keypad}>
          <View style={styles.main_screen_keypad_row}>
            <Pressable onPress={() => handlePress('AC')}>
              <View style={styles.btn1_outer}>
                <Text style={styles.bg2_button}>AC</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('()')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>( )</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('%')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>%</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('/')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>/</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.main_screen_keypad_row}>
            <Pressable onPress={() => handlePress('7')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>7</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('8')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>8</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('9')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>9</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('*')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>*</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.main_screen_keypad_row}>
            <Pressable onPress={() => handlePress('4')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>4</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('5')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>5</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('6')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>6</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('-')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>-</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.main_screen_keypad_row}>
            <Pressable onPress={() => handlePress('1')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>1</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('2')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>2</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('3')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>3</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('+')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>+</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.main_screen_keypad_row}>
            <Pressable onPress={() => handlePress('0')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>0</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('.')}>
              <View style={styles.btn_outer}>
                <Text style={styles.bg_button}>.</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('back')}>
              <View style={styles.btn1_outer}>
                <Text style={styles.bg2_button}>&#60;</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress('=')}>
              <View style={styles.btn2_outer}>
                <Text style={styles.bg2_button}>=</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  main_screen: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  main_screen_display: {
    elevation: 10,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    marginBottom: 10,
    padding: 10,
  },
  main_screen_keypad: {
    width: '100%',
    height: '70%',
    display: 'flex',
  },
  main_screen_keypad_row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  btn_outer: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg_button: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 30,
  },
  btn1_outer: {
    width: 90,
    height: 90,
    backgroundColor: '#FF5757',
    borderRadius: 90,
    elevation: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2_outer: {
    width: 90,
    height: 90,
    backgroundColor: 'grey',
    borderRadius: 90,
    elevation: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg2_button: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  main_screen_display_text: {
    fontSize: 50,
    color: 'black',
    textAlign: 'right',
  },
});

export default MainScreen;
