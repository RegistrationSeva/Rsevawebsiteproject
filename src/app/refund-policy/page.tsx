import React from "react";

function RefundPolicy() {
  return (
    <div className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-primary mb-6 md:mb-8">
            Refund and Cancellation Policies
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6 text-center">
            Effective Date: October 6, 2016
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
            At Registration Seva, we strive to provide the best services to our
            clients. We understand that there may be situations where you need
            to request a refund or cancel a service. This policy outlines our
            refund and cancellation procedures.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-4">
            1. Service Cancellation
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Before Service Initiation:</strong> If you cancel a service
            before we have begun working on your request, you may be eligible
            for a full refund.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            <strong>After Service Initiation:</strong> If you cancel a service
            after we have started working on your request, a partial refund may
            be provided based on the amount of work completed.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-4">
            2. Refund Policy
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Eligibility for Refund:</strong> Refunds are issued at our
            discretion.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Non-Refundable Policies:</strong> Certain services and fees
            are non-refundable once paid. These include but are not limited to:
          </p>

          <ul className="list-disc list-inside space-y-3 sm:space-y-4 text-gray-700">
            <li>
              <strong className="text-lg sm:text-xl md:text-2xl text-primary">
                Government Fees:
              </strong>
              Any government fees paid on behalf of the client.
            </li>
            <li>
              <strong className="text-lg sm:text-xl md:text-2xl text-primary">
                Filing Fees:
              </strong>
              Fees related to the filing of documents with regulatory
              authorities.
            </li>
            <li>
              <strong className="text-lg sm:text-xl md:text-2xl text-primary">
                Third-Party Service Charges:
              </strong>
              Costs incurred for services provided by third parties.
            </li>
          </ul>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mt-6 md:mt-8 mb-4">
            3. Refund Process
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Requesting a Refund:</strong> To request a refund, please
            contact us at
            <a
              href="mailto:info@registrationseva.com"
              className="text-primary hover:underline"
            >
              info@registrationseva.com
            </a>
            or call us at
            <a
              href="tel:+919999395031"
              className="text-primary hover:underline"
            >
              +91 9999395031
            </a>
            or
            <a
              href="tel:+918076412030"
              className="text-primary hover:underline"
            >
              +91 8076412030
            </a>
            with your service details and reason for the refund request.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mt-6 md:mt-8 mb-4">
            4. Changes and Modifications
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify or update this Refund and
            Cancellation Policy at any time. Any changes will be posted on this
            page with an updated effective date.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mt-6 md:mt-8 mb-4">
            5. Contact Us
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            If you have any questions about this Refund and Cancellation Policy,
            please contact us at
            <a
              href="mailto:info@registrationseva.com"
              className="text-primary hover:underline"
            >
              info@registrationseva.com
            </a>
            or call us at
            <a
              href="tel:+919999395031"
              className="text-primary hover:underline"
            >
              +91 9999395031
            </a>
            or
            <a
              href="tel:+918076412030"
              className="text-primary hover:underline"
            >
              +91 8076412030
            </a>
            You can also write to us at FIRST FLOOR, OFFICE NO 102, SHREE SHYAM
            COMPLEX, VIKAS MARG, LAXMI NAGAR, East Delhi, Delhi, 110092.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
