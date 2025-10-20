import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import RadioPlayer from '../components/RadioPlayer';
import { colors, fonts } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [songHistory, setSongHistory] = useState([]);

  const handleSongChange = (song) => {
    setSongHistory(prevHistory => {
      if (prevHistory[0]?.title !== song.title) {
        const newHistory = [song, ...prevHistory];
        return newHistory.slice(0, 20);
      }
      return prevHistory;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('History', { history: songHistory })}>
          <Ionicons name="list-outline" size={32} color={colors.muted} />
        </TouchableOpacity>
      </View>
      
      <RadioPlayer onSongChange={handleSongChange} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>A trilha sonora que marcou sua vida!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 10,
  },
  footer: {
    width: '100%',          
    alignItems: 'center',  
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: fonts.subtitle,
    color: colors.muted,
    fontStyle: 'italic',
  },
});