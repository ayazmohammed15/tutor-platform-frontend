import api from './api';

let razorpayScriptPromise = null;

const loadRazorpayScript = () => {
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

export const paymentService = {
  createOrder: async (sessionId, paymentMethod = 'upi') => {
    const response = await api.post(`/payments/create-order/${sessionId}`, {
      payment_method: paymentMethod,
    }, {
      suppressGlobalError: true,
    });
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData, {
      suppressGlobalError: true,
    });
    return response.data;
  },

  initiateRazorpay: async (orderData, onSuccess, onFailure) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded || !window.Razorpay) {
      onFailure('Razorpay SDK failed to load');
      return;
    }

    const options = {
      key: orderData.keyId,
      amount: Number(orderData.amount) * 100,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: 'Tutor Booking Platform',
      description: 'Session Payment',
      handler: function (response) {
        onSuccess({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: orderData.userName || '',
        email: orderData.userEmail || '',
      },
      theme: {
        color: '#3B82F6',
      },
      modal: {
        ondismiss: function () {
          onFailure('Payment cancelled');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      onFailure(response.error?.description || 'Payment failed');
    });
    rzp.open();
  },
};
