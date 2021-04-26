// Import User model
const User = require('../models/auth.model');

// Import Libraries
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);


// Custom error handler to get useful error from database errors
const { errorHandler } = require('../helpers/dbErrorHandling');



exports.registerController = (req, res) => {
  const { FullName, email, password, Gender, city, Phone } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Getting the value of the first error
    const firstError = errors.array().map(error => error.msg)[0];
    // réponse HTTP 422 : serveur a compris le type de contenu et que la syntaxe de la requête est correcte mais le serveur n'a pas été en mesure de réaliser les instructions demandées.
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // When no error -> mongoose query.
    User.findOne({
      email
    }).exec((err, user) => {
      // If user exists -> 400 Bad Request : we can't register an existant user
      if (user) {
        return res.status(400).json({
          errors: 'Email is taken, Please choose another email address'
        });
      }
    });

    const token = jwt.sign(
      {
        FullName,
        email,
        password
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '10m'
      }
    );

    //Sending an email to activate account after registration
    const emailData = {
      //We will specify the adress from whom the email will be sent.
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Elegance App - Activate your account',
      html: `
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td bgcolor="#02174C" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                      <td bgcolor="#02174C" align="center" valign="top" style="padding: 10px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: white; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                          <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome to Elegance!</h1> <img src=" http://cdn.mcauto-images-production.sendgrid.net/a9fd540df47a93d6/c7bc4c1e-fe84-45b2-a4bc-609c78775478/332x127.png" width="230" height="100" style="display: block; border: 0px;" />
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      <tr>
          <td bgcolor="#BF1922" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                          <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#ffffff" align="left">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                      <table border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td align="center" style="border-radius: 3px;" bgcolor="#BF1922"><a href=${process.env.CLIENT_URL}activate/${token} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px;  display: inline-block;">Confirm Account</a></td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr> <!-- COPY -->
                  <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; text-align: 'center'; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                          <p style="margin: 0;">This link will expire after 10 minutes.</p>
                      </td>
                  </tr> <!-- COPY -->
                  <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                      </td>
                  </tr> <!-- COPY -->
                  <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                          <p style="margin: 0;"><a href="#" target="_blank" style="color: #BF1922;">${process.env.CLIENT_URL}activate/${token}</a></p>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                          <p style="margin: 0;">Cheers,<br>Rebirth Team</p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      
      <tr>
          <td bgcolor="#BF1922" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                      <td bgcolor="#BF1922" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      </table>`
    };

    // send mail and deliver a success message or error message
    sgMail
      .send(emailData)
      .then(sent => {
        return res.json({
          message: `Email has been sent to ${email}`
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          // errors: errorHandler(err)
          error: err,
        });
      });
  }
};
