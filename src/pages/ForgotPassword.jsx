import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, Mail, Lock, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: Call your backend API here to send OTP to `email`
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Move to OTP step after successful email send
    }, 1000);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return;
    setLoading(true);
    // TODO: Call your backend API here to verify OTP and update password
    setTimeout(() => {
      setLoading(false);
      alert('Password has been reset successfully! You can now sign in.');
      window.location.href = '/signin';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden selection:bg-orange-500/30">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-red-500/20 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-neutral-800/80 backdrop-blur-xl rounded-3xl shadow-2xl z-10 border border-neutral-700/50"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-4">
            <Link to="/">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 cursor-pointer"
              >
                <Utensils className="text-white w-6 h-6" />
              </motion.div>
            </Link>
          </div>
          
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
              {step === 1 ? 'Reset Password' : 'Verify & Reset'}
            </h1>
            <p className="text-sm text-neutral-400">
              {step === 1 ? "Enter your email to receive an OTP" : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3" 
                onSubmit={handleSendEmail}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900/50 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-white transition-all placeholder:text-neutral-600"
                      placeholder="foodie@example.com"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || !email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center group disabled:opacity-50 mt-4"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3" 
                onSubmit={handleResetPassword}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 ml-1">OTP Code</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <KeyRound className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900/50 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-white tracking-widest transition-all placeholder:text-neutral-600"
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                </div>

                <div className="space-y-1 mt-3">
                  <label className="text-xs font-medium text-neutral-300 ml-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-neutral-500" />
                    </div>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900/50 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-white transition-all placeholder:text-neutral-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || !otp || !newPassword}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center group disabled:opacity-50 mt-4"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <Link to="/signin" className="text-[13px] text-neutral-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
