import React from 'react'
import Banner from './Banner';
import requests from './requests';
import Row from './Row';
import { View, ScrollView, StyleSheet } from 'react-native';
import NavBar from './NavBar';
function NavComponents() {
  return (
        
        <View style={styles.backgorund}>
      <View style={styles.container}>
        <NavBar/>
        </View>
        <ScrollView>
        <Banner/>
        <View>
        <Row title="Netflix Orginals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
        {/* <ScrollView horizontal={true}>
        </ScrollView> */}
        </View>
        <View>
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          {/* <ScrollView horizontal={true}>
          </ScrollView> */}
          </View>
          <View>
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
          {/* <ScrollView horizontal={true}>
          </ScrollView> */}
          </View>
          {/* <View>
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
         
          </View> */}
          {/* <View>
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
         
          </View> */}
          {/* <View>
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          </View> */}
          {/* <View>
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          </View>
          <View>
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </View> */}
        </ScrollView>
      </View>
    
    );
      };

      const styles=StyleSheet.create({
        container:{
          backgroundColor:'black',
        },
        backgorund:{
          backgroundColor:'black',
        }
      });

export default NavComponents