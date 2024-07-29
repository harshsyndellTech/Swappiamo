const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');
const Sequence = require('./Schemas/sequence');
const Transaction = require('./Schemas/transaction');
const events = require('events');
const { statuses, types } = require('./transactionHistoryHelpers');
const Emitter = new events.EventEmitter();

const clientId = process.env.SHARETRIBE_INTEGRATION_CLIENT_ID;
const clientSecret = process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET;
const integrationSdk = flexIntegrationSdk.createInstance({
  clientId,
  clientSecret,
});

const SIGNUP_BONUS = 20;
const REFERRAL_BONUS = 10;
const REVIEW_BONUS = 50;
const NEW_LISTING_BONUS = 50;
const NORMAL_REVIEWS_BONUS = 5;
const PROFILE_BONUS = 30;
Emitter.on('sune.review.reward.counter.reset', async ({ user_id }) => {
  console.log(`handling event:sune.review.reward.counter.reset for user: ${user_id}`);
  try {
    await integrationSdk.users.updateProfile({
      id: user_id,
      metadata: {
        fiveStarReviewCount: 0,
      },
    });
    console.log(`handled event: sune.review.reward.counter.reset for user: ${user_id}`);
  } catch (e) {
    console.log('error in reset counter', e);
    console.log(`failed to handle event: sune.review.reward.counter.reset for user`);
  }
});

Emitter.on('sune.view.reward.given', async payload => {
  try {
    const { user_id, rating } = payload;
    const userResponse = await integrationSdk.users.show({ id: user_id });
    const fiveStarReviewCount =
      userResponse?.data?.data?.attributes?.profile?.metadata?.fiveStarReviewCount ?? 0;

    if (rating < 5) {
      Emitter.emit('sune.review.reward.counter.reset', { user_id });
      return console.log('rating less than 5, so no bonus to be given.');
    }

    const updatedFiveStarReviewCount = fiveStarReviewCount + 1;

    if (updatedFiveStarReviewCount == 5) {
      console.log(`handling event: sune.view.reward.given for user: ${user_id}`);

      const userSune = userResponse?.data.data?.attributes?.profile?.metadata?.sune;
      const newSune = userSune + REVIEW_BONUS;

      await Promise.all([
        integrationSdk.users.updateProfile({
          id: user_id,
          metadata: {
            sune: newSune,
            fiveStarReviewCount: 0,
          },
        }),
        new Transaction({
          user_id,
          amount: REVIEW_BONUS,
          type: types.FIVE_STAR_REVIEWS_BONUS,
          status: statuses.COMPLETED,
        }).save(),
      ]);

      console.log(`handled event: sune.view.reward.given for user: ${user_id}`);
    } else {
      console.log(`handling event: updating 5 star review count for user: ${user_id}`);

      await integrationSdk.users.updateProfile({
        id: user_id,
        metadata: {
          fiveStarReviewCount: fiveStarReviewCount + 1,
        },
      });

      console.log(`handled event: updating 5 star review count for user: ${user_id}`);
    }
  } catch (e) {
    console.log(`Failed to handle event: sune.view.reward.given for user`, e);
  }
});

Emitter.on('sune.balance.locked', async payload => {
  try {
    const { user_id, amount, id } = payload;

    console.log(`handling event: sune.balance.locked for user: ${user_id}`);
    await new Transaction({
      user_id,
      amount,
      type: types.CUSTOMER_ORDER,
      status: statuses.PENDING,
      id,
    }).save();

    console.log(`handled event: sune.balance.locked for user: ${user_id}`);
  } catch (e) {
    console.log(`Failed to handle event: sune.balance.locked for user`);
  }
});

Emitter.on('sune.balance.added.to.invited.by', async payload => {
  try {
    const { user_id, user_joined_id, user_joined_name, amount } = payload;
    console.log(`handling event: sune.balance.added.to.invited.by for user: ${user_id}`);
    await new Transaction({
      user_id,
      amount,
      user_joined_id,
      user_joined_name,
      type: types.REFERRAL_BONUS,
      status: statuses.COMPLETED,
    }).save();

    console.log(`handled event: sune.balance.added.to.invited.by for user: ${user_id}`);
  } catch (e) {
    console.log(`Failed to handle event: sune.balance.added.to.invited.by for user`);
  }
});

Emitter.on('sune.profile.bonus.added', async payload => {
  try {
    const { user_id, user_joined_id, user_joined_name, amount } = payload;
    await new Transaction({
      user_id,
      amount,
      user_joined_id,
      user_joined_name,
      type: types.PROFILE_BONUS,
      status: statuses.COMPLETED,
    }).save();
  } catch (e) {
    console.log(`Failed to handle event: sune.profile.bonus.added`);
  }
});

Emitter.on('sune.balance.added.on.signup', async payload => {
  try {
    const { user_id, amount } = payload;
    console.log(`handling event: sune.balance.added.on.signup for user: ${user_id}`);
    await new Transaction({
      user_id,
      amount,
      type: types.SIGN_UP_BONUS,
      status: statuses.COMPLETED,
    }).save();

    console.log(`handled event: sune.balance.added.on.signup for user: ${user_id}`);
  } catch (e) {
    console.log(`Failed to handle event: sune.balance.added.on.signup for user`);
  }
});

Emitter.on('sune.balance.transferred', async payload => {
  try {
    const { user_id, amount, id } = payload;

    console.log(`handling event: sune.balance.transferred for user: ${user_id}`);

    await Transaction.findOneAndUpdate(
      { id, user_id },
      { status: statuses.COMPLETED },
      { new: true }
    );

    console.log(`handled event: sune.balance.transferred for user: ${user_id}`);
  } catch (e) {
    console.log(`Failed to handle event: sune.balance.transferred for user`);
  }
});

Emitter.on('sune.balance.added.to.provider', async payload => {
  try {
    const { user_id, amount, id } = payload;

    console.log(`handling event: sune.balance.added.to.provider for user: ${user_id}`);
    await new Transaction({
      user_id,
      amount,
      type: types.PROVIDER_SALE,
      status: statuses.COMPLETED,
      id,
    }).save();

    console.log(`handled event: sune.balance.added.to.provider for user: ${user_id}`);
  } catch (e) {
    console.log(`Failed to handle event: sune.balance.added.to.provider for user`);
  }
});

const pollIdleWait = +(process.env.POLL_IDLE_WAIT_TIME || 6000);

const pollWait = +(process.env.POLL_WAIT_TIME || 100 * 6);

const WATCH_EVENTS_LIST = [
  'transaction/transitioned',
  'review/created',
  'user/updated',
  'user/created',
  'listing/updated',
];

const queryEvents = async params => {
  const response = await integrationSdk.events.query(params);
  return response;
};

// const loadLastEventSequenceId = async () => {
//   let sequenceDoc;
//   try {
//     // return Number('56278717');
//     sequenceDoc = await Sequence.findOne({ isSequence: true });
//     if (sequenceDoc) return Number(sequenceDoc.sequenceId);
//   } catch (e) {
//     console.log(e);
//   }
//   return null;
// };
const loadLastEventSequenceId = async () => {
  let sequenceDoc;
  try {
    sequenceDoc = await Sequence.findOne({ isSequence: true });
    console.log({ oldSequenceId: sequenceDoc?.sequenceId });
    if (sequenceDoc) return Number(sequenceDoc.sequenceId);
    return 0;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// const saveLastSequenceId = async sequenceId => {
//   let sequenceDoc;
//   try {
//     sequenceDoc = await Sequence.findOne({ isSequence: true });
//     if (sequenceDoc) {
//       //save sequence id
//       console.log({ saved: true, old: sequenceDoc.sequenceId, new: sequenceId });
//       await Sequence.findOneAndUpdate({ isSequence: true }, { sequenceId });
//     } else {
//       //create sequence Id
//       console.log({ created: true, current: sequenceId });
//       await new Sequence({ sequenceId }).save();
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
const saveLastSequenceId = async (sequenceId, resolve) => {
  try {
    await Sequence.updateOne({ isSequence: true }, { sequenceId }, { upsert: true });

    console.log({ saved: true, sequenceId: sequenceId });
    if (resolve) resolve();

    return true;
  } catch (e) {
    console.log(e);
    return new Promise(resolve => setTimeout(() => saveLastSequenceId(sequenceId, resolve), 30000));
  }
};
const handleNormalReviewBonus = async userId => {
  try {
    const user = await integrationSdk.users.show({ id: userId });
    const userSune = user?.data.data?.attributes?.profile?.metadata?.sune;
    const newSune = userSune + NORMAL_REVIEWS_BONUS;
    return await Promise.all([
      integrationSdk.users.updateProfile({
        id: userId,
        metadata: {
          sune: newSune,
        },
      }),
      new Transaction({
        user_id: userId,
        amount: NORMAL_REVIEWS_BONUS,
        type: types.REVIEW_BONUS,
        status: statuses.COMPLETED,
      }).save(),
    ]);
  } catch (e) {
    console.log(e);
  }
};
const updateReviews = async resource => {
  try {
    const resourceAttrs = resource.attributes;
    const resourceType = resource.attributes.resource.attributes.type;
    if (resourceType != 'ofProvider') return Promise.resolve();
    const rating = resourceAttrs.resource.attributes.rating;
    const reviewerId = resourceAttrs.resource.relationships.author.data.id.uuid;
    console.log(
      'hit review to provider-======================================================provider'
    );
    const txnId = resourceAttrs.resource.relationships.transaction.data.id.uuid;
    const response = await integrationSdk.transactions.show({ id: txnId, include: ['provider'] });
    const [author] = response.data.included;
    await handleNormalReviewBonus(reviewerId);
    console.log(`review bonus added to : ${reviewerId}`);
    // Emitter.emit('sune.view.reward.given', {
    //   user_id: author.id.uuid,
    //   rating,
    // });

    const authorId = author.id.uuid;
    console.log('authorId------->', authorId);
    const oldAuthorData = await integrationSdk.users.show({ id: authorId });
    const authorMetaData = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.rating;
    if (authorMetaData) {
      const oldRating = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.rating;
      const totalReviews = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.totalReviews;
      const newRating = rating + oldRating;
      const newTotalReviews = totalReviews + 1;
      const newAvgRating = (rating + oldRating) / (totalReviews + 1);
      console.log('hit review if', { newTotalReviews, totalReviews });

      await integrationSdk.users.updateProfile({
        id: authorId,
        metadata: {
          avgRating: newAvgRating,
          rating: newRating,
          totalReviews: newTotalReviews,
        },
      });
    } else {
      console.log('hit review else', { rating, totalReviews: 1 });

      await integrationSdk.users.updateProfile({
        id: authorId,
        metadata: {
          rating: rating,
          totalReviews: 1,
        },
      });
    }
    Emitter.emit('sune.view.reward.given', {
      user_id: author.id.uuid,
      rating,
    });
  } catch (e) {
    console.log('----> error in updateReviews', e);
  }
};
const updateReviewsToCustomer = async resource => {
  try {
    const resourceAttrs = resource.attributes;
    const resourceType = resource.attributes.resource.attributes.type;
    if (resourceType != 'ofCustomer') return Promise.resolve();
    const rating = resourceAttrs.resource.attributes.rating;
    const txnId = resourceAttrs.resource.relationships.transaction.data.id.uuid;
    const reviewerId = resourceAttrs.resource.relationships.author.data.id.uuid;
    console.log('hit review to customer---------------------------------------customer');
    const response = await integrationSdk.transactions.show({ id: txnId, include: ['customer'] });
    const [author] = response.data.included;
    // Emitter.emit('sune.view.reward.given', {
    //   user_id: author.id.uuid,
    //   rating,
    // });
    await handleNormalReviewBonus(reviewerId);
    console.log(`review bonus added to : ${reviewerId}`);
    const authorId = author.id.uuid;
    console.log('authorId------->', authorId);
    const oldAuthorData = await integrationSdk.users.show({ id: authorId });
    const authorMetaData = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.rating || 0;
    if (authorMetaData) {
      const oldRating = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.rating;
      const totalReviews = oldAuthorData?.data?.data?.attributes?.profile?.metadata?.totalReviews;
      const newRating = rating + oldRating;
      const newTotalReviews = totalReviews + 1;
      const newAvgRating = (rating + oldRating) / (totalReviews + 1);
      console.log('hit review if', { newTotalReviews, totalReviews });

      await integrationSdk.users.updateProfile({
        id: authorId,
        metadata: {
          avgRating: newAvgRating,
          rating: newRating,
          totalReviews: newTotalReviews,
        },
      });
    } else {
      await integrationSdk.users.updateProfile({
        id: authorId,
        metadata: {
          rating: rating,
          totalReviews: 1,
        },
      });
    }
    Emitter.emit('sune.view.reward.given', {
      user_id: author.id.uuid,
      rating,
    });
  } catch (e) {
    console.log('----> error in updateReviews', e);
  }
};
const refundCreditTo = async (providerId, txnId, tCredits) => {
  try {
    const customerResponse = await integrationSdk.users.show({ id: providerId });
    const provider = customerResponse.data.data;
    const sune = provider?.attributes?.profile?.metadata?.sune ?? 0;

    const newCredits = sune + tCredits;
    console.log('------------------------------------------------------------------------------>');
    console.log('sune credited to provider');

    await Promise.all([
      integrationSdk.users.updateProfile({
        id: providerId,
        metadata: {
          sune: newCredits,
        },
      }),
      integrationSdk.transactions.updateMetadata({
        id: txnId,
        metadata: {
          sune_credited: true,
          locked_sune: null,
        },
      }),
    ]);
  } catch (e) {
    console.log('error in refundCreditTo', e);
  }
};

async function manageHistory(lastTransition, transaction) {
  const processName = transaction?.attributes?.processName;
  const processVersion = transaction.attributes.processVersion;
  const isNewProcess = true;
  // (processVersion >= +process.env.REACT_APP_SERVICE_NEW_PROCESS &&
  //   processName == 'flex-hourly-default-process') ||
  // (processVersion >= +process.env.REACT_APP_PRODUCT_NEW_PROCESS &&
  //   processName == 'flex-product-default-process') ||
  // processName == 'flex-daily-default-process' ||
  // processName == 'flex-hourly-paid-default-process/release-1' ||
  // processName == 'flex-product-paid-default-process/release-1' ||
  // processName == 'flex-daily-paid-default-process/release-1';
  // const processVersion = transaction.attributes.processVersion;
  // const isNewProcess =
  //   processVersion === +process.env.REACT_APP_SERVICE_NEW_PROCESS ||
  //   processVersion === +process.env.REACT_APP_PRODUCT_NEW_PROCESS;
  const lockedTransitions = isNewProcess ? ['transition/accept'] : ['transition/customer-accept'];
  const isLocked = lockedTransitions.includes(lastTransition);
  const completedTransitions = [
    'transition/complete',
    'transition/product-delivered',
    'transition/complete-start',
  ];
  const isCompleted = completedTransitions.includes(lastTransition);

  if (isLocked) {
    Emitter.emit('sune.balance.locked', {
      user_id: transaction.relationships.customer.data.id.uuid,
      amount: transaction.attributes.metadata.priceValues.totalAmount,
      id: transaction.id.uuid,
    });
    return Promise.resolve();
  } else if (isCompleted) {
    Emitter.emit('sune.balance.transferred', {
      user_id: transaction.relationships.customer.data.id.uuid,
      amount: transaction.attributes.metadata.priceValues.totalAmount,
      id: transaction.id.uuid,
    });

    Emitter.emit('sune.balance.added.to.provider', {
      user_id: transaction.relationships.provider.data.id.uuid,
      amount: transaction.attributes.metadata.priceValues.totalAmount,
      id: transaction.id.uuid,
    });

    return Promise.resolve();
  }
  return Promise.resolve();
}

async function addSuneToUser(payload) {
  try {
    const { previousValues, resource: currentValues } = payload;
    // console.dir({ previousValues, currentValues }, { depth: 4440 });

    const previousInvitedBy = previousValues?.attributes?.profile?.metadata?.invited_by;
    const currentInvitedBy = currentValues?.attributes?.profile?.metadata?.invited_by;
    let profileCheck = ((currentValues?.attributes?.profile?.publicData.address) && (currentValues?.attributes?.profile?.bio) && (currentValues?.relationships?.profileImage?.data)) ? true : false
    // profileCheck = profileCheck && !(currentValues?.attributes?.profile?.publicData?.isProfileBonusAdded || false)
    var customerResponse = null;
    if (profileCheck) {
      customerResponse = await integrationSdk.users.show({ id: currentValues.id.uuid });
      if (customerResponse.data.data?.attributes?.profile?.publicData?.isProfileBonusAdded) {
        profileCheck = false;
      }
    }
    const hasNoPreviousInvitedBy =
      typeof previousInvitedBy != 'undefined' && previousInvitedBy == null;
    const hasCurrentInvitedBy = currentInvitedBy != null && typeof currentInvitedBy == 'string';

    // console.dir(
    //   {
    //     hasNoPreviousInvitedBy,
    //     hasCurrentInvitedBy,
    //     previousValues,
    //     currentValues,
    //     condition: hasNoPreviousInvitedBy && hasCurrentInvitedBy,
    //   },
    //   { depth: 420 }
    // );

    if (hasNoPreviousInvitedBy && hasCurrentInvitedBy) {
      const currentInvitedByUserResponse = await integrationSdk.users.show({
        id: currentInvitedBy,
      });
      const currentInvitedByUser = currentInvitedByUserResponse.data.data;
      const sune = currentInvitedByUser?.attributes?.profile?.metadata?.sune ?? 0;

      const calls = [
        integrationSdk.users.updateProfile({
          id: currentValues.id.uuid,
          metadata: {
            invited_by: null,
          },
        }),
        integrationSdk.users.updateProfile({
          id: currentInvitedBy,
          metadata: {
            sune: sune + REFERRAL_BONUS,
          },
        }),
      ];

      await Promise.all(calls);
      Emitter.emit('sune.balance.added.to.invited.by', {
        user_id: currentInvitedBy,
        user_joined_id: currentValues.id.uuid,
        user_joined_name: currentValues.attributes.profile.displayName,
        amount: REFERRAL_BONUS,
      });

    }
    if (profileCheck === true) {
      const provider = customerResponse.data.data;
      const sune = provider?.attributes?.profile?.metadata?.sune ?? 0;

      const publicBounusCall = [
        integrationSdk.users.updateProfile({
          id: currentValues.id.uuid,
          publicData: {
            isProfileBonusAdded: true
          },
          metadata: {
            sune: sune + PROFILE_BONUS,
          },
        }),
      ];
      await Promise.all(publicBounusCall);

      Emitter.emit('sune.profile.bonus.added', {
        user_id: currentValues.id.uuid,
        amount: PROFILE_BONUS,
      })
    }

  } catch (e) {
    console.log('error in addSuneToUser', e);
  }
}
async function addSuneToUserOnSignup(payload) {
  try {
    const { resource: user } = payload;

    const userId = user.id.uuid;
    console.log('user created', userId);
    await integrationSdk.users.updateProfile({
      id: userId,
      metadata: {
        sune: SIGNUP_BONUS,
      },
    });
    console.log('Signup bonus updated in metadata', userId);
    Emitter.emit('sune.balance.added.on.signup', {
      user_id: userId,
      amount: SIGNUP_BONUS,
    });
  } catch (e) {
    console.log('error in addSuneToUserOnSignup', e);
  }
}

async function handleTransactionTransitioned(payload) {
  const { resource: transaction } = payload;
  const lastTransition = transaction.attributes.lastTransition;
  const complete =
    lastTransition == 'transition/complete' || lastTransition == 'transition/complete-start';
  manageHistory(lastTransition, transaction);
  if (!complete) return Promise.resolve();
  const txnId = transaction.id.uuid;
  console.log('---tx is completed---');
  const providerId = transaction.relationships.provider.data.id.uuid;
  const creditRefunded = transaction?.attributes?.metadata?.locked_sune;
  await refundCreditTo(providerId, txnId, creditRefunded);

  //1. find customer
  //2. check if refund is already processed or not
  //3. If not, Refund those locked credits to them
  //4. Update refunds to true
}

async function handleListingUpdated(payload) {
  const { previousValues, resource: currentValues } = payload;
  const previousState =
    previousValues?.attributes?.state && typeof previousValues?.attributes?.state == 'string'
      ? previousValues?.attributes?.state
      : null;
  const currentState =
    currentValues?.attributes?.state && typeof currentValues?.attributes?.state == 'string'
      ? currentValues?.attributes?.state
      : null;
  const isPublished = previousState == 'draft' && currentState == 'published';
  const isPublishedFromPendingApproval =
    previousState == 'pendingApproval' && currentState == 'published';

  if (isPublished || isPublishedFromPendingApproval) {
    const providerId = currentValues.relationships.author.data.id.uuid;
    const providerResponse = await integrationSdk.users.show({ id: providerId });
    const provider = providerResponse.data.data;
    const sune = provider?.attributes?.profile?.metadata?.sune ?? 0;
    const listings = await integrationSdk.listings.query({
      authorId: providerId,
      states: ['published'],
    });
    const isFirstListing = listings.data.data.length == 1;

    const newCredits = sune + NEW_LISTING_BONUS;
    if (isFirstListing) {
      try {
        await Promise.all([
          integrationSdk.users.updateProfile({
            id: providerId,
            metadata: {
              sune: newCredits,
            },
          }),
          new Transaction({
            type: types.NEW_LISTING_BONUS,
            amount: NEW_LISTING_BONUS,
            user_id: providerId,
            status: statuses.COMPLETED,
          }).save(),
        ]);
        console.log('credited sune to provider on new listing publish...');
      } catch (e) {
        console.log('error crediting sune to provider on new listing publish...', e);
      }
    } else {
      console.log('<=========Not first listing, so no bonus to be given.========>');
    }
  }
}

const analyzeEvents = async (events, index) => {
  // if (!events?.[index]) return;
  if (!events?.[index]) return events[index - 1].attributes.sequenceId;
  const event = events[index];
  console.log('analyzing event index', index);
  const attrs = event.attributes;
  const eventType = attrs.eventType;

  try {
    switch (eventType) {
      case 'transaction/transitioned':
        await handleTransactionTransitioned(attrs);
        break;
      case 'review/created':
        {
          try {
            if (attrs?.resource?.attributes?.type == 'ofProvider') await updateReviews(event);
            if (attrs?.resource?.attributes?.type == 'ofCustomer')
              await updateReviewsToCustomer(event);
          } catch (e) {
            console.log(e);
          }
        }
        break;
      case 'user/updated':
        await addSuneToUser(attrs);
        break;
      case 'user/created':
        await addSuneToUserOnSignup(attrs);
        break;
      case 'listing/updated':
        await handleListingUpdated(attrs);
        break;
    }
  } catch (e) {
    console.dir(e, { depth: 420 });
  }
  await saveLastSequenceId(event.attributes.sequenceId);
  return analyzeEvents(events, index + 1);
};

const pollLoop = sequenceId => {
  let params = {
    eventTypes: WATCH_EVENTS_LIST,
  };
  params = sequenceId
    ? {
      ...params,
      startAfterSequenceId: sequenceId,
    }
    : params;

  queryEvents(params)
    .then(async res => {
      const events = res.data.data;
      const fullPage = events.length === res.data.meta.perPage;
      const delay = fullPage ? pollWait : pollIdleWait;

      // await analyzeEvents(events, 0);
      // const lastSequenceId = await loadLastEventSequenceId();
      let lastSequenceId = sequenceId;
      console.log(lastSequenceId, 'last sequence id in poll loop');
      if (events.length) {
        lastSequenceId = await analyzeEvents(events, 0);
      }

      setTimeout(() => {
        pollLoop(lastSequenceId);
      }, delay);
    })
    .catch(e => {
      // console.dir(e, { depth: 12 });
      console.log(`Failed to log events because of ${e?.message}`);
    });
};

// Load state from local file, if any
// const lastSequenceId = loadLastEventSequenceId();

// kick off the polling loop
const watchSharetribeEvents = async () => {
  // const resolvedSequenceId = await lastSequenceId;
  // pollLoop(resolvedSequenceId);
  const resolvedSequenceId = await loadLastEventSequenceId();
  if (resolvedSequenceId != null) {
    pollLoop(resolvedSequenceId);
  } else {
    setTimeout(() => watchSharetribeEvents(), 30000);
  }
};

module.exports = watchSharetribeEvents;
