const TermsAndConditions = () => {
  return (
    <div className="align-element mx-auto p-6">
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <img src="/assets/tm.jpeg" className="w-full " alt="House" />
      </div>
      <h1 className="text-2xl font-semibold mt-6">TREG Terms and Conditions</h1>
      <p className="text-gray-600 mt-2">
        Welcome to TREG! By using our platform, you agree to these terms. Please
        read them carefully.
      </p>

      <div className="mt-4 space-y-4">
        <Section title="1. Acceptance of Terms">
          By accessing and using TREG, you agree to comply with these Terms and
          Conditions. If you do not agree, please do not use our platform.
        </Section>

        <Section title="2. Services Provided">
          TREG is a real estate platform that connects tenants, landlords, and
          agents, offering property listings, escrow services, rent payments,
          and more.
        </Section>

        <Section title="3. User Responsibilities">
          <ul className="list-disc ml-5">
            <li>You must be 18 years or older to use TREG.</li>
            <li>All information provided must be accurate and up-to-date.</li>
            <li>
              Users are responsible for securing their accounts and passwords.
            </li>
          </ul>
        </Section>

        <Section title="4. Escrow Services">
          <ul className="list-disc ml-5">
            <li>
              Funds held in escrow are released only when agreed conditions are
              met.
            </li>
            <li>
              TREG is not liable for disputes between tenants and landlords but
              provides a structured resolution process.
            </li>
          </ul>
        </Section>

        <Section title="5. Property Listings & Transactions">
          Listings must be genuine, lawful, and accurately described. TREG is
          not responsible for property conditions, legality, or tenant-landlord
          agreements.
        </Section>

        <Section title="6. Payments & Fees">
          <ul className="list-disc ml-5">
            <li>
              TREG charges fees for certain transactions, which will be
              disclosed upfront.
            </li>
            <li>Payments must be made through secure, approved methods.</li>
          </ul>
        </Section>

        <Section title="7. Dispute Resolution">
          Users agree to attempt to resolve disputes through TREG’s support
          channels before taking legal action. TREG may mediate but is not
          liable for unresolved disputes.
        </Section>

        <Section title="8. Prohibited Activities">
          <ul className="list-disc ml-5">
            <li>
              Users should not engage in fraudulent, misleading, or illegal
              activities.
            </li>
            <li>
              Posting false property listings or misrepresenting ownership is
              prohibited.
            </li>
            <li>
              Attempts to bypass escrow services for direct transactions are not
              allowed.
            </li>
          </ul>
        </Section>

        <Section title="9. Account Termination">
          TREG reserves the right to suspend or terminate accounts that violate
          these terms or engage in misconduct.
        </Section>

        <Section title="10. Liability & Disclaimers">
          <ul className="list-disc ml-5">
            <li>TREG provides services "as is" without warranties.</li>
            <li>
              We are not responsible for losses due to user actions, system
              downtime, or third-party misconduct.
            </li>
          </ul>
        </Section>

        <Section title="11. Privacy Policy">
          Your personal data is protected under our Privacy Policy. By using
          TREG, you consent to our data practices.
        </Section>

        <Section title="12. Changes to Terms">
          TREG may update these terms periodically. Continued use means you
          accept any modifications.
        </Section>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        For questions, contact us at{' '}
        <a href="mailto:support@treg.com" className="text-blue-500">
          support@treg.com
        </a>
        .
      </p>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold mt-4">{title}</h2>
    <p className="text-gray-700 mt-1">{children}</p>
  </div>
);

export default TermsAndConditions;
