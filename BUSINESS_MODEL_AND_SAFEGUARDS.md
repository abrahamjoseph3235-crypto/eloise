# Eloise business model and safeguards
Status: product planning document for the static frontend prototype. Not legal advice or an operational clinical policy.

## Business model decisions
- Target audience: adults and minors, with separate age-appropriate journeys. The minor assessment/review journey is not enabled in the current prototype.
- Free tier: basic automated, non-diagnostic reflection summary.
- Paid service proposal: professional interpretation, initially modelled at NGN 3,000 standard and NGN 5,000 extended. These are test prices, not verified market averages or active offers.
- Marketplace commission: 10% of eligible completed therapy-session fees.
- Therapy session fee: set by each provider and disclosed before booking.
- Example only: NGN 10,000 eligible completed session = NGN 1,000 Eloise commission and NGN 9,000 provider gross share before separately disclosed processing fees, taxes, refunds or agreed adjustments.
- No payments are enabled in the current static frontend.

## Recommended architecture before launch
1. Public static website: education, pricing disclosures, provider discovery and consent information.
2. Assessment service: validated instrument registry, versioned scoring, consent records, no clinical data in browser analytics, and free basic results.
3. Professional review service: verified professional directory, case assignment, least-privilege access, review status, audit trail, secure result delivery and payment/refund state.
4. Marketplace backend: provider credentials and scope, schedules, bookings, secure payment integration, commission ledger, cancellations, disputes and payouts.
5. Safeguarding operations: adult and minor policies, report/escalation workflows, trained designated personnel, incident logging, verified local urgent-help information, and jurisdiction-specific procedures.
6. Privacy/security: data minimisation, encryption in transit and at rest, access controls, separate consent for sharing results, retention/deletion controls, breach response, processor agreements, and no sale of health data or targeted health advertising.

## Minors: launch gate
Do not enable minors' assessment or professional interpretation until legal and clinical review confirms:
- Applicable age, consent, guardian involvement and confidentiality rules for each country.
- Age-appropriate language and accessible consent/assent, without implying that guardian consent automatically grants access to all confidential information.
- Child/adolescent-qualified professionals where required, credential verification and scope-of-practice controls.
- A documented safeguarding escalation protocol and designated trained staff.
- Clear explanation of confidentiality limits, safe contact preferences and safe guardian-involvement process.
- Verified local urgent-support information and a process for responding to disclosures.
- A DPIA/privacy risk assessment and tested data access/deletion controls.

## Assessment safety
- Do not label a custom reflection flow as a validated clinical assessment.
- Use a validated instrument only after confirming permitted use, translation, population suitability, scoring and clinical oversight.
- Never claim a questionnaire score is a diagnosis or risk clearance.
- Never withhold essential results or urgent-help information behind payment.
- Professional interpretation is optional and must not promise a diagnosis or guaranteed outcome.
- Avoid collecting free-text clinical details unless necessary and protected by a reviewed workflow.

## Pilot pricing and commission operations
- Test proposed NGN 3,000 / NGN 5,000 professional-review prices with professionals and prospective users.
- Publish the scope, reviewer qualification, expected turnaround, cancellation/refund rules and complaint route before taking payment.
- Define precisely when a session is considered completed and how refunds, chargebacks, taxes and processor fees affect payouts.
- Show the provider and client a transparent fee breakdown before confirmation.
- Review pricing accessibility and possible reduced-fee options without promising unfunded subsidies.

## Compliance review
Before launch, obtain Nigeria-specific and other country-specific legal review, including the Nigeria Data Protection Act 2023 and applicable NDPC requirements, professional licensing/telehealth rules, child-protection requirements, consumer protection, payment and tax obligations. Do not claim compliance until the relevant assessment and implementation have been completed.

## Current prototype limitations
The check-in is an illustrative browser-only reflection tool. Its selections are not transmitted or persisted by the page code. There is no clinical scoring, account-level consent record, secure assessment backend, professional review queue, live payment, booking, credential verification or minor safeguarding operations yet. All professional review and booking calls to action are informational only.
