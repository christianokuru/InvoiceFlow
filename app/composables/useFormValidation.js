export const useFormValidation = (rules, formData) => {
  const errors = ref({})
  const isValid = computed(() => {
    return Object.values(errors.value).every(error => !error)
  })

  const validateField = (field, value) => {
    const fieldRules = rules[field]
    if (!fieldRules) return true

    for (const rule of fieldRules) {
      if (typeof rule === 'function') {
        const result = rule(value, formData)
        if (result !== true) {
          errors.value[field] = result
          return false
        }
      } else if (rule.required && (!value || value.toString().trim() === '')) {
        errors.value[field] = rule.message || `${field} is required`
        return false
      } else if (rule.email && value && !validateEmail(value)) {
        errors.value[field] = rule.message || 'Please enter a valid email address'
        return false
      } else if (rule.phone && value && !validatePhone(value)) {
        errors.value[field] = rule.message || 'Please enter a valid phone number'
        return false
      } else if (rule.minLength && value && value.length < rule.minLength) {
        errors.value[field] = rule.message || `Must be at least ${rule.minLength} characters`
        return false
      }
    }

    delete errors.value[field]
    return true
  }

  const validateForm = () => {
    let isValid = true
    for (const field in rules) {
      if (!validateField(field, formData[field])) {
        isValid = false
      }
    }
    return isValid
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const clearFieldError = (field) => {
    delete errors.value[field]
  }

  return {
    errors: readonly(errors),
    isValid,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError
  }
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone)
}