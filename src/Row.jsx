import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Movieplayer', { id: item.id })}
      style={styles.posterContainer}
    >
      <Image
        style={[
          styles.rowPoster,
          isLargeRow && styles.rowPosterLarge,
        ]}
        source={{
          uri: `${base_url}${isLargeRow ? item.poster_path : item.backdrop_path}`,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowPosters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },
  rowPosters: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  posterContainer: {
    marginRight: 10,
  },
  rowPoster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  rowPosterLarge: {
    width: 150,
    height: 225,
  },
});

export default Row;
