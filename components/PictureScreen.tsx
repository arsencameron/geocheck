import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Use Expo's Image Picker if using Expo
import { v4 as uuidv4 } from 'uuid';

const visitorImages = {
    visitor1: require('../assets/images/ben_tsang_1009841414.jpg'),
    visitor2: require('../assets/images/mondher_izemrane_1009841414.jpg'),
    visitor3: require('../assets/images/arsen_cameron_1009841414.jpg'),
    visitor4: require('../assets/images/lucas_baik_1009841414.jpg'),
    // Add more visitors here as needed
};

const PictureScreen: React.FC = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [visitorName, setVisitorName] = useState('');
    const [uploadResultMessage, setUploadResultMessage] = useState('');
    const [isAuth, setAuth] = useState(false);

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access camera roll is required.');
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    async function sendImage() {
        if (!imageUri) {
            Alert.alert('No Image', 'Please select an image first.');
            return;
        }

        const visitorImageName = uuidv4();
        setVisitorName(visitorImageName); // Simulate setting visitor name for testing

        try {
            const response = await fetch(
                `https://my8w77veq0.execute-api.us-west-2.amazonaws.com/dev/imagecheck/${visitorImageName}.jpeg`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    body: imageUri,
                }
            );

            if (!response.ok) throw new Error('Image upload failed.');

            const authResponse = await authenticate(visitorImageName);
            if (authResponse?.Message === 'Success') {
                setUploadResultMessage('Access Granted');
                setAuth(true);
            } else {
                setUploadResultMessage('Access Denied');
                setAuth(false);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setUploadResultMessage('Error occurred.');
            setAuth(false);
        }
    }

    async function authenticate(visitorImageName: string) {
        const requestUrl =
            `https://y3goj45s9d.execute-api.us-east-1.amazonaws.com/dev/employee?` +
            new URLSearchParams({ objectKey: `${visitorImageName}.jpeg` });

        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error during fetch:', error);
                return null;
            });
    }

    const visitorImage = visitorImages[visitorName] || null;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Upload a picture to verify your identity
            </Text>

            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>Pick an Image</Text>
            </TouchableOpacity>

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200, marginVertical: 10 }}
                    resizeMode="contain"
                />
            )}

            <TouchableOpacity style={styles.uploadButton} onPress={sendImage}>
                <Text style={styles.uploadText}>Authenticate</Text>
            </TouchableOpacity>

            <Text style={{ color: isAuth ? 'green' : 'red', marginTop: 10 }}>
                {uploadResultMessage}
            </Text>

            {visitorImage && (
                <Image
                    source={visitorImage}
                    style={{ width: 250, height: 250, marginTop: 10 }}
                    resizeMode="contain"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    pickImageButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    pickImageText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    uploadButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    uploadText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PictureScreen;
