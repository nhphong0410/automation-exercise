import { expect, type APIRequestContext } from '@playwright/test';
import type { RegistrationData } from '../data/user-data';

export async function seedAccount(
  request: APIRequestContext,
  data: RegistrationData,
): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: data.name,
      email: data.email,
      password: data.password,
      title: 'Mr',
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.company,
      address1: data.address,
      address2: data.address2,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      mobile_number: data.mobileNumber,
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
}

export async function cleanupAccount(
  request: APIRequestContext,
  data: Pick<RegistrationData, 'email' | 'password'>,
): Promise<void> {
  const response = await request.delete('/api/deleteAccount', {
    form: {
      email: data.email,
      password: data.password,
    },
    timeout: 10000,
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect([200, 404]).toContain(body.responseCode);
}