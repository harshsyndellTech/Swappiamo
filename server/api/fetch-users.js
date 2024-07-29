const { getIntegrationSdk } = require('../api-util/sdk');

module.exports = async (req, res) => {
  try {
    let allUsers = [];
    let page = 1;
    const integrationSdk = getIntegrationSdk();
    const fetchUsers = async () => {
      try {
        const users = await integrationSdk.users.query({
          page: page,
          include: ['profileImage'],
          'fields.image': [
            'variants.square-small',
            'variants.square-small2x',
            'variants.square-xsmall',
            'variants.square-xsmall2x',
          ],
        });

        const dataWithProfileImage = await users.data.data.map(user => {
          return {
            ...user,
            attributes: {
              ...user.attributes,
              profile: {
                ...user.attributes.profile,
                publicData: {},
                privateData: {},
                protectedData: {},
              },
            },
            profileImage: {
              image: users.data.included.find(
                image => image?.id?.uuid == user?.relationships?.profileImage?.data?.id?.uuid
              ),
            },
          };
        });

        allUsers = [...allUsers, ...dataWithProfileImage];
        if (users.data.meta.totalPages > page) {
          page = page + 1;
          await fetchUsers();
        }
      } catch (e) {
        console.log('error in fetch users', e);
      }
    };

    await fetchUsers();
    console.log('total users', allUsers.length);
    res.status(200).send(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
