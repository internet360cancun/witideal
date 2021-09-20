export function gtag_report_conversion(value, oId = '') {
  try {
    window.gtag('event', 'conversion',  { 
      'send_to': 'AW-625232540/A5WACNuy1dQBEJyVkaoC', 
      'value': value, 
      'currency': 'MXN', 
      'transaction_id': oId, 
      'event_callback': () => {} 
    })
  } catch (error) {
    console.log('gtahError', error)
  }
}

export default gtag_report_conversion
