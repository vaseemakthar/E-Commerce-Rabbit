import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PayPalButton = ({ amount, onSuccess, onError }) => {

  const formattedAmount = parseFloat(amount).toFixed(2);

  return (<PayPalScriptProvider options={{"client-id" : import.meta.env.VITE_PAYPAL_CLIENT_ID}}>
    <PayPalButtons style={{layout:"vertical"}}

      createOrder={(data, actions)=>{
        return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: formattedAmount
              }
            }]
        })
      }}

      onApprove={(data, actions)=>{
        return actions.order.capture().then(onSuccess)
      }}

      onError={onError} />
  </PayPalScriptProvider>)
}

export default PayPalButton