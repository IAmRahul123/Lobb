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
import RenderHTML, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { height, width } from '../../config/constants';
import { useNavigation } from '@react-navigation/native';
import CardSlice from '../../components/CardSlice';
import Button from '../../components/Button';
import { ContextProvider } from '../../store/ContextProvider';


const CardDetails: React.FC = () => {
  const navigation = useNavigation();
  const { cardDetails, getCardDetails = () => { } } = useContext(ContextProvider) || {};

  //function to handle share button click event
  // For now we are sharing "title" prop of posts
  const handleShare = async () => {
    try {
      await Share.share({
        message: cardDetails?.title || 'Check this out!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // styles to pass to all tags in html code
  // need to pass to handle dark mode color change to white
  const tagsStyles = {
    body: {
      color: '#000'
    },
  };

  // TO handle title tag with custom styles as title is not being recognized in mobile
  const customHTMLElementModels = {
    'title': HTMLElementModel.fromCustomModel({
      tagName: 'title',
      mixedUAStyles: {
        color: '#000',
        fontWeight: 'bold',
      },
      contentModel: HTMLContentModel.block
    })
  };

  // to remove head tag as it is stopping title to render
  function removeHeadTag(htmlString: string) {
    return htmlString.replace(/<\/?head>/gi, '');
  }

  // adding thumbnail image to before the last para
  function addImageBeforeLastPara(htmlString:string) {
    let parsedStr = removeHeadTag(htmlString)
    const imgTag = `<img src="${cardDetails?.thumbNailImage}" width="100%" height=${height * 0.6} style="border-radius:10px; object-fit:contain;" alt="img"/>&nbsp;`;

    // Match all paragraph tags
    const paragraphs = parsedStr.match(/<p>[\s\S]*?<\/p>/gi);
    
    // If there is more than one paragraph, insert the image before the last one
    if (paragraphs && paragraphs.length > 1) {
        return parsedStr.replace(paragraphs[paragraphs.length - 1], imgTag + paragraphs[paragraphs.length - 1]);
    }
    // Return original HTML if there is only one or no paragraph
    return parsedStr;
}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: cardDetails?.mainImage }}
          resizeMode="cover"
          style={styles.mainImage}
        />

        <CardSlice onRefreshPress={getCardDetails} details={cardDetails} />

        <View style={styles.separator} />

        <View style={styles.contentWrapper}>
          <RenderHTML
            contentWidth={width}
            source={{ html: addImageBeforeLastPara(cardDetails?.text) }}
            tagsStyles={tagsStyles}
            customHTMLElementModels={customHTMLElementModels}

          />
        </View>

        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: cardDetails?.logo }}
            resizeMode="contain"
            style={styles.avatarImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{cardDetails?.title || ""}</Text>
            <Text style={styles.subTitle} numberOfLines={1}>{cardDetails?.subTitle || ""}</Text>
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
    marginTop: 12
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
