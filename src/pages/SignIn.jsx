import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Mail, Lock, ArrowRight } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authAPI } from '../api/auth';
import { auth, googleProvider, signInWithPopup } from '../config/firebase';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await authAPI.googleAuth({
        fullName: user.displayName,
        email: user.email,
        mobile: user.phoneNumber || '',
        role: 'user'
      });
      alert('Sign In with Google Successful!');
      navigate('/');
    } catch (err) {
      console.error("Google Sign In Error: ", err);
      setError(err.response?.data?.message || err.message || 'Google Sign-In failed');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      try {
        await authAPI.signin(values);
        alert('Sign In Successful!');
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden selection:bg-orange-500/30">
      {/* Background decoration */}
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
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-sm text-neutral-400">Sign in to satisfy your cravings</p>
          </div>

          {error && (
            <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={formik.handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className={`h-4 w-4 ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-neutral-500'}`} />
                </div>
                <input 
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900/50 border rounded-xl focus:ring-2 focus:border-transparent outline-none text-white transition-all placeholder:text-neutral-600 ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-700 focus:ring-orange-500'}`}
                  placeholder="foodie@example.com"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-[11px] ml-1 mt-0.5">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-neutral-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-medium text-orange-500 hover:text-orange-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 ${formik.touched.password && formik.errors.password ? 'text-red-500' : 'text-neutral-500'}`} />
                </div>
                <input 
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900/50 border rounded-xl focus:ring-2 focus:border-transparent outline-none text-white transition-all placeholder:text-neutral-600 ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-500' : 'border-neutral-700 focus:ring-orange-500'}`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-[11px] ml-1 mt-0.5">{formik.errors.password}</div>
              ) : null}
            </div>

            <motion.button
              type="submit"
              disabled={formik.isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
              {!formik.isSubmitting && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

          <div className="relative mt-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-neutral-800 text-neutral-400">Or continue with</span>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-4 bg-white text-neutral-900 text-sm font-semibold rounded-xl shadow flex items-center justify-center gap-3 mt-4 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </motion.button>

          <div className="mt-5 text-center">
            <p className="text-[13px] text-neutral-400">
              New to our platform?{' '}
              <Link to="/signup" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
