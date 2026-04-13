import React, { useState } from 'react';
import useStore from '../store/useStore';
import { CreditCard, CheckCircle2, Clock, Wallet, ShieldCheck, Lock } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const SummaryCard = ({ title, amount, icon: Icon, type }) => {
  const isPaid = type === 'paid';
  const isPending = type === 'pending';
  const colorClass = isPaid ? 'text-emerald-600' : isPending ? 'text-orange-500' : 'text-blue-600';
  const bgClass = isPaid ? 'bg-emerald-50 dark:bg-emerald-900/30' : isPending ? 'bg-orange-50 dark:bg-orange-900/30' : 'bg-blue-50 dark:bg-blue-900/30';
  const colorClassDark = isPaid ? 'dark:text-emerald-400' : isPending ? 'dark:text-orange-400' : 'dark:text-blue-400';

  return (
    <div className="card p-6 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-md ${bgClass}`}>
            <Icon className={`w-4 h-4 ${colorClass}`} />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">{title}</p>
        </div>
        <h3 className={`text-3xl font-bold ${colorClass} ${colorClassDark} transition-colors duration-300`}>
          ₦{amount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

const Fees = () => {
  const { feesHistory, totalFees, amountPaid, amountPending, payFee } = useStore();
  
  const [selectedFee, setSelectedFee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => setToast({ isVisible: true, message, type });

  const handlePayClick = (fee) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  const handlePrintReceipt = (fee) => {
    setSelectedFee(fee);
    setShowReceipt(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        payFee(selectedFee.id);
        setIsModalOpen(false);
        setIsSuccess(false);
        showToast(`Payment of ₦${selectedFee.amount.toLocaleString()} was successful!`);
        setShowReceipt(true); // Auto popup receipt after successful payment!
      }, 1500);
    }, 2000);
  };

  const user = useStore(state => state.user);

  return (
    <PageTransition>
      <div className="space-y-6 relative">
        <Toast 
          isVisible={toast.isVisible} 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
        />

        <Modal isOpen={isModalOpen} onClose={() => !isProcessing && !isSuccess && setIsModalOpen(false)} title="Secure Payment Gateway">
          {isSuccess ? (
            <div className="text-center py-8 animate-fade-in transition-colors duration-300">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-300">Payment Successful</h3>
              <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">Your receipt has been dynamically generated.</p>
            </div>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              {/* Added a gateway banner to mimic Paystack */}
              <div className="flex justify-center items-center h-8 mb-4 opacity-70">
                 <span className="font-bold tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2"><Lock className="w-4 h-4"/> SECURE GATEWAY</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl p-4 mb-6 transition-colors duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Paying for</p>
                    <p className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">{selectedFee?.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Amount Due</p>
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400 transition-colors duration-300">₦{selectedFee?.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors duration-300">Card Number</label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    required
                    placeholder="0000 0000 0000 0000" 
                    maxLength="19"
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors duration-300">Expiry Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="MM/YY" 
                    maxLength="5"
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors duration-300">CVV</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      placeholder="123" 
                      maxLength="3"
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors duration-300"
                    />
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 pb-4 border-b border-slate-100 dark:border-slate-700/50 transition-colors duration-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Payments are securely processed and encrypted.
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full btn-primary py-3 flex justify-center items-center gap-2 text-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Secure Engine...</span>
                  </div>
                ) : (
                  <span>Pay ₦{selectedFee?.amount.toLocaleString()}</span>
                )}
              </button>
            </form>
          )}
        </Modal>

        {/* Payment Receipt Modal */}
        <Modal isOpen={showReceipt} onClose={() => setShowReceipt(false)} title="Transaction Receipt">
          <div id="receipt-print-area" className="bg-white text-slate-900 p-6 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-none relative max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="absolute top-6 right-6 text-emerald-600 opacity-20 hidden md:block">
               <ShieldCheck className="w-16 h-16 rotate-12" />
            </div>
            
            <div className="text-left mb-6 pb-4 border-b-2 border-dashed border-slate-200">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900">Nigerian Army University Biu</h2>
              <p className="text-slate-500 font-medium">Bursary Department - Official e-Receipt</p>
              <div className="mt-4 break-words font-mono text-sm text-slate-400">
                REF: {Math.random().toString(36).substring(2, 15).toUpperCase()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Student Details</p>
                <p className="font-bold text-lg text-slate-800">{user?.name || 'Student Name'}</p>
                <p className="text-slate-600 font-medium">{user?.id || 'STU/XXX/XXX'}</p>
                <p className="text-slate-600">{user?.department}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Payment Date</p>
                <p className="font-bold text-slate-800">{selectedFee?.dueDate}</p>
                <p className="text-slate-600 mt-2 text-sm">Valid for {user?.level}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-100">
              <h3 className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-4 border-b border-slate-200 pb-2">Transaction Particulars</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-slate-700">{selectedFee?.description}</span>
                <span className="font-bold text-slate-900">₦{selectedFee?.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-slate-700">Convenience Fee</span>
                <span className="font-bold text-slate-900">₦0</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-4">
                <span className="font-bold text-slate-900 text-lg">Total Paid</span>
                <span className="font-bold text-emerald-600 text-2xl">₦{selectedFee?.amount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="text-center text-xs text-slate-400 font-medium my-8">
               This is a computer-generated receipt and does not require a physical signature.
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => {
                const printContent = document.getElementById('receipt-print-area');
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Receipt - ${selectedFee?.description}</title>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }</style>
                    </head>
                    <body class="p-8 max-w-3xl mx-auto">${printContent.innerHTML}<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500);};</script></body>
                  </html>
                `);
                printWindow.document.close();
              }}
              className="btn-primary flex items-center gap-2"
            >
              Print e-Receipt
            </button>
          </div>
        </Modal>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Fees & Payments</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">Manage your university tuition, course fees, and transaction history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Fees" amount={totalFees} icon={Wallet} type="total" />
          <SummaryCard title="Amount Paid" amount={amountPaid} icon={CheckCircle2} type="paid" />
          <SummaryCard title="Amount Pending" amount={amountPending} icon={Clock} type="pending" />
        </div>

        <div className="card overflow-hidden mt-8">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center transition-colors duration-300">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300">Fee Breakdown & History</h3>
            <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300">Download Statement</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="table-header">Description</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {feesHistory.map((fee) => {
                  const isPaid = fee.status === 'Paid';
                  return (
                    <tr key={fee.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-300">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          {isPaid ? (
                            <div className="mt-0.5 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                            </div>
                          ) : (
                            <div className="mt-0.5 w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                              <Clock className="w-5 h-5 text-orange-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300">{fee.description}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                              {isPaid ? `Paid on ${fee.dueDate}` : `Due by ${fee.dueDate}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        ₦{fee.amount.toLocaleString()}
                      </td>
                      <td className="table-cell text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                        {fee.dueDate}
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold w-20 transition-colors duration-300
                          ${isPaid ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400'}`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="table-cell text-right">
                        {isPaid ? (
                          <button 
                            onClick={() => handlePrintReceipt(fee)}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                          >
                            Print Receipt
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePayClick(fee)}
                            className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Fees;
