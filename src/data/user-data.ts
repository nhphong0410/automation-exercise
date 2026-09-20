export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export function createRegistrationData(workerIndex: number): RegistrationData {
  const now = new Date();
  const timestamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
    '_',
    String(now.getUTCHours()).padStart(2, '0'),
    String(now.getUTCMinutes()).padStart(2, '0'),
    String(now.getUTCSeconds()).padStart(2, '0'),
    String(now.getUTCMilliseconds()).padStart(3, '0'),
  ].join('');
  const username = `QA User ${timestamp}`;
  const timestampDigits = timestamp.replace('_', '');
  const mobileNumber = `+1${timestampDigits.slice(-9)}${workerIndex % 10}`;

  return {
    name: username,
    email: `user_${timestamp}_${workerIndex}@qa.test`,
    password: 'Password@123',
    firstName: 'QA',
    lastName: 'User',
    company: 'QA Example Ltd',
    address: '100 Test Street',
    address2: 'Suite 10',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipcode: '94105',
    mobileNumber,
  };
}
