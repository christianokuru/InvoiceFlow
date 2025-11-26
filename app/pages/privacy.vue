<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p class="text-lg text-gray-600">
          Last updated: {{ formatDate(lastUpdated) }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div class="prose prose-lg max-w-none">
            <!-- Introduction -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p class="text-gray-600 mb-4">
                InvoiceFlow ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our invoice and receipt management platform (the "Service").
              </p>
              <p class="text-gray-600">
                By using InvoiceFlow, you consent to the collection and use of information in accordance with this policy. If you disagree with any part of this privacy policy, please do not use our Service.
              </p>
            </div>

            <!-- Information We Collect -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  We collect several types of information to provide and improve our Service to you:
                </p>

                <h3 class="text-lg font-semibold text-gray-900 mt-4">Personal Information</h3>
                <p>
                  When you register for an account, we collect personally identifiable information such as:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Name and email address</li>
                  <li>Phone number</li>
                  <li>Business address</li>
                  <li>Payment information (processed securely through Paystack)</li>
                  <li>Business registration details</li>
                </ul>

                <h3 class="text-lg font-semibold text-gray-900 mt-4">Business Data</h3>
                <p>
                  Information you create and store in our Service, including:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Invoice and receipt data</li>
                  <li>Client information and contact details</li>
                  <li>Financial transaction records</li>
                  <li>Business documents and templates</li>
                </ul>

                <h3 class="text-lg font-semibold text-gray-900 mt-4">Usage Data</h3>
                <p>
                  We automatically collect information about how you use our Service:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Feature usage patterns</li>
                  <li>Performance and diagnostic data</li>
                </ul>
              </div>
            </div>

            <!-- How We Use Your Information -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p class="text-gray-600 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul class="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Service Provision:</strong> To provide, maintain, and improve our Service</li>
                <li><strong>Account Management:</strong> To create and manage your account</li>
                <li><strong>Communication:</strong> To send you important notices, updates, and support messages</li>
                <li><strong>Security:</strong> To protect against fraud and ensure the security of our platform</li>
                <li><strong>Analytics:</strong> To analyze usage patterns and improve user experience</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and prevent illegal activities</li>
                <li><strong>Marketing:</strong> To send you promotional communications (with your consent)</li>
              </ul>
            </div>

            <!-- Data Storage and Security -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  We take data security seriously and implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>All data is encrypted in transit using SSL/TLS protocols</li>
                  <li>Sensitive data is encrypted at rest using industry-standard encryption</li>
                  <li>We use secure data centers with 24/7 monitoring</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Employee access controls and confidentiality agreements</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
                </p>
              </div>
            </div>

            <!-- Data Sharing -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li><strong>Payment Processors:</strong> We share payment information with Paystack to process transactions securely</li>
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist in operating our Service</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </div>
            </div>

            <!-- Cookies and Tracking -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain information:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Service</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling cookies may affect your ability to use certain features of our Service.
                </p>
              </div>
            </div>

            <!-- Data Retention -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p class="text-gray-600">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We may retain your data for:
              </p>
              <ul class="list-disc pl-6 space-y-2 text-gray-600">
                <li>The duration of your active account and subscription</li>
                <li>As required to comply with legal obligations</li>
                <li>To resolve disputes and enforce our agreements</li>
                <li>For legitimate business interests as permitted by law</li>
              </ul>
              <p class="text-gray-600">
                When you delete your account, we will delete or anonymize your personal information unless we are required to retain it for legal or security purposes.
              </p>
            </div>

            <!-- Your Rights -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Your Data Rights</h2>
              <p class="text-gray-600 mb-4">
                Under Nigerian data protection laws, you have the following rights regarding your personal information:
              </p>
              <ul class="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p class="text-gray-600">
                To exercise these rights, please contact us at privacy@invoiceflow.com. We will respond to your request within 30 days.
              </p>
            </div>

            <!-- International Data Transfers -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p class="text-gray-600">
                Your information may be transferred to and processed in countries other than Nigeria. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </div>

            <!-- Children's Privacy -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p class="text-gray-600">
                Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
              </p>
            </div>

            <!-- Changes to Privacy Policy -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p class="text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <!-- Contact Information -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p class="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div class="bg-gray-50 p-4 rounded-lg text-gray-600">
                <p><strong>Email:</strong> privacy@invoiceflow.com</p>
                <p><strong>Phone:</strong> +234 800 123 4567</p>
                <p><strong>Address:</strong> 123 Tech Hub Drive, Victoria Island, Lagos, Nigeria</p>
                <p class="mt-2"><strong>Data Protection Officer:</strong> dpo@invoiceflow.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'Privacy Policy - InvoiceFlow',
  description: 'Learn how InvoiceFlow collects, uses, and protects your personal information. Our comprehensive privacy policy explains our commitment to data security and user privacy.',
  keywords: 'privacy policy, data protection, user privacy, InvoiceFlow data security',
  ogTitle: 'InvoiceFlow Privacy Policy',
  ogDescription: 'How InvoiceFlow protects your data and privacy when using our invoice management platform.'
})

// Last updated date
const lastUpdated = new Date('2024-01-15')

// Format date helper
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>