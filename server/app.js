require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:8080" }));

const { GIPHY_KEY, PIXABAY_KEY } = process.env;

const processGiphy = (data) => {
    return data.map((giphy) => {
        return {
            id: giphy.id,
            image: giphy.images?.fixed_height.webp,
            title: giphy.title,
        };
    });
};

const processPixabay = (hits) => {
    return hits.map((image) => {
        return {
            id: image.id,
            image: image.webformatURL,
            title: image.tags,
        };
    });
};

app.get("/search", async (req, res) => {
    const { search, page, offset, per_page } = req.query;

    try {
        const giphy = axios.get("http://api.giphy.com/v1/gifs/search", {
            params: {
                q: search,
                key: GIPHY_KEY,
                limit: per_page,
                offset,
            },
        });
        const pixabay = axios.get("https://pixabay.com/api/", {
            params: {
                q: search,
                key: PIXABAY_KEY,
                per_page,
                page,
                image_type: "photo",
            },
        });

        const promisesSettled = await Promise.allSettled([giphy, pixabay]);
        const errors = promisesSettled.filter(({ status }) => status === "rejected").map((response) => response.reason.message);
        const results = promisesSettled.filter(({ status }) => status === "fulfilled").map((response) => response.value);

        if (results.length !== 0) {
            const data = results.map(({ data }) => data);

            const imagesAndGiphs = data.flatMap((element) => {
                if (element.data) {
                    return processGiphy(element.data);
                }
                return processPixabay(element.hits);
            });
            res.status(200).send({ imagesAndGiphs, errors });
        } else {
            res.status(400).send({ errors });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(process.env.PORT || 8082);
