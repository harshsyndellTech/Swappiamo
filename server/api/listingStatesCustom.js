const PUBLISHED = 'published';
const DRAFT = 'draft';
const PENDING_APPROVAL = 'pendingApproval';
const CLOSED_BY_LOGIC = 'closed-by-logic';
const CLOSED_BY_USER = 'closed';
const DELETED = 'deleted';
const CLOSED = 'closed';

const listingPublished = listing => listing.attributes.state == PUBLISHED;
const listingDraft = listing => listing.attributes.state == DRAFT;
const listingPendingApproval = listing => listing.attributes.state == PENDING_APPROVAL;
const listingClosedByLogic = listing =>
  listing.attributes.state == CLOSED &&
  (listing?.attributes?.publicData?.closeReasons ?? []).length > 0;
const listingClosedByUser = listing =>
  listing.attributes.state == CLOSED &&
  (listing?.attributes?.publicData?.closeReasons ?? []).length == 0;

module.exports = {
  PUBLISHED,
  DRAFT,
  PENDING_APPROVAL,
  CLOSED_BY_LOGIC,
  CLOSED_BY_USER,
  DELETED,
  listingDraft,
  listingPublished,
  listingPendingApproval,
  listingClosedByLogic,
  listingClosedByUser,
};
