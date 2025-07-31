import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Shield, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const email = location.state?.email || 'demo@vidyavantra.com';

  useEffect(() => {
    // Auto-fill demo OTP for testing
    setFormData(prev => ({ ...prev, otp: '123456' }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const verifyOTP = () => {
    // Mock OTP verification
    if (formData.otp === '123456') {
      setOtpVerified(true);
      toast({
        title: "Code Verified",
        description: "Your verification code is correct. Now set your new password.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter the correct 6-digit code.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpVerified) {
      verifyOTP();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock password reset - replace with actual API call
      setTimeout(() => {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated successfully.",
        });
        navigate('/login');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/forgot-password" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Link>
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Reset Password</CardTitle>
            <p className="text-slate-600">
              {!otpVerified 
                ? `Enter the 6-digit code sent to ${email}`
                : 'Create your new password'
              }
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!otpVerified ? (
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    className="h-12 text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-slate-500 text-center">
                    Didn't receive the code? <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">Resend</button>
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center text-emerald-600 mb-4">
                    <Check size={20} className="mr-2" />
                    <span className="text-sm">Code verified successfully</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        required
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                        required
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={isLoading}
              >
                {isLoading 
                  ? "Updating Password..." 
                  : !otpVerified 
                    ? "Verify Code" 
                    : "Update Password"
                }
              </Button>
            </form>

            {/* Demo Info */}
            {!otpVerified && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 font-medium mb-2">Demo Code:</p>
                <p className="text-xs text-slate-500">Use code: 123456 (pre-filled)</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;