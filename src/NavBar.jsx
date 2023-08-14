import React from 'react';
import { View, Image, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function NavBar() {

  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout logic here
    // For this example, just navigate to the Login page
    navigation.navigate('Login');
  };

  const handleOtherMovies = () => {
    // Navigate to the OtherMoviesPage
    navigation.navigate('OtherMovies');
  };
  return (
    <View style={styles.navBar}>
      <Image
        source={{ uri: 'data:image/jpeg;base64,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' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handleOtherMovies} style={styles.otherMoviesButton}>
        <Text style={styles.otherMoviesText}>Other Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 66,
    height: 58,
  },
  logoutButton: {
    padding: 8,
    marginLeft: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  otherMoviesButton: {
    padding: 8,
    marginRight: 50, // Set marginRight to create space between logo and button
  },
  otherMoviesText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NavBar;
