// Stripe configuration
//const stripe = stripe(pk_test_51N7bYASGkJ6I2OuufLbKNlrsv5IP8pUSFkGwcMUycnuSpidVHes4bQUyjngx2eWCMb6EX9Xc0mOHAWKlLaAa2CXs00O8YjymwW);
// Create a function to handle the payment process
//const elements = stripe.elements();
// Retrieve the total price from local storage
const tPrice = 56;//localStorage.getItem('totalPrice');


// Create a function to handle the payment process
const handlePayment = async () => {
      let addr = getAddress();
      console.log(addr);

  try {
    // Fetch the server endpoint to create a payment intent
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ totalPrice })
    });

    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(cardElement)
      }
    });

    if (result.error) {
      // Handle payment error
      console.error(result.error.message);
    } else {
      // Payment successful, show success message
      console.log('Payment successful!');
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

const getAddress = () => {
      let addr = document.querySelector('#address').value;
      let city = document.querySelector('#city').value;
      let state = document.querySelector('#state').value;
      let pin = document.querySelector('#pin').value;

      //Form Validation
      if (!addr.length || !city.length || !state.length || !pin.length) {
            return alert("Fill the Complete Address");
      }
      else {
            return { addr, city, state, pin };
      }
}

const placeorderbtn = document.querySelector('.placeOrder');
placeorderbtn.addEventListener('click', handlePayment);
