import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useState } from 'react';

const PictureScreen: React.FC = () => {
    const [image, setImage] = useState('');
    const [visitorName, setVisitorName] = useState('');
    const [uploadResultMessage, setUploadResultMessage] = useState('');
    const uuid = require('uuid');
    const [isAuth, setAuth] = useState(false);

    function sendImage(e) {
        e.preventDefault();
        setVisitorName(image);
        const visitorImageName = uuid.v4();
        fetch('https://my8w77veq0.execute-api.us-west-2.amazonaws.com/dev/imagecheck/${visitorId}.jpeg', {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg',
            },
            body: image
        }).then(async () =>{
            const response = await authenticate(visitorImageName)
            if (response.Message === 'Success') {
                setUploadResultMessage('Access Granted')
                setAuth(true)
            } else {
                setUploadResultMessage('Access Denied')
                setAuth(false)
            }
        })
    }

    async function authenticate(visitorImageName) {
        const requestUrl = `https://y3goj45s9d.execute-api.us-east-1.amazonaws.com/dev/employee?` +
        new URLSearchParams({
            objectKey: `${visitorImageName}.jpeg`
        });

        return await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <div className="App">
                <h2>Felix's Facial Recognition System</h2>
                <form onSubmit={sendImage}>
                <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />
                <button type="submit">Authenticate</button>
                </form>
                <div className={isAuth ? 'success' : 'failure'}>{uploadResultMessage}</div>
                <img
                src={require(`./visitors/${visitorName}`)}
                alt="Visitor"
                height={250}
                width={250}
                />
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
  },
  captureText: { fontWeight: "bold" },
});

export default PictureScreen;