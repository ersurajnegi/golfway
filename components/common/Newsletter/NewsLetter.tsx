import NewsLetterForm from './NewsLetterForm'
// import { ReactMailchimpEmailSignupForm } from 'react-mailchimp-email-signup-form'

import MailchimpSubscribe from 'react-mailchimp-subscribe'

const Newsletter = () => {
  const MAILCHIMP_URL = process.env.MAILCHIMP_URL

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(props: any) => {
        const { subscribe, status, message } = props || {}
        return (
          <NewsLetterForm
            status={status}
            message={message}
            onValidated={(formData: any) => subscribe(formData)}
          />
        )
      }}
    />
  )
}

export default Newsletter
