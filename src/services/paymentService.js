import api from './api';

export const paymentService = {
  createOrder: async (sessionId) => {
    const response = await api.post(`/payments/create-order/${sessionId}`);
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  },

  initiateRazorpay: (orderData, onSuccess, onFailure) => {
    const options = {
      key: orderData.keyId,
      amount: orderData.amount * 100,
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
      onFailure(response.error.description);
    });
    rzp.open();
  },
};
