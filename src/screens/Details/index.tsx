import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share
} from 'react-native';
import React, { useContext } from 'react';
import RenderHTML from 'react-native-render-html';
import { height, width } from '../../config/constants';
import { useNavigation } from '@react-navigation/native';
import CardSlice from '../../components/CardSlice';
import Button from '../../components/Button';
import { ContextProvider } from '../../store/ContextProvider';

const CardDetails: React.FC = () => {
  const navigation = useNavigation();
  const { cardDetails, getCardDetails = () => { } } = useContext(ContextProvider) || {};

  const handleShare = async () => {
    try {
      await Share.share({
        message: cardDetails?.title || 'Check this out!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/img2.jpg")}
          resizeMode="cover"
          style={styles.mainImage}
        />

        <CardSlice onRefreshPress={getCardDetails} details={cardDetails} />

        <View style={styles.separator} />

        <View style={styles.contentWrapper}>
          <RenderHTML contentWidth={width} source={{ html: cardDetails?.text || '' }} />
          <Image
            source={require("../../assets/img2.jpg")}
            resizeMode="cover"
            style={[styles.mainImage, styles.roundedImage]}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Image
            source={require("../../assets/img2.jpg")}
            resizeMode="contain"
            style={styles.avatarImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{cardDetails?.title || "No Title"}</Text>
            <Text style={styles.subTitle} numberOfLines={1}>{cardDetails?.subTitle || "No Subtitle"}</Text>
          </View>
          <Button title="REFRESH" onPress={getCardDetails} btnStyle={styles.refreshButton} textStyle={styles.refreshText} />
          <Text style={styles.userName} numberOfLines={1}>In-App Purchase</Text>
        </View>

        <View style={styles.shareContainer}>
          <Button
            title="Share"
            onPress={handleShare}
            btnStyle={styles.shareButton}
            icon={<Image source={require('../../assets/share.png')} style={styles.shareIcon} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 24,
  },
  mainImage: {
    width: '100%',
    height: height * 0.6,
  },
  roundedImage: {
    borderRadius: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#d6d6d6',
  },
  contentWrapper: {
    paddingHorizontal: 12,
  },
  detailsContainer: {
    backgroundColor: '#d6d6d6',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  avatarImage: {
    borderRadius: 8,
    height: 60,
    width: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 10,
    color: '#666',
  },
  userName: {
    color: 'grey',
    fontSize: 8,
    fontWeight: '800',
  },
  refreshButton: {
    backgroundColor: 'blue',
  },
  refreshText: {
    color: '#fff',
  },
  shareContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#d6d6d6',
    borderRadius: 0,
    paddingHorizontal: 20,
  },
  shareIcon: {
    height: 10,
    width: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  closeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "grey",
  },
});
