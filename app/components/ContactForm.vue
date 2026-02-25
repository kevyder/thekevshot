<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const token = ref('')
const turnstileRef = ref()

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const success = ref(false)
const serverError = ref('')

function clearErrors() {
  for (const key of Object.keys(errors)) {
    delete errors[key]
  }
  serverError.value = ''
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(): boolean {
  clearErrors()

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
  } else if (form.firstName.trim().length > 50) {
    errors.firstName = 'First name must be 50 characters or fewer'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
  } else if (form.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be 50 characters or fewer'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Enter a valid email address'
  } else if (form.email.trim().length > 254) {
    errors.email = 'Email must be 254 characters or fewer'
  }

  if (!form.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (form.subject.trim().length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer'
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
  } else if (form.message.trim().length > 5000) {
    errors.message = 'Message must be 5000 characters or fewer'
  }

  if (!token.value) {
    errors.token = 'Please complete the verification challenge'
  }

  return Object.keys(errors).length === 0
}

async function submitForm() {
  success.value = false
  serverError.value = ''

  if (!validate()) return

  submitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        token: token.value,
      },
    })

    success.value = true
  } catch (err: unknown) {
    const fetchErr = err as { data?: { data?: { details?: Array<{ field: string; message: string }> }; error?: string }; statusCode?: number }

    if (fetchErr.statusCode === 422 && fetchErr.data?.data?.details) {
      for (const detail of fetchErr.data.data.details) {
        errors[detail.field] = detail.message
      }
    } else if (fetchErr.statusCode === 429) {
      serverError.value = 'Too many requests. Please try again later.'
    } else {
      serverError.value = 'Something went wrong. Please try again later.'
    }
  } finally {
    submitting.value = false
    turnstileRef.value?.reset()
    token.value = ''
  }
}
</script>

<template>
  <div v-if="success" class="thank-you" role="status">
    <h2 class="thank-you-heading">Thank You</h2>
    <p class="thank-you-text">
      Your message has been sent. I'll get back to you as soon as I can.
    </p>
  </div>

  <form
    v-else
    class="contact-form"
    novalidate
    @submit.prevent="submitForm"
  >
    <div class="name-row">
      <div class="field">
        <label for="contact-first-name">First Name</label>
        <input
          id="contact-first-name"
          v-model="form.firstName"
          type="text"
          maxlength="50"
          autocomplete="given-name"
          required
        />
        <p v-if="errors.firstName" class="field-error" role="alert">
          {{ errors.firstName }}
        </p>
      </div>

      <div class="field">
        <label for="contact-last-name">Last Name</label>
        <input
          id="contact-last-name"
          v-model="form.lastName"
          type="text"
          maxlength="50"
          autocomplete="family-name"
          required
        />
        <p v-if="errors.lastName" class="field-error" role="alert">
          {{ errors.lastName }}
        </p>
      </div>
    </div>

    <div class="field">
      <label for="contact-email">Email</label>
      <input
        id="contact-email"
        v-model="form.email"
        type="email"
        maxlength="254"
        autocomplete="email"
        required
      />
      <p v-if="errors.email" class="field-error" role="alert">
        {{ errors.email }}
      </p>
    </div>

    <div class="field">
      <label for="contact-subject">Subject</label>
      <input
        id="contact-subject"
        v-model="form.subject"
        type="text"
        maxlength="150"
        required
      />
      <p v-if="errors.subject" class="field-error" role="alert">
        {{ errors.subject }}
      </p>
    </div>

    <div class="field">
      <label for="contact-message">Message</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        maxlength="5000"
        rows="6"
        required
      />
      <p v-if="errors.message" class="field-error" role="alert">
        {{ errors.message }}
      </p>
    </div>

    <div class="turnstile">
      <NuxtTurnstile ref="turnstileRef" v-model="token" />
      <p v-if="errors.token" class="field-error" role="alert">
        {{ errors.token }}
      </p>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? 'Sending...' : 'Send Message' }}
      </button>
    </div>

    <p v-if="serverError" class="form-error" role="alert">
      {{ serverError }}
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.name-row {
  display: flex;
  gap: 1rem;
}

.name-row .field {
  flex: 1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field label {
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.field input,
.field textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-family: inherit;
  font-size: 1rem;
  color: #111;
  background: #fff;
  transition: border-color 0.2s ease;
}

.field input:focus,
.field textarea:focus {
  border-color: #111;
  outline: none;
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.field-error {
  margin: 0;
  color: #b00020;
  font-size: 0.85rem;
}

.turnstile {
  margin: auto;
}

.form-actions {
  margin: auto;
}

.submit-btn {
  padding: 0.75rem 2rem;
  background: #111;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid #111;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #fff;
  color: #111;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-error {
  margin: 0;
  color: #b00020;
  font-weight: 600;
}

.thank-you {
  text-align: center;
  padding: 3rem 1rem;
}

.thank-you-heading {
  font-family: 'Oswald', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem;
}

.thank-you-text {
  color: #444;
  font-size: 1.1rem;
  margin: 0;
}

@media (max-width: 480px) {
  .name-row {
    flex-direction: column;
    gap: 1.25rem;
  }
}
</style>
