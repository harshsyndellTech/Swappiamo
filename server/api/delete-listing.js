const { getIntegrationSdk, handleError, getSdk } = require('../api-util/sdk');
const { listingDraft, listingPendingApproval, listingPublished } = require('./listingStatesCustom');

module.exports = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'listing id is required' });
  }

  try {
    const integrationSdk = getIntegrationSdk();
    const sdk = getSdk(req, res);

    const listingResponse = await sdk.ownListings.show({ id });
    const listing = listingResponse.data.data;

    const isDraft = listingDraft(listing);
    const isPendingApproval = listingPendingApproval(listing);
    const isPublished = listingPublished(listing);

    if (isDraft) {
      // discard draft
      const response = await sdk.ownListings.discardDraft({ id });
      return res.status(200).json({ message: 'Draft deleted successfully.' });
    }

    const isPublishedOrPendingApproval = isPendingApproval || isPublished;

    if (isPublishedOrPendingApproval) {
      if (isPublished) {
        // close listing and mail admin;
        const closeListingPromise = sdk.ownListings.close({ id });
        const updateListingPromise = integrationSdk.listings.update({
          id,
          metadata: {
            scheduled_to_delete: true,
          },
        });
        const responses = await Promise.all([closeListingPromise, updateListingPromise]);
        return res.status(200).json({
          message: 'Listing deleted successfully.',
        });
      }

      if (isPendingApproval) {
        // mail admin
        const updateListingPromise = integrationSdk.listings.update({
          id,
          metadata: {
            scheduled_to_delete: true,
          },
        });
        const responses = await Promise.all([updateListingPromise, mailAdminPromise]);
        return res.status(200).json({
          message: 'Listing deleted successfully.',
        });
      }
    }
  } catch (e) {
    return handleError(res, e);
  }
};
