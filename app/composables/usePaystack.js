export const usePaystack = () => {
  const { authenticatedFetch } = useAuth()
  const { showSuccess, showError, showLoading, hideNotification } = useNotifications()
  const config = useRuntimeConfig()

  // Paystack configuration
  const paystackConfig = {
    publicKey: config.public.paystackPublicKey || process.env.PAYSTACK_PUBLIC_KEY,
    baseUrl: 'https://api.paystack.co'
  }

  // Generate unique transaction reference
  const generateReference = (prefix = 'TXN') => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}_${timestamp}_${random}`
  }

  // Initialize payment transaction
  const initializePayment = async (paymentData) => {
    try {
      const loadingId = showLoading('Initializing payment...', 'Payment Processing')

      const payload = {
        email: paymentData.email,
        amount: paymentData.amount * 100, // Convert to kobo
        reference: paymentData.reference || generateReference(),
        callback_url: paymentData.callbackUrl || `${window.location.origin}/payment/callback`,
        currency: paymentData.currency || 'NGN',
        metadata: {
          custom_fields: paymentData.customFields || [],
          ...paymentData.metadata
        },
        ...paymentData.additionalParams
      }

      const response = await authenticatedFetch('/api/payments/initialize', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        // Redirect to Paystack payment page
        if (process.client) {
          window.location.href = response.data.authorization_url
        }

        return response
      } else {
        throw new Error(response.message || 'Failed to initialize payment')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Payment initialization failed')
      throw error
    }
  }

  // Verify payment transaction
  const verifyPayment = async (reference) => {
    try {
      const loadingId = showLoading('Verifying payment...', 'Payment Verification')

      const response = await authenticatedFetch(`/api/payments/verify/${reference}`, {
        method: 'GET'
      })

      hideNotification(loadingId)

      if (response.success) {
        const paymentData = response.data

        if (paymentData.status === 'success') {
          showSuccess('Payment verified successfully', 'Payment Successful')
          return paymentData
        } else {
          showError('Payment was not successful', 'Payment Failed')
          throw new Error('Payment verification failed')
        }
      } else {
        throw new Error(response.message || 'Failed to verify payment')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Payment verification failed')
      throw error
    }
  }

  // Process payment using Paystack inline (client-side)
  const processInlinePayment = (paymentData, callbacks = {}) => {
    if (!process.client || !window.PaystackPop) {
      throw new Error('Paystack script not loaded')
    }

    const handler = window.PaystackPop.setup({
      key: paystackConfig.publicKey,
      email: paymentData.email,
      amount: paymentData.amount * 100,
      ref: paymentData.reference || generateReference(),
      currency: paymentData.currency || 'NGN',
      callback: (response) => {
        if (callbacks.onSuccess) {
          callbacks.onSuccess(response)
        }
        showSuccess('Payment processed successfully', 'Payment Complete')
      },
      onClose: () => {
        if (callbacks.onClose) {
          callbacks.onClose()
        }
        showError('Payment was cancelled', 'Payment Cancelled')
      },
      ...paymentData.options
    })

    handler.openIframe()
  }

  // Create recurring payment/subscription
  const createSubscription = async (subscriptionData) => {
    try {
      const loadingId = showLoading('Setting up subscription...', 'Subscription Setup')

      const payload = {
        customer: subscriptionData.customerEmail,
        plan: subscriptionData.planCode,
        start_date: subscriptionData.startDate,
        ...subscriptionData.additionalParams
      }

      const response = await authenticatedFetch('/api/subscriptions/create', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Subscription created successfully', 'Subscription Active')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create subscription')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Subscription creation failed')
      throw error
    }
  }

  // Create payment plan
  const createPaymentPlan = async (planData) => {
    try {
      const loadingId = showLoading('Creating payment plan...', 'Plan Setup')

      const payload = {
        name: planData.name,
        amount: planData.amount * 100,
        interval: planData.interval, // hourly, daily, weekly, monthly, annually
        description: planData.description,
        ...planData.additionalParams
      }

      const response = await authenticatedFetch('/api/plans/create', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Payment plan created successfully', 'Plan Active')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create payment plan')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Payment plan creation failed')
      throw error
    }
  }

  // Get transaction history
  const getTransactionHistory = async (params = {}) => {
    try {
      const response = await authenticatedFetch('/api/payments/transactions', {
        method: 'GET',
        query: params
      })

      return response.data
    } catch (error) {
      showError('Failed to fetch transaction history')
      throw error
    }
  }

  // Get transaction details
  const getTransactionDetails = async (id) => {
    try {
      const response = await authenticatedFetch(`/api/payments/transactions/${id}`, {
        method: 'GET'
      })

      return response.data
    } catch (error) {
      showError('Failed to fetch transaction details')
      throw error
    }
  }

  // Charge authorization (for recurring charges)
  const chargeAuthorization = async (chargeData) => {
    try {
      const loadingId = showLoading('Processing charge...', 'Payment Processing')

      const payload = {
        authorization_code: chargeData.authorizationCode,
        email: chargeData.email,
        amount: chargeData.amount * 100,
        ...chargeData.additionalParams
      }

      const response = await authenticatedFetch('/api/payments/charge', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Charge processed successfully', 'Payment Complete')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to process charge')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Charge processing failed')
      throw error
    }
  }

  // Handle webhook events
  const handleWebhook = async (eventData) => {
    try {
      const response = await authenticatedFetch('/api/webhooks/paystack', {
        method: 'POST',
        body: eventData
      })

      return response
    } catch (error) {
      console.error('Webhook handling failed:', error)
      throw error
    }
  }

  // Validate webhook signature
  const validateWebhookSignature = (payload, signature) => {
    const secret = config.paystackSecretKey
    const hash = require('crypto')
      .createHmac('sha512', secret)
      .update(JSON.stringify(payload))
      .digest('hex')

    return hash === signature
  }

  // Refund transaction
  const refundTransaction = async (transactionId, amount) => {
    try {
      const loadingId = showLoading('Processing refund...', 'Refund Processing')

      const payload = {
        transaction: transactionId
      }

      if (amount) {
        payload.amount = amount * 100
      }

      const response = await authenticatedFetch('/api/payments/refund', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Refund processed successfully', 'Refund Complete')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to process refund')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Refund processing failed')
      throw error
    }
  }

  // Transfer funds (for marketplace or disbursement)
  const transferFunds = async (transferData) => {
    try {
      const loadingId = showLoading('Processing transfer...', 'Transfer Processing')

      const payload = {
        source: transferData.source || 'balance',
        amount: transferData.amount * 100,
        recipient: transferData.recipientCode,
        reason: transferData.reason,
        ...transferData.additionalParams
      }

      const response = await authenticatedFetch('/api/transfers/initiate', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Transfer initiated successfully', 'Transfer Initiated')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to initiate transfer')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Transfer initiation failed')
      throw error
    }
  }

  // Create transfer recipient
  const createTransferRecipient = async (recipientData) => {
    try {
      const loadingId = showLoading('Creating transfer recipient...', 'Recipient Setup')

      const payload = {
        type: recipientData.type, // nuban, mobile_money, bass
        name: recipientData.name,
        description: recipientData.description,
        ...recipientData.accountDetails
      }

      const response = await authenticatedFetch('/api/transfers/recipient', {
        method: 'POST',
        body: payload
      })

      hideNotification(loadingId)

      if (response.success) {
        showSuccess('Transfer recipient created successfully', 'Recipient Ready')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create transfer recipient')
      }
    } catch (error) {
      hideNotification()
      showError(error.message || 'Transfer recipient creation failed')
      throw error
    }
  }

  // Get bank list
  const getBankList = async (country = 'nigeria') => {
    try {
      const response = await authenticatedFetch('/api/payments/banks', {
        method: 'GET',
        query: { country }
      })

      return response.data
    } catch (error) {
      showError('Failed to fetch bank list')
      throw error
    }
  }

  // Resolve account number
  const resolveAccountNumber = async (accountNumber, bankCode) => {
    try {
      const response = await authenticatedFetch('/api/payments/resolve-account', {
        method: 'GET',
        query: {
          account_number: accountNumber,
          bank_code: bankCode
        }
      })

      return response.data
    } catch (error) {
      showError('Failed to resolve account number')
      throw error
    }
  }

  // Load Paystack script
  const loadPaystackScript = () => {
    return new Promise((resolve, reject) => {
      if (process.client && window.PaystackPop) {
        resolve()
        return
      }

      if (process.client) {
        const script = document.createElement('script')
        script.src = 'https://js.paystack.co/v1/inline.js'
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      } else {
        reject(new Error('Paystack script can only be loaded on client side'))
      }
    })
  }

  // Initialize Paystack for client-side usage
  const initializePaystack = async () => {
    try {
      await loadPaystackScript()
      return true
    } catch (error) {
      console.error('Failed to load Paystack script:', error)
      return false
    }
  }

  return {
    // Configuration
    paystackConfig,

    // Core payment functions
    initializePayment,
    verifyPayment,
    processInlinePayment,

    // Subscriptions and plans
    createSubscription,
    createPaymentPlan,

    // Transaction management
    getTransactionHistory,
    getTransactionDetails,
    refundTransaction,

    // Recurring payments
    chargeAuthorization,

    // Transfers
    transferFunds,
    createTransferRecipient,

    // Utilities
    getBankList,
    resolveAccountNumber,
    generateReference,

    // Webhook handling
    handleWebhook,
    validateWebhookSignature,

    // Script loading
    initializePaystack,
    loadPaystackScript
  }
}