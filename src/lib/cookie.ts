import Cookies from 'js-cookie';

const USER_IDENTIFIER_KEY = 'dineMarketUserIdentifier';

export function setUserIdentifier(identifier: string) {
  Cookies.set(USER_IDENTIFIER_KEY, identifier, { expires: 365 });
}

export function getUserIdentifier(): string | undefined {
  return Cookies.get(USER_IDENTIFIER_KEY);
}

