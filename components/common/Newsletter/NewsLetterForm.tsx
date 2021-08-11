import { useState } from 'react'
import { decode } from 'html-entities'
import s from './NewsLetter.module.scss'

const NewsletterForm = ({
  status,
  message,
  onValidated,
}: {
  status: any
  message: any
  onValidated: any
}) => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null)

    if (!email) {
      setError('Please enter a valid email address')
      return null
    }

    const isFormValidated = onValidated({ EMAIL: email })

    // On success return true
    return email && email.indexOf('@') > -1 && isFormValidated
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event: any) => {
    setError(null)
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault()
      // Trigger the button element with a click
      handleFormSubmit()
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message: any) => {
    if (!message) {
      return null
    }
    const result = message?.split('-') ?? null
    if ('0' !== result?.[0]?.trim()) {
      return decode(message)
    }
    const formattedMessage = result?.[1]?.trim() ?? null
    return formattedMessage ? decode(formattedMessage) : null
  }

  return (
    <>
      <div className={s.newsLetterWrap}>
        <div className={s.newsLetterContainer}>
          <div className={s.inputWrap}>
            <input
              onChange={(event: any) => setEmail(event?.target?.value ?? '')}
              type="email"
              placeholder="Enter email"
              className={s.input}
              onKeyUp={(event) => handleInputKeyEvent(event)}
            />
          </div>
          <div className={s.buttonWrap}>
            <button className={s.button} onClick={handleFormSubmit}>
              Sign-up
            </button>
          </div>
        </div>
        <div className={s.newsLetterInfoContainer}>
          {status === 'sending' && <div>Sending...</div>}
          {status === 'error' || error ? (
            <div
              className={s.newsLetterError}
              dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
            />
          ) : null}
          {status === 'success' && status !== 'error' && !error && (
            <div
              className={s.newsLetterValid}
              dangerouslySetInnerHTML={{ __html: decode(message) }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default NewsletterForm
