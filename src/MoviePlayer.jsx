import React, { useEffect, useState } from 'react';
import { View, Button, ImageBackground, Text, StyleSheet ,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import movieTrailer from 'movie-trailer';
import Row from './Row';

const windowWidth = Dimensions.get('window').width;

const MoviePlayer = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const [movieData, setMovieData] = useState({});
    const [playerUrl, setPlayerUrl] = useState('');
    const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d85e20674a393e31a93867fa39f71c72`)
        .then((response) => response.json())
        .then((data) => {
                setMovieData(data);
                navigation.setOptions({ title: data?.original_title || data?.original_name });
        })
            .catch((error) => console.error('Error fetching additional data:', error));
    }, [id]);

    useEffect(() => {
        const fetchTrailerUrl = async () => {
            if (movieData) {
                const movieName = movieData?.original_title || movieData?.original_name;
                try {
                    const url = await movieTrailer(movieName || '');
                    if (url) {
                        const videoId = url.split('v=')[1];
                        setPlayerUrl(videoId);
                    } else {
                        console.log('No trailer URL found.');
                        setPlayerUrl('');
                    }
                } catch (error) {
                    console.error('Error fetching or constructing trailer URL:', error);
                    setPlayerUrl('');
                }
            }
        };

        fetchTrailerUrl();
    }, [movieData]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
      }
    

    const handlePlayClick = () => {
        setShowPlayer(true);
  };

    const handleBackClick = () => {
        setShowPlayer(false);
    };
  
  return (
        <View style={styles.container}>
            {showPlayer ? (
                <View style={styles.playerContainer}>
                    {playerUrl ? (
                        <>
                            <YoutubePlayer
                                height={300}
                                videoId={playerUrl}
                                play={true}
                                onChangeState={(event) => {
                                    if (event === 'ended') {
                                        setShowPlayer(false);
                                    }
                                }}
                            />
                            
                            <Button onPress={handleBackClick} title="Back" style={styles.button} />
                        </>
                    ) : (
                        <Text style={styles.noTrailerText}>No trailer available</Text>
                    )}
                </View>
            ) : (
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}` }}
                    style={styles.backgroundImage}
                >
                    <Text style={styles.title}>{movieData?.original_title || movieData?.original_name}</Text>
                   <Text style={styles.overview}>Overview:  
                   {truncate(movieData.overview, 150)}
                   </Text>
                   <View style={styles.buttonContainer}>
                    <Button title="Play" onPress={handlePlayClick} />
                </View>
                    
                </ImageBackground>
            )}
             <View style={styles.bottomSection}>
            <Text style={styles.recommendedText}>Recommended For You:</Text>
            <Row             
               fetchUrl={'https://api.themoviedb.org/3/trending/all/week?api_key=d85e20674a393e31a93867fa39f71c72&language=en-US'}
            />
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        backgroundColor:'black',
  },
    playerContainer: {
        flex: 1,
  },
    noTrailerText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        height:250,
    },
    title: {
        color: 'white',
        fontSize: 25,
        marginTop:250, 
        width:windowWidth,
        // backgroundColor: 'rgba(128, 128, 128, 0.3)',  
          
    },
    overview: {
        color: 'white',
        fontSize: 14,
        // backgroundColor: 'rgba(128, 128, 128, 0.3)',  
        width:windowWidth,
        
    },
    recommendedText: {
        paddingTop: 20,
        fontSize:18,
        color: 'white',
        paddingLeft: 15,
  },
    button:{
        borderRadius:'16',
        width:windowWidth,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    buttonContainer: {
        height:60,
        width:windowWidth,
    },
});

export default MoviePlayer;