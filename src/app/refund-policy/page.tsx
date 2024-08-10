import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="mx-auto container p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Refund and Cancellation Policies
        </h1>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Refund Policy
          </h2>
          <p className="mb-4">
            At 3N TECHNOLOGIES, we strive to provide exceptional services to our
            clients. However, we understand that there may be situations where
            you are not entirely satisfied with our services. Our refund policy
            outlines the conditions under which refunds are applicable.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Eligibility for Refunds:
          </h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              <strong>Service Not Delivered:</strong> If we fail to deliver the
              service as agreed upon in the contract, you may be eligible for a
              full refund.
            </li>
            <li>
              <strong>Service Dissatisfaction:</strong> If you are not satisfied
              with the quality of the service provided, you may request a refund
              within 30 days of service completion. We will review your request
              and determine if a partial or full refund is appropriate.
            </li>
            <li>
              <strong>Cancellation of Service:</strong> If you cancel the
              service before it has commenced, you may be eligible for a full
              refund. If the service has already started, the refund amount will
              be prorated based on the work completed.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Non-Refundable Services:
          </h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              Custom research reports once delivered are non-refundable due to
              the unique nature of the data and insights provided.
            </li>
            <li>
              Digital marketing campaigns that have been executed or are in
              progress.
            </li>
            <li>
              Design services (UI-UX, logo, website) once final deliverables
              have been approved and handed over.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            How to Request a Refund:
          </h3>
          <p className="mb-4">
            To request a refund, please contact our customer service team at
            <a
              href="mailto:info@3ntechnologies.com"
              className="text-blue-500 underline"
            >
              info@3ntechnologies.com
            </a>
            with the following details:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Your name and contact information</li>
            <li>Service purchased</li>
            <li>Date of purchase</li>
            <li>Reason for the refund request</li>
          </ul>
          <p className="mb-4">
            Our team will review your request and respond within 10 business
            days. Approved refunds will be processed within 14 business days and
            will be credited to your original method of payment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Cancellation Policy
          </h2>
          <p className="mb-4">
            We understand that plans can change, and you may need to cancel your
            service. Our cancellation policy is designed to be flexible while
            ensuring fair compensation for the work already performed.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Service Cancellation by Client:
          </h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              <strong>Before Service Commencement:</strong> You can cancel the
              service without any penalty and receive a full refund if the
              service has not yet started.
            </li>
            <li>
              <strong>After Service Commencement:</strong> If you wish to cancel
              the service after it has commenced, please notify us in writing.
              You will be billed for the work completed up to the date of
              cancellation. The remaining balance, if any, will be refunded.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Service Cancellation by 3N TECHNOLOGIES:
          </h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>
              Inability to perform the service due to unforeseen circumstances
              (e.g., natural disasters, technical issues).
            </li>
            <li>Breach of contract terms by the client.</li>
            <li>
              If the client engages in activities that are illegal or unethical,
              or if they demand actions that compromise our integrity.
            </li>
          </ul>
          <p className="mb-4">
            In such cases, we will provide a written notice and a prorated
            refund based on the work completed.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            How to Cancel a Service:
          </h3>
          <p className="mb-4">
            To cancel a service, please contact our customer service team at
            <a
              href="mailto:info@3ntechnologies.com"
              className="text-blue-500 underline"
            >
              info@3ntechnologies.com
            </a>
            with the following details:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Your name and contact information</li>
            <li>Service to be cancelled</li>
            <li>Reason for cancellation</li>
          </ul>
          <p className="mb-4">
            Our team will acknowledge your cancellation request within 5
            business days and provide information on the refund amount, if
            applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or need further clarification on our
            refund and cancellation policies, please feel free to contact us at
            <a
              href="mailto:info@3ntechnologies.com"
              className="text-blue-500 underline"
            >
              info@3ntechnologies.com
            </a>
            . We are committed to ensuring your satisfaction and will do our
            best to resolve any issues promptly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
