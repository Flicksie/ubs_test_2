const express = require("express");
const axios = require("axios");

const BASE_URL = "https://api.igdb.com/v4";

/*
f name, platforms;
s name;
l 50;
o 0;
w platforms.platform_family = 1;
*/

const router = express.Router();

router.get("/", (req, res) => {
  const props = res.locals.igdbProps;

  axios.post(
    `${BASE_URL}/games`,
    `
            f 
                name,
                platforms,
                cover,
                cover.url,
                platforms.name,
                involved_companies,
                involved_companies.company.name,
                release_dates.*,
                release_dates.platform.name,
                release_dates.platform.platform_logo.url;
                
            w  
                (release_dates.date > 757382400)
                & (release_dates.date < 788918400)
                & (release_dates.platform.category = (1,5,6))
                & category = 0;
            
            s release_dates.date asc;
            l 50;
        `,
    // release_dates.date < 821662727 & // pre-90s
    {
      headers: {
        "Client-ID": props.clientID,
        "Content-Type": "text/plain",
        Authorization: `Bearer ${props.authPayload.access_token}`,
      },
    },
  ).then((response) => {
    console.log("test 1");
    res.status(200).json(response.data);
  })
    .catch((e) => {
      console.log(e.toJSON(), "test 2");
      res.status(500).json({ status: "ERROR", info: "Unable to fetch data." });
    });
});

router.get("/:id", (req, res) => {
  const props = res.locals.igdbProps;

  axios.post(
    `${BASE_URL}/games`,
    `
            f 
                name,
                platforms,
                cover,
                cover.url,
                genres,
                screenshots,
                screenshots.url,
                storyline,
                summary,

                platforms.name,
                involved_companies,
                involved_companies.company.name,
                release_dates.*,
                release_dates.platform.name,
                release_dates.platform.platform_logo.url;
                
            w  
                id = ${req.params.id};
        `,
    // release_dates.date < 821662727 & // pre-90s
    {
      headers: {
        "Client-ID": props.clientID,
        "Content-Type": "text/plain",
        Authorization: `Bearer ${props.authPayload.access_token}`,
      },
    },
  ).then((response) => {
    res.json(response.data);
  })
    .catch(() => {
      res.status(500).json({ status: "ERROR", info: "Unable to fetch data." });
    });
});

module.exports = router;
