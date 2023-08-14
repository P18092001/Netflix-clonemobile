import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import requests from './requests';
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const Banner = () => {
  const [movie, setMovie] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(requests.fetchTrending); // Replace with your API endpoint
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      } catch (error) {
        console.log('Error fetching movie data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <ImageBackground
        style={styles.banner}
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` }}
      >
        <View style={styles.bannerContents}>
          <Text style={styles.bannerTitle}>
            {movie?.title || movie?.name || movie?.original_name}
          </Text>
          <Text style={styles.bannerDescription}>
            {truncate(movie?.overview, 150)}
          </Text>
          <TouchableOpacity style={styles.playButton}
      onPress={() => navigation.navigate('Movieplayer', { id: movie.id })}>
            <View style={styles.playButtonBox}>
              <Text style={styles.playButtonText}>Play Movie</Text>
            </View>
      </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.fadeBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  bannerContents: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  bannerDescription: {
    fontSize: 14,
    color: 'white',
  },
  fadeBottom: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
    playButton: {
        backgroundColor: '#f4511e',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 10,
      },
      playButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:1,
      },
      playButtonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
      },
});

export default Banner;
