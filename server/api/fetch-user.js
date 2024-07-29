const { getIntegrationSdk } = require('../api-util/sdk');

module.exports = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).send({ message: 'userId is required' });
    }
    const integrationSdk = getIntegrationSdk();
    const user = await integrationSdk.users.show({
      id: userId?.uuid,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    });
    res.status(200).send(user);
  } catch (e) {
    console.log('error in fetch user', e);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
