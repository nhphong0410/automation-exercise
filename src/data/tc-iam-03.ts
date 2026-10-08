const buildUtcStamp = () => {
  const now = new Date();
  const dateStamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
  ].join('');
  const timeStamp = [
    String(now.getUTCHours()).padStart(2, '0'),
    String(now.getUTCMinutes()).padStart(2, '0'),
    String(now.getUTCSeconds()).padStart(2, '0'),
    String(now.getUTCMilliseconds()).padStart(3, '0'),
  ].join('');
  const epoch = Date.now();

  return { dateStamp, timeStamp, epoch };
};

type CaseData =
  | { email: string; password: string }
  | { name: string }
  | { name: string; malformedEmail: string }
  | { name: string; missingDomainEmail: string; missingLocalPartEmail: string }
  | { name: string; email: string }
  | { name: string; email: string; password: string };

export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-01'): { email: string; password: string };
export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-02'): { name: string };
export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-04'): { name: string; malformedEmail: string };
export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-05'): { name: string; missingDomainEmail: string; missingLocalPartEmail: string };
export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-06' | 'TC-IAM-03-07' | 'TC-IAM-03-08' | 'TC-IAM-03-09'): { name: string; email: string };
export function buildCaseData(workerIndex: number, caseId: 'TC-IAM-03-10'): { name: string; email: string; password: string };
export function buildCaseData(workerIndex: number, caseId: string): CaseData {
  const { dateStamp, timeStamp, epoch } = buildUtcStamp();

  switch (caseId) {
    case 'TC-IAM-03-01':
      return {
        email: `valid_${dateStamp}_${timeStamp}_${workerIndex}@qa.test`,
        password: 'Password@123',
      };
    case 'TC-IAM-03-02':
      return {
        name: `QA User ${epoch}`,
      };
    case 'TC-IAM-03-04':
      return {
        name: `QA Syntax User ${workerIndex}_${epoch}`,
        malformedEmail: `plainaddress_${workerIndex}_${epoch}_qa.test`,
      };
    case 'TC-IAM-03-05':
      return {
        name: `QA Incomplete Syntax ${workerIndex}_${epoch}`,
        missingDomainEmail: `user_${workerIndex}_${epoch}@`,
        missingLocalPartEmail: '@qa.test',
      };
    case 'TC-IAM-03-06':
      return {
        name: `QA Blank Pass ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-07':
      return {
        name: `QA Blank Name ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-08':
      return {
        name: `QA Blank Address ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-09':
      return {
        name: `QA Blank Mobile ${workerIndex}_${epoch}`,
        email: `user_${workerIndex}_${epoch}@qa.test`,
      };
    case 'TC-IAM-03-10':
      return {
        name: '   ',
        email: `user_${workerIndex}_${epoch}@qa.test`,
        password: 'Password@123',
      };
    default:
      throw new Error(`Unsupported IAM-03 case: ${caseId}`);
  }
}