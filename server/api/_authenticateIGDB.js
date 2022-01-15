const axios = require("axios");
const { igdb } = require("../../config.json");

const PROPERTIES = {
  clientID: igdb.clientID,
  authPayload: null,
  deadline: 0,
};

function initialAuthentication() {
  return axios.post(`https://id.twitch.tv/oauth2/token?client_id=${igdb.clientID}&client_secret=${igdb.secret}&grant_type=client_credentials`)
    .then((res) => res.data) // returns { access_token, expires_in, token_type}
    .catch((err) => {
      console.error("Error in Initial Auth");
      return Promise.reject(err.response?.data);
    });
}

async function igdbMiddleware(req, res, next) {
  if (!PROPERTIES.authPayload || PROPERTIES.deadline < Date.now()) {
    PROPERTIES.authPayload = await initialAuthentication().catch((err) => ({ error: true, errorData: err }));

    // eslint-disable-next-line max-len
    if (!PROPERTIES.authPayload || PROPERTIES.authPayload.error) return res.status(500).json({ status: "ERROR", info: PROPERTIES.authPayload?.errorData || "Unknown" });

    PROPERTIES.deadline = Date.now() + PROPERTIES.authPayload.expires_in - 10e3; // 10s safety margin
  }

  res.locals.igdbProps = PROPERTIES;

  return next();
}

module.exports = igdbMiddleware;
