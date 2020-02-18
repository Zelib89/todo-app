import { authService } from '../services/auth';

export const appendAccessHeader = (options) => {
  const nextOptions = Object.assign({}, options);
  nextOptions.headers['x-access-token'] = authService.currentTokenValue;
  return nextOptions;
}
