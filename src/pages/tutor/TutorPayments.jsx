import { Wallet } from 'lucide-react';

const TutorPayments = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments & Earnings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <Wallet className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Wallet & Payouts</h2>
        <p className="text-gray-500 max-w-md">
          Track your tutoring hours, view detailed transaction history, and manage your bank payouts. Check back soon.
        </p>
      </div>
    </div>
  );
};

export default TutorPayments;