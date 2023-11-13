import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { postTopic } from '../api';

export default function AddTopic({ setUpdate }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
  });

  const onChangeHandler = (text, id) => {
    setForm((val) => {
      const obj = { name: val.name, slug: val.slug };
      obj[id] = text;
      return obj;
    });
  };
  const buttonHandler = async () => {
    try {
      await postTopic(form).then(() => {
        setForm({
          name: '',
          slug: '',
        });
        setIsAdding(false);
        setUpdate((val) => !val);
      });
    } catch {
      setIsError(true);
    }
  };

  return isAdding ? (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Topic name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter topic name'
          value={form.name}
          onChangeText={(text) => onChangeHandler(text, 'name')}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Topic slug</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter topic slug'
          value={form.slug}
          onChangeText={(text) => onChangeHandler(text, 'slug')}
        />
      </View>
      {isError ? (
        <View style={{ backgroundColor: 'red' }}>
          <Text>SOME ERROR HAPPENED</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          title='Cancel'
          onPress={() => setIsAdding(false)}
          style={{ backgroundColor: 'red' }}
        />
        <Button
          title='Save'
          onPress={buttonHandler}
          style={styles.signUpButton}
        />
      </View>
    </View>
  ) : (
    <View>
      <Button
        title='Add topic'
        onPress={() => setIsAdding(true)}
        style={styles.signUpButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  signUpButton: {
    borderRadius: 100,
    backgroundColor: 'green',
    color: 'green',
  },
  signupText: {
    textDecorationLine: 'underline',
    color: 'blue',
    marginTop: 8,
  },
});
