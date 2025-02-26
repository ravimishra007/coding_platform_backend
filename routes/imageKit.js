import express from 'express'
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`,
    publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
});

const imageKitRoute = express.Router();

imageKitRoute.get("/auth", (req, res) => {
    let result = imagekit.getAuthenticationParameters();
    res.send(result);
});


export default imageKitRoute;
