import React, { useState } from 'react';
import { Building, Users, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import PageTransition from '../components/PageTransition';

const HostelManagement = () => {
  const user = useStore(state => state.user);
  const hostels = useStore(state => state.hostels);
  const bookRoom = useStore(state => state.bookRoom);
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleRoomClick = (room) => {
    if (room.status === 'Full' || user?.hostelRoom) return;
    setSelectedRoom(room);
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      bookRoom(selectedRoom.id);
      setIsProcessing(false);
      setShowPaymentModal(false);
      showToast('Payment successful! Room booked successfully.');
      setSelectedRoom(null);
    }, 1500);
  };

  const hasBooked = !!user?.hostelRoom;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Accommodation</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Manage your campus hostel bookings</p>
          </div>
          {hasBooked && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-xl transition-colors shrink-0">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Room {user.hostelRoom.number} Booked</span>
            </div>
          )}
        </div>
      </div>

      {hasBooked ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700/50 text-center animate-fade-in transition-colors">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <Building className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">You're all set!</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 transition-colors">
            You have successfully booked {user.hostelRoom.type} (Room {user.hostelRoom.number}). Your accommodation fee of ₦{user.hostelRoom.price.toLocaleString()} has been added to your payment history.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl text-left min-w-[200px] transition-colors">
              <p className="text-sm text-slate-500 dark:text-slate-400">Room Status</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-white">{user.hostelRoom.occupants}/{user.hostelRoom.capacity} Occupants</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl text-left min-w-[200px] transition-colors">
              <p className="text-sm text-slate-500 dark:text-slate-400">Maintenance Fee</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-white">Paid</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white transition-colors">Available Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hostels.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                const isFull = room.status === 'Full';
                
                return (
                  <button
                    key={room.id}
                    onClick={() => handleRoomClick(room)}
                    disabled={isFull}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                      isFull 
                        ? 'bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-60 cursor-not-allowed' 
                        : isSelected
                          ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-500 shadow-md shadow-primary-500/10'
                          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-primary-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        isFull ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      } transition-colors`}>
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-bold ${isFull ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-white'} transition-colors`}>
                          Room {room.number}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{room.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors">
                        <Users className="w-4 h-4" />
                        <span>{room.occupants}/{room.capacity}</span>
                      </div>
                      <div className={`font-bold ${isFull ? 'text-slate-500' : 'text-primary-600 dark:text-primary-400'} transition-colors`}>
                        ₦{room.price.toLocaleString()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 border-t lg:border-t-0 pt-6 lg:pt-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 sticky top-24 transition-colors">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 transition-colors">Booking Summary</h3>
              
              {selectedRoom ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-3 transition-colors">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Room</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{selectedRoom.number} ({selectedRoom.type})</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Capacity</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{selectedRoom.capacity} People</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600 flex justify-between">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Total Price</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">₦{selectedRoom.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 transition-colors" />
                  <p className="text-slate-500 dark:text-slate-400 transition-colors">Select an available room to view summary and proceed to payment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => !isProcessing && setShowPaymentModal(false)} title="Secure Payment">
        <form onSubmit={handlePayment} className="space-y-5">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Hostel Maintenance Fee</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white">₦{selectedRoom?.price?.toLocaleString()}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">Room {selectedRoom?.number}</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Selection</label>
              <div className="relative">
                <select className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none transition-colors">
                  <option>Pay with new card</option>
                  <option>**** **** **** 4242</option>
                </select>
                <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CVV</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  maxLength={3}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card PIN</label>
              <input 
                type="password" 
                placeholder="****" 
                maxLength={4}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowPaymentModal(false)}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex justify-center items-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                `Pay ₦${selectedRoom?.price?.toLocaleString()}`
              )}
            </button>
          </div>
        </form>
      </Modal>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
      </div>
    </PageTransition>
  );
};

export default HostelManagement;
