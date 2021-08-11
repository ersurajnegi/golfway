import NewsLetterForm from './NewsLetterForm'
// import { ReactMailchimpEmailSignupForm } from 'react-mailchimp-email-signup-form'

import MailchimpSubscribe from 'react-mailchimp-subscribe'

// export async function getStaticProps() {
//   return {
//     props: {
//       url: process.env.MAILCHIMP_URL,
//     },
//   }
// }

const Newsletter = (props: any) => {
  // const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || ''
  // console.log('mail chimp url ', props.url)

  return (
    <MailchimpSubscribe
      url={props.url}
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
