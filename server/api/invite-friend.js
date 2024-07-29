const { getSdk } = require('../api-util/sdk');
const mail = require('../mail');

const CANONICAL_URL = process.env.REACT_APP_CANONICAL_ROOT_URL;

module.exports = async (req, res) => {
  const inviteEmail = req.body?.email;

  const sdk = getSdk(req, res);

  let user;
  try {
    const userResponse = await sdk.currentUser.show();
    user = userResponse?.data?.data;
    if (!user)
      return res.status(401).json({
        message: 'You must be logged in to invite a friend',
      });
  } catch (e) {
    return res.status(e.status).json({
      message: 'You need to be logged in to use this feature',
    });
  }

  if (!inviteEmail) {
    return res.status(400).json({
      message: 'Invite email is required.',
    });
  }

  const profile = user.attributes.profile;
  const username = profile.firstName + ' ' + profile.lastName;
  const userId = user.id.uuid;

  const emailTemplate = `<html>
  <body>
    <a href="${CANONICAL_URL}" target="_blank">
      <img src="${CANONICAL_URL}/static/logo.png"  height="40" border="0" alt="Sune">
    </a>
  <hr/>
  <p>Complimenti!</p>
  <p>${username} ti ha appena invitato ad unirti a SWAPPIAMO!</p>
  <p>Per accedere alla piattaforma, clicca il link sottostante:</p>
  <p><a href="${CANONICAL_URL}/join/${userId}">${CANONICAL_URL}/join/${userId}</a></p>
  <p>Grazie e benvenuto da tutto il team SWAPPIAMO.</p>
  </body>
  </html>`;

  const subject = 'Unisciti anche tu a Swappiamo! Insieme per l’economia libera.';

  try {
    const sent = await mail(inviteEmail, subject, emailTemplate);
    console.log(sent);
    return res.status(200).json({
      message: 'Invite sent successfully',
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error sending invite',
    });
  }
};
