# TC-IAM-01 - Register New User With Valid Data

`TC-IAM-01` is the high-level test condition. The detailed cases below decompose it using multiple test design techniques. Each case uses a new generated email and is expected to complete the valid registration flow unless stated otherwise.

## Derived Test Case List

| Test Case ID | Design Technique | Variation | Expected Result | Priority | Smoke |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**TC-IAM-01-01**](tc-iam-01-01.md) | Equivalence Partitioning | Baseline valid data: `Mr`, valid date, all required fields populated, optional subscriptions selected | Account is created, user is authenticated, and cleanup succeeds | P0 | Yes |
| [**TC-IAM-01-02**](tc-iam-01-02.md) | Equivalence Partitioning | Valid alternate title: `Mrs` | Account is created and the selected title is retained | P1 | No |
| [**TC-IAM-01-03**](tc-iam-01-03.md) | Equivalence Partitioning | Valid supported country other than the baseline country | Account is created and the selected country is retained | P1 | No |
| [**TC-IAM-01-04**](tc-iam-01-04.md) | Equivalence Partitioning | Valid optional subscription state with newsletter and special offers both unselected | Account is created without requiring optional subscriptions | P1 | No |
| [**TC-IAM-01-05**](tc-iam-01-05.md) | Equivalence Partitioning | Valid optional subscription state with newsletter selected and special offers unselected | Account is created and the selected preference is accepted | P2 | No |
| [**TC-IAM-01-06**](tc-iam-01-06.md) | Equivalence Partitioning | Valid optional subscription state with newsletter unselected and special offers selected | Account is created and the selected preference is accepted | P2 | No |
| [**TC-IAM-01-07**](tc-iam-01-07.md) | Boundary Value Analysis | Earliest valid date-of-birth values supported by the SUT | Account is created when the date is within the accepted range | P1 | No |
| [**TC-IAM-01-08**](tc-iam-01-08.md) | Boundary Value Analysis | Latest valid date-of-birth values supported by the SUT | Account is created when the date is within the accepted range | P1 | No |
| [**TC-IAM-01-09**](tc-iam-01-09.md) | Boundary Value Analysis | Valid calendar boundary dates: day `1`, day `31` where supported, and leap day `29 February` | Account is created and each valid date is accepted | P1 | No |
| [**TC-IAM-01-10**](tc-iam-01-10.md) | Boundary Value Analysis | Minimum and maximum valid mobile-number lengths defined by the SUT contract | Account is created for each supported length | P1 | No |
| [**TC-IAM-01-11**](tc-iam-01-11.md) | State Transition | Complete `signup page -> account information -> account created -> authenticated -> deleted` transitions | Every valid transition succeeds and reaches the expected state | P0 | No |
| [**TC-IAM-01-12**](tc-iam-01-12.md) | Pairwise Testing | Pair valid title, country, date boundary, and subscription combinations to cover interactions with fewer executions | Every selected pair completes registration successfully | P1 | No |

### Technique Boundaries

- Equivalence partitions cover valid alternatives only. Invalid email, blank mandatory fields, duplicate email, invalid dates, and invalid mobile values belong to `TC-IAM-02` or `TC-IAM-03`.
- Boundary values for date and mobile-number length must come from the SUT validation contract discovered during implementation; this design does not invent unsupported limits.
- Pairwise combinations should be generated from the valid data partitions and must retain unique, timestamp-based credentials for every execution.

## Detailed Cases

Each linked file is self-contained and includes metadata, objective, preconditions, test data, steps, expected results, cleanup, and automation notes.
