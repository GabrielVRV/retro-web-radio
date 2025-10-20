import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import RadioPlayer from '../components/RadioPlayer';
import { colors, fonts } from '../styles/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerPlaceholder} />
      
      <RadioPlayer />

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
  headerPlaceholder: {
    height: 50,
  },
  footer: {
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: fonts.subtitle,
    color: colors.muted,
    fontStyle: 'italic',
  },
});