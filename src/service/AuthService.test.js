import AuthService from './AuthService';

describe('Upload', () => {
  test('auth-service-login', async () => {
    var res = await AuthService.login('aaa111', 'bbb111');
    console.log(res);
    expect(res).toHaveProperty('expires_in');
  });
});
