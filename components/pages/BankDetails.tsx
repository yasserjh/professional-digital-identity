/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const BankDetails: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 space-y-10">
            <header className="space-y-3 text-center sm:text-left">
                <p className="text-sm uppercase tracking-wide text-[#008080] font-semibold">Payments</p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-[#1B1B1B]">Bank Transfer Details</h1>
                <p className="text-neutral-600 max-w-2xl">
                    Prefer to top up your Egal credits via bank transfer? Use the account details below and email
                    us the receipt so we can activate your balance right away.
                </p>
            </header>

            <section className="grid gap-6">
                <article className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-[#1B1B1B]">Primary Account</h2>
                            <p className="text-neutral-600">
                                Please include your registered email address in the transfer description so we can match it to
                                your account without delay.
                            </p>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm sm:text-base">
                            <div className="space-y-1">
                                <dt className="text-neutral-500 uppercase tracking-wide">Account Name</dt>
                                <dd className="font-medium text-[#1B1B1B]">Egal Digital Identity</dd>
                            </div>
                            <div className="space-y-1">
                                <dt className="text-neutral-500 uppercase tracking-wide">Bank</dt>
                                <dd className="font-medium text-[#1B1B1B]">Saudi National Bank (SNB)</dd>
                            </div>
                            <div className="space-y-1">
                                <dt className="text-neutral-500 uppercase tracking-wide">IBAN</dt>
                                <dd className="font-mono text-[#1B1B1B] break-all">SA03 8000 0200 6080 1101 2345</dd>
                            </div>
                            <div className="space-y-1">
                                <dt className="text-neutral-500 uppercase tracking-wide">SWIFT</dt>
                                <dd className="font-medium text-[#1B1B1B]">NCBKSAJE</dd>
                            </div>
                        </dl>

                        <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-5 text-sm text-neutral-600 space-y-2">
                            <p className="font-semibold text-[#1B1B1B]">What happens next?</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Send your transfer receipt to <a href="mailto:billing@egal-app.com" className="text-[#008080] underline">billing@egal-app.com</a>.</li>
                                <li>Credits are issued within 1 business day once the payment is confirmed.</li>
                                <li>Need an invoice? Mention it in your email and we will send it as a PDF.</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <article className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50">
                    <div className="p-6 sm:p-8 space-y-4">
                        <h2 className="text-xl font-semibold text-[#1B1B1B]">Additional Notes</h2>
                        <ul className="list-disc list-inside text-neutral-600 space-y-2">
                            <li>We currently accept transfers in SAR (Saudi Riyal). Contact us for USD or AED settlements.</li>
                            <li>For enterprise agreements we can issue standing invoices with net-30 payment terms.</li>
                            <li>If you send a transfer outside business hours, processing will resume the next business day.</li>
                        </ul>
                        <p className="text-neutral-500 text-sm">
                            For urgent activations call us at <a href="tel:+966500000000" className="text-[#008080] underline">+966 50 000 0000</a> and
                            provide your transfer reference number.
                        </p>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default BankDetails;
