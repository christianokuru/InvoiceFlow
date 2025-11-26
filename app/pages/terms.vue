<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
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
                Welcome to InvoiceFlow. These Terms of Service ("Terms") govern your use of our invoice and receipt management platform and related services (collectively, the "Service") operated by InvoiceFlow ("we," "us," or "our").
              </p>
              <p class="text-gray-600">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </div>

            <!-- Use of Service -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Use of Service</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  You must be at least 18 years old to use this Service. By using this Service, you represent and warrant that you are at least 18 years of age.
                </p>
                <p>
                  You agree to use this Service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Violate any international, federal, or local laws or regulations</li>
                  <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload or transmit viruses, malware, or any other malicious code</li>
                  <li>Spam, harass, or harm other users</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </div>

            <!-- Accounts -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Accounts</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>
                <p>
                  You agree to notify us immediately if you suspect any unauthorized use of your account or access to your password. You are responsible for all activities that occur under your account, whether or not you authorized such activities.
                </p>
                <p>
                  We reserve the right to suspend or terminate your account at any time for any reason, including violation of these Terms.
                </p>
              </div>
            </div>

            <!-- Subscription Plans and Payments -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Subscription Plans and Payments</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  InvoiceFlow offers both free and paid subscription plans. Paid plans are billed on a monthly or annual basis, as selected during signup.
                </p>
                <p>
                  <strong>Subscription Fees:</strong> You agree to pay all fees associated with your selected subscription plan in accordance with the pricing stated at the time of your order.
                </p>
                <p>
                  <strong>Billing Cycle:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period.
                </p>
                <p>
                  <strong>Payment Method:</strong> You agree to provide current, complete, and accurate purchase and account information for all purchases made through our Service. You authorize us to charge the payment method you provide for all such purchases.
                </p>
                <p>
                  <strong>Paystack Integration:</strong> All payment processing is handled through Paystack, our trusted payment processor. By using our paid services, you agree to Paystack's terms of service.
                </p>
                <p>
                  <strong>Refunds:</strong> We offer a 30-day money-back guarantee for new subscriptions. After 30 days, refunds are provided at our discretion.
                </p>
              </div>
            </div>

            <!-- Intellectual Property -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of InvoiceFlow and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p>
                  <strong>Your Content:</strong> You retain ownership of all content you upload or create using our Service. By using our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing and improving our Service.
                </p>
                <p>
                  <strong>Trademarks:</strong> InvoiceFlow and related graphics, logos, and service names are trademarks of InvoiceFlow and may not be used without our prior written consent.
                </p>
              </div>
            </div>

            <!-- Privacy -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Privacy</h2>
              <p class="text-gray-600">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using InvoiceFlow, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>

            <!-- Termination -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason, including but not limited to:
                </p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Breach of these Terms</li>
                  <li>Use of the Service for illegal or unauthorized purposes</li>
                  <li>Violation of intellectual property rights</li>
                  <li>Fraudulent or suspicious activity</li>
                </ul>
                <p>
                  Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                </p>
              </div>
            </div>

            <!-- Limitation of Liability -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p class="text-gray-600 mb-4">
                In no event shall InvoiceFlow, our directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul class="list-disc pl-6 space-y-2 text-gray-600">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Service</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available through the Service</li>
              </ul>
            </div>

            <!-- Governing Law -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p class="text-gray-600">
                These Terms shall be interpreted and governed by the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Lagos, Nigeria.
              </p>
            </div>

            <!-- Changes to Terms -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p class="text-gray-600">
                We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our Service prior to the effective date of the changes. Your continued use of the Service after such modifications constitutes your acknowledgment and acceptance of the updated Terms.
              </p>
            </div>

            <!-- Contact Information -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p class="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div class="bg-gray-50 p-4 rounded-lg text-gray-600">
                <p><strong>Email:</strong> legal@invoiceflow.com</p>
                <p><strong>Phone:</strong> +234 800 123 4567</p>
                <p><strong>Address:</strong> 123 Tech Hub Drive, Victoria Island, Lagos, Nigeria</p>
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
  title: 'Terms of Service - InvoiceFlow',
  description: 'Read our Terms of Service to understand your rights and responsibilities when using InvoiceFlow\'s invoice and receipt management platform.',
  keywords: 'terms of service, legal agreement, user terms, InvoiceFlow terms',
  ogTitle: 'InvoiceFlow Terms of Service',
  ogDescription: 'Terms and conditions for using the InvoiceFlow platform.'
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