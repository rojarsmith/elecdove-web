import React from 'react';
import { render } from '@testing-library/react';
import  AuthService  from './AuthService';
import 'regenerator-runtime/runtime'

test('auth-service-login', async () => {
 var res = await AuthService.login();
 console.log(res);
  expect(true);
});
