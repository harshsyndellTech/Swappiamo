const { getIntegrationSdk } = require('../api-util/sdk');
const { types, statuses } = require('../transactionHistoryHelpers');
const Transaction = require('../Schemas/transaction');
const mail = require('../mail');
module.exports = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).send({ message: 'userId is required' });
    }
    const integrationSdk = getIntegrationSdk();

    var recieverOldSune = req.body.reciverOldSune == null ? 0 : parseInt(req.body.reciverOldSune)
    var transferSune = req.body.amount ? req.body.amount : 0;
    const senderUpdate = await integrationSdk.users.updateProfile({
      id: userId,
      metadata: {
        sune: recieverOldSune + parseFloat(transferSune)
      }
    });

    await new Transaction({
      id: req.body.message,
      user_id: userId,
      amount: req.body.amount,
      type: types.INVIO_SUNE,
      status: statuses.COMPLETED,
      user_joined_id: req.body.currentuserId,
      user_joined_name: req.body.currentUserName,
    }).save();

    const user = await integrationSdk.users.show({
      id: req.body.currentuserId,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    });
    var senderOldSune = req.body.senderOldSune == null ? 0 : req.body.senderOldSune

    const userUpdate = await integrationSdk.users.updateProfile({
      id: req.body.currentuserId,
      metadata: {
        sune: parseFloat(senderOldSune) - parseFloat(transferSune)
      }
    });
    await new Transaction({
      id: req.body.message,
      user_id: req.body.currentuserId,
      amount: "-" + req.body.amount,
      type: types.INVIO_SUNE,
      status: statuses.COMPLETED,
      user_joined_id:req.body.userId,
      user_joined_name:req.body.userName,
    }).save();

//send email logic 
    const emailTemplate = `<html>
  <body>
  <p>Complimenti ${req.body.userName},</p>
  <p>"Hai appena ricevuto ${req.body.amount} da ${req.body.currentUserName} per ${req.body.message}.</p>
  <p>Continua ad utilizzare Swappiamo per i tuoi acquisti</p>
  <p>Valeria e Robertd"</p>
  </body>
  </html>`;

    const subject = 'Your sune pay wallet credited';

    try {
      const sent = await mail(req.body.userEmail, subject, emailTemplate);
      res.status(200).send(userUpdate);
    } catch (e) {
      console.log('error Message',e);
      return res.status(500).json(e);
    }    
  } catch (e) {
    console.log('error in fetch user', e);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
