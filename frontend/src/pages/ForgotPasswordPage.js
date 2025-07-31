import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('demo@vidyavantra.com');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock OTP sending - replace with actual API call
      setTimeout(() => {
        setEmailSent(true);
        toast({
          title: "Reset Code Sent",
          description: "We've sent a 6-digit code to your email address.",
        });
        // Auto redirect after 3 seconds
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 3000);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset code. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Check Your Email</h2>
              <p className="text-slate-600 mb-6">
                We've sent a 6-digit verification code to<br />
                <strong>{email}</strong>
              </p>
              <div className="flex items-center justify-center text-emerald-600 mb-4">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">Redirecting in 3 seconds...</span>
              </div>
              <Button asChild className="w-full">
                <Link to="/reset-password" state={{ email }}>
                  Continue to Reset Password
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/login" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Link>
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Forgot Password?</CardTitle>
            <p className="text-slate-600">
              Enter your email address and we'll send you a code to reset your password.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Send Reset Code"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Remember your password?{' '}
                <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Back to Login
                </Link>
              </p>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 font-medium mb-2">Demo Info:</p>
              <p className="text-xs text-slate-500">
                The email is pre-filled for demo purposes. Click "Send Reset Code" to continue.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;