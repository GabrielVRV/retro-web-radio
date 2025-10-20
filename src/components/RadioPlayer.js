import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Image, Share, Linking } from 'react-native';
import { Audio } from 'expo-av';
import { colors, fonts } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const INSTAGRAM_URL = 'https://www.instagram.com/radio.retroweb/';

const CURRENT_SONG_URL = 'https://srv24.ipstm.net:52414/currentsong';
const NEXT_SONG_URL = 'https://srv24.ipstm.net:52414/nextsong';
const STREAM_URL = 'https://srv24.ipstm.net:52414/stream';

const parseSongTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { artist: 'Rádio Retro Web', title: 'A melhor do seu rádio' };
  }
  const parts = title.split(' - ');
  const artist = parts[0]?.trim();
  const songTitle = parts[1]?.trim();
  return { artist: artist || 'Artista Desconhecido', title: songTitle || title };
};

export default function RadioPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(parseSongTitle());
  const [nextSong, setNextSong] = useState(null);

  const spinValue = useRef(new Animated.Value(0)).current;

  // Função para abrir o Instagram
  const openInstagram = () => {
    Linking.openURL(INSTAGRAM_URL).catch(err => console.error("Não foi possível abrir o link", err));
  };

  // Função para compartilhar a música
  const shareSong = async () => {
    try {
      await Share.share({
        message: `🎵 Estou ouvindo "${nowPlaying.title} - ${nowPlaying.artist}" na Rádio Retro Web! 📻`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(CURRENT_SONG_URL);
        const text = await response.text();
        setNowPlaying(parseSongTitle(text));
      } catch (error) {
        console.log("Erro ao buscar dados iniciais:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [currentResponse, nextResponse] = await Promise.all([ fetch(CURRENT_SONG_URL), fetch(NEXT_SONG_URL) ]);
        const currentSongText = await currentResponse.text();
        const nextSongText = await nextResponse.text();
        const currentSong = parseSongTitle(currentSongText);
        const nextUp = parseSongTitle(nextSongText);
        
        if (nowPlaying.title !== currentSong.title) setNowPlaying(currentSong);
        setNextSong(nextUp);
      } catch (error) {
        console.log("Erro ao buscar metadados:", error);
      }
    };

    let interval;
    if (isPlaying) {
      fetchMetadata();
      interval = setInterval(fetchMetadata, 10000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startSpinning = () => {
    spinValue.setValue(0);
    Animated.loop(Animated.timing(spinValue, { toValue: 1, duration: 10000, easing: Easing.linear, useNativeDriver: true })).start();
  };

  const stopSpinning = () => {
    Animated.loop(Animated.timing(spinValue, { toValue: 1, duration: 10000, easing: Easing.linear, useNativeDriver: true })).stop();
  };

  async function playRadio() {
    setIsPlaying(true);
    startSpinning();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, playsInSilentModeIOS: true, staysActiveInBackground: true, shouldDuckAndroid: true, playThroughEarpieceAndroid: false,
      });
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: STREAM_URL }, { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
      setIsPlaying(false);
      stopSpinning();
    }
  }

  async function stopRadio() {
    stopSpinning();
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
  }

  useEffect(() => {
    return () => { sound && sound.unloadAsync() };
  }, [sound]);

  const handlePlayPause = () => { if (isPlaying) stopRadio(); else playRadio(); };
  
  const spin = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause}>
        <Animated.View style={[styles.vinyl, { transform: [{ rotate: spin }] }]}>
           <Image 
              source={require('../../assets/logo-circle.png')}
              style={styles.logoImage}
            />
           {!isPlaying && (
              <View style={styles.playIconContainer}>
                <Ionicons name="play-circle" size={120} color={'rgba(255, 255, 255, 0.7)'} />
              </View>
           )}
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.nowPlayingContainer}>
        <Text style={styles.nowPlayingLabel}>TOCANDO AGORA</Text>
        <Text style={styles.songTitle} numberOfLines={1}>{nowPlaying.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{nowPlaying.artist}</Text>
      </View>

      {}
      <View style={styles.socialActionsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={openInstagram}>
          <Ionicons name="logo-instagram" size={28} color={colors.muted} />
          <Text style={styles.socialButtonText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={shareSong}>
          <Ionicons name="share-social-outline" size={28} color={colors.muted} />
          <Text style={styles.socialButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>

      {nextSong && (
        <View style={styles.nextSongContainer}>
          <Ionicons name="time-outline" size={16} color={colors.muted} />
          <Text style={styles.nextSongText} numberOfLines={1}>
            A seguir: {nextSong.title}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  vinyl: { width: 280, height: 280, justifyContent: 'center', alignItems: 'center' },
  logoImage: { width: '100%', height: '100%' },
  playIconContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  nowPlayingContainer: { marginTop: 30, alignItems: 'center', width: '80%' },
  nowPlayingLabel: { color: colors.muted, fontSize: fonts.body, marginBottom: 8, fontWeight: '600' },
  songTitle: { color: colors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  songArtist: { color: colors.primary, fontSize: fonts.subtitle, marginTop: 4, textAlign: 'center' },
  
  socialActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 25,
    marginBottom: 10,
  },
  socialButton: {
    alignItems: 'center',
  },
  socialButtonText: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },

  nextSongContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20 },
  nextSongText: { marginLeft: 8, color: colors.muted, fontSize: 14 },
});