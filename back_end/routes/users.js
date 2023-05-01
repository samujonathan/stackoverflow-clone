var express = require('express');
const { OAuth2Client } = require('google-auth-library');
var jwt = require('jsonwebtoken');
var router = express.Router();
var pool = require('./pool')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    console.log(error);
    return { error: "Invalid user detected. Please try again" };
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/signup", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      // DB.push(profile); 
      if(profile) {
        const data = profile;
        pool.query(`INSERT INTO USERS (name, email, profile_image) VALUES ('${data?.given_name}', '${data?.email}', '${data?.picture}') RETURNING user_id`, (error, result) => {
          if(error) {
            res.status(404).send(error.message);
          } else {
            console.log(result);
            res.status(201).json({
              message: "Signup was successful",
              user: {
                firstName: profile?.given_name,
                lastName: profile?.family_name,
                picture: profile?.picture,
                email: profile?.email,
                id: result.rows[0]?.user_id,
                token: jwt.sign({ email: profile?.email }, "myScret", {
                  expiresIn: "1d",
                }),
              },
            });
          }
        })
      }

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      if(profile) {
        const data = profile;
        pool.query(`SELECT * FROM users WHERE email = '${data?.email}'`, (error, result) => {
          var existsInDB = false;
          if(error) {
            existsInDB = false;
          } else {
            if(result.rowCount == 0) {
              existsInDB = false;
            } else {
              existsInDB = true;
            }
          }
          if (!existsInDB) {
            return res.status(400).json({
              message: "You are not registered. Please sign up",
            });
          }

          res.status(201).json({
            message: "Login was successful",
            user: {
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              picture: profile?.picture,
              email: profile?.email,
              id: result.rows[0]?.user_id,
              token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              }),
            },
          });
        });
      }



    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

module.exports = router;
