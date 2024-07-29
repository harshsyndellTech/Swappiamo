const { transactionLineItems } = require('../api-util/lineItems');
const { getSdk, getTrustedSdk, handleError, serialize } = require('../api-util/sdk');
const { getIntegrationSdk } = require('../api-util/sdk');
module.exports = (req, res) => {
  const { isSpeculative, bookingData, bodyParams, queryParams } = req.body;
  const isCategoryProduct = bodyParams?.params?.metadata?.category === 'product';
  const isPaid = bodyParams?.params?.metadata?.isPaid;
  const listingId = bodyParams && bodyParams.params ? bodyParams.params.listingId : null;
  const newQueryParams = {
    ...queryParams,
    include: ['customer', 'provider'],
  };
  const sdk = getSdk(req, res);
  let lineItems = null;
  const integrationSdk = getIntegrationSdk();

  sdk.listings
    .show({ id: listingId })
    .then(listingResponse => {
      const listing = listingResponse.data.data;

      lineItems = transactionLineItems(listing, bookingData);
      // lineItems = isCategoryProduct && !isPaid ? null : transactionLineItems(listing, bookingData);

      return getTrustedSdk(req);
    })
    .then(trustedSdk => {
      const { params } = bodyParams;

      // Add lineItems to the body params
      const body = {
        ...bodyParams,
        params: {
          ...params,
          lineItems,
        },
      };

      if (isSpeculative) {
        return trustedSdk.transactions.initiateSpeculative(body, queryParams);
      }

      return trustedSdk.transactions.initiate(body, newQueryParams).then(async response => {
        return response;
        // try {
        //   const priceValues = response?.data?.data?.attributes?.metadata?.priceValues;
        //   const { price, totalAmount } = priceValues;
        //   const providerId = response.data.data.relationships.provider.data.id.uuid;
        //   const customerId = response.data.data.relationships.customer.data.id.uuid;
        //   const providerSune = response.data.included?.find(i => i.id.uuid == providerId)
        //     ?.attributes.profile.metadata.sune;
        //   const customerSune = response.data.included?.find(i => i.id.uuid == customerId)
        //     ?.attributes.profile.metadata.sune;

        //   await integrationSdk.users.updateProfile({
        //     id: customerId,
        //     metadata: {
        //       sune: customerSune - totalAmount,
        //     },
        //   });
        //   return response;
        // } catch (e) {
        //   console.log(e);
        //   handleError(response, e);
        // }
      });
    })
    .then(apiResponse => {
      const { status, statusText, data } = apiResponse;
      res
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
    })
    .catch(e => {
      console.log(e);
      handleError(res, e);
    });
};
