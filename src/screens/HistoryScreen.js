import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const SongItem = ({ title, artist }) => (
  <View style={styles.itemContainer}>
    <Ionicons name="musical-notes-outline" size={24} color={colors.primary} />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemArtist}>{artist}</Text>
    </View>
  </View>
);

export default function HistoryScreen({ route }) {
  const { history } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>O histórico de músicas ainda está vazio.</Text>
          <Text style={styles.emptySubText}>Ouça um pouco e as músicas aparecerão aqui!</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <SongItem title={item.title} artist={item.artist} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  itemTextContainer: {
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: fonts.subtitle,
    color: colors.text,
    fontWeight: 'bold',
  },
  itemArtist: {
    fontSize: fonts.body,
    color: colors.muted,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: fonts.subtitle,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: fonts.body,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
  },
});