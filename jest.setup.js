/* eslint-disable no-console */

/**
 * Make sure console.error doesn't swallow errors in our tests, namely
 * to enforce React proptypes being violated but also safer in general.
 */
console.error = (e) => {
  throw new Error(e);
};
