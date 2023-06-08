/**
 * Cokkies utility function
 */

import Cookies from 'js-cookie';

/**
 * user identifer name for cookie
 */
const USER_IDENTIFIER_KEY = 'dineMarketUserIdentifier';

/**
 * set cookie to add new user identifer
 */
export function setUserIdentifier(identifier: string) {
  Cookies.set(USER_IDENTIFIER_KEY, identifier, { expires: 365 });
}

/**
 * get user identifier from cookies
 */
export function getUserIdentifier(): string | undefined {
  return Cookies.get(USER_IDENTIFIER_KEY);
}

