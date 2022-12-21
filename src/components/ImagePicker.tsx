import React, {FC, memo} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IMAGES} from '~constants';
import {COLORS, FONTS, SIZES, _styles} from '~styles';
import {showToaster} from '~utils';

interface Props {
  show: boolean;
  title?: string;
  onClose: () => void;
  onChose: (image: string) => void;
}

const ImagePicker: FC<Props> = ({show = false, title, onClose, onChose}) => {
  const handelCamera = () => {
    try {
      launchCamera(
        {
          includeBase64: true,
          mediaType: 'photo',
          cameraType: 'front',
          saveToPhotos: true,
          quality: 0,
        },
        handelImage,
      );
    } catch (error: any) {
      showToaster(error, 'error');
    }
  };

  const handelGallery = async () => {
    try {
      launchImageLibrary(
        {
          includeBase64: true,
          mediaType: 'photo',
          selectionLimit: 1,
          quality: 0,
        },
        handelImage,
      );
    } catch (error: any) {
      showToaster(error, 'error');
    }
  };

  const handelImage = (data: ImagePickerResponse) => {
    if (data.assets?.length) {
      const image = {
        ...data.assets[0],
        type: data.assets[0].type,
        uri: data.assets[0].uri,
        name: data.assets[0].fileName,
      };
      onChose(image.base64!);
    }
    onClose();
  };

  return (
    <Modal
      visible={show}
      transparent
      style={_styles.container}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title ? title : 'Profile Photo'}</Text>
          <View style={styles.body}>
            <TouchableOpacity onPress={handelCamera}>
              <Image source={IMAGES.Camera} style={styles.image} />
              <Text style={styles.description}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handelGallery}>
              <Image source={IMAGES.Gallery} style={styles.image} />
              <Text style={styles.description}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Image source={IMAGES.Close} style={styles.image} />
              <Text style={styles.description}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ImagePicker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Primary_Modal,
    justifyContent: 'flex-end',
  },
  content: {
    minHeight: 180,
    padding: SIZES.H10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.Primary_Card,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Primary_Text,
    textAlign: 'center',
    marginTop: SIZES.V10 / 2,
  },
  body: {
    marginTop: SIZES.V12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    textAlign: 'center',
    marginTop: SIZES.V3,
  },
});
