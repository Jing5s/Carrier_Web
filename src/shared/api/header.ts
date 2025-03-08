import { TOKEN } from 'shared/constants';
import { Storage } from 'shared/lib/storage';

export const refreshToken = () => ({
  token: Storage.getItem(TOKEN.REFRESH),
});
