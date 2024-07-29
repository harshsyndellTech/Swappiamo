const { handleError, getSdk, getIntegrationSdk, serialize } = require('../api-util/sdk');

module.exports = async (req, res) => {
  const { invited_by, ...createUserParams } = req?.body || {};
  console.log(createUserParams, { invited_by });
  const sdk = getSdk(req, res);

  let userSignupResponse;
  try {
    userSignupResponse = await sdk.currentUser.create(createUserParams);
  } catch (e) {
    return handleError(res, e);
  }

  const userId = userSignupResponse?.data?.data?.id?.uuid;
  const integrationSdk = getIntegrationSdk();

  try {
    const updateUser = await integrationSdk.users.updateProfile(
      {
        id: userId,
        metadata: {
          invited_by,
        },
      },
      {
        expand: true,
      }
    );

    const { status, statusText, data } = userSignupResponse;
    return res
      .status(status)
      .set('Content-Type', 'application/transit+json')
      .send(
        serialize({
          status,
          statusText,
          data,
        })
      )
      .end();
  } catch (e) {
    return handleError(res, e);
  }
};
