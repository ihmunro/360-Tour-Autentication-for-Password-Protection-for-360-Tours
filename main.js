import { createClient } from '@supabase/supabase-js'
import './style.css'

const supabase = createClient(
  'https://arwjyezkiashljznfrks.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyd2p5ZXpraWFzaGxqem5mcmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzQ0OTAsImV4cCI6MjA1Njk1MDQ5MH0.k5TTolW8fO5uTYmTSoaTg2L0fhEUAHV1jJlYQQIPJyk'
)

let isLoginMode = true

window.toggleMode = () => {
  isLoginMode = !isLoginMode
  const fullNameField = document.getElementById('fullNameField')
  const mainButton = document.getElementById('mainButton')
  const toggleText = document.getElementById('toggleText')
  document.getElementById('error').textContent = ''
  document.getElementById('success').textContent = ''

  if (isLoginMode) {
    fullNameField.style.display = 'none'
    mainButton.textContent = 'Login'
    toggleText.textContent = "Don't have an account? Register"
    mainButton.onclick = window.login
  } else {
    fullNameField.style.display = 'block'
    mainButton.textContent = 'Register'
    toggleText.textContent = 'Already have an account? Login'
    mainButton.onclick = window.register
  }
}

window.login = async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const errorElement = document.getElementById('error')
  const successElement = document.getElementById('success')
  
  try {
    errorElement.textContent = ''
    successElement.textContent = 'Logging in...'
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error

    successElement.textContent = 'Login successful! Redirecting...'
    window.open('https://virtually-anywhere.com/', '_blank')

  } catch (error) {
    successElement.textContent = ''
    errorElement.textContent = error.message
  }
}

window.register = async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const fullName = document.getElementById('fullName').value
  const errorElement = document.getElementById('error')
  const successElement = document.getElementById('success')
  
  if (!fullName) {
    errorElement.textContent = 'Please enter your full name'
    return
  }

  try {
    errorElement.textContent = ''
    successElement.textContent = 'Registering...'
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    
    if (error) throw error
    
    successElement.textContent = 'Registration successful! Please check your email for confirmation.'
    errorElement.textContent = ''
  } catch (error) {
    successElement.textContent = ''
    errorElement.textContent = error.message
  }
}
