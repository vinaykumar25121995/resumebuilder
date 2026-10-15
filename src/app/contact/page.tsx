"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Headphones,
  Users,
  CreditCard,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
              <Sparkles className="w-6 h-6" />
              <span>ATS Resume Builder</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-100">
            <Headphones className="w-3.5 h-3.5 mr-1.5" />
            24/7 Dedicated Support & Inquiries
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Get in Touch With Our Team
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Have questions about ATS optimization, transparent pricing, custom enterprise plans, or need technical assistance? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Direct Contact Information
              </h2>

              <div className="space-y-4">
                {/* Email Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Customer Support & Admin
                    </p>
                    <a
                      href="mailto:atsfriendlyresumes.admin@gmail.com"
                      className="text-sm font-semibold text-blue-600 hover:underline break-all"
                    >
                      atsfriendlyresumes.admin@gmail.com
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">
                      For general questions, ATS troubleshooting & resume advice.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Channel Help Desk */}
                <div className="flex items-start gap-3.5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                        WhatsApp Channel Help Desk
                      </p>
                      <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                        Official Channel
                      </span>
                    </div>
                    <a
                      href="https://whatsapp.com/channel/0029VbEHAMkADTO9BaH0Mh2O"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1.5 mt-1"
                    >
                      Join WhatsApp Help Desk <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                      Instant assistance, ATS templates announcements, bug reporting & active help desk support.
                    </p>
                  </div>
                </div>

                {/* Sales & Enterprise */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Sales & Teams Inquiries
                    </p>
                    <a
                      href="mailto:atsfriendlyresumes.admin@gmail.com"
                      className="text-sm font-semibold text-purple-600 hover:underline break-all"
                    >
                      atsfriendlyresumes.admin@gmail.com
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Custom volume licenses, university career centers & enterprise teams.
                    </p>
                  </div>
                </div>

                {/* Billing Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Billing & Plans
                    </p>
                    <a
                      href="mailto:atsfriendlyresumes.admin@gmail.com"
                      className="text-sm font-semibold text-emerald-600 hover:underline break-all"
                    >
                      atsfriendlyresumes.admin@gmail.com
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Invoices, receipts, subscription updates & transparent refunds.
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Guaranteed Response Time
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Under 24 Hours
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Average response time is less than 2 hours during business hours (9:00 AM – 6:00 PM EST, Mon–Fri).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Guarantee Box */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-sm uppercase tracking-wide text-blue-100">
                  Transparent Guarantee
                </h3>
              </div>
              <p className="text-sm text-blue-50 leading-relaxed mb-4">
                No hidden fees, no automated trick subscriptions. You can cancel any plan at any time with one click, or switch between plans as your career search progresses.
              </p>
              <div className="space-y-2 text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>100% Free tier available forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Transparent cancel-anytime policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Anti-hallucination AI that protects your career integrity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Send Us a Direct Message
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fill out the form below and an ATS specialist will reply to your inbox directly.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-green-700 max-w-md mx-auto">
                    Thank you for reaching out. We have received your inquiry and our support team will respond to your email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-green-800 underline hover:text-green-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Topic / Subject
                    </label>
                    <select
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="Enterprise & Team Plans">
                        Enterprise & Team Plans (5+ Seats / Universities)
                      </option>
                      <option value="Transparent Pricing & Billing">
                        Transparent Pricing & Billing Questions
                      </option>
                      <option value="General Inquiry">
                        General Platform Inquiry
                      </option>
                      <option value="Technical Support">
                        Technical Support / Resume Formatting Help
                      </option>
                      <option value="Feature Request">
                        Feature Request / Template Suggestion
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg text-sm px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-900"
                      placeholder="Tell us what you'd like to know or how we can help..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-2">
                    We respect your privacy. Your information is never sold or shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <p>© 2025 ATS Resume Builder. Simple, transparent pricing with dedicated support.</p>
      </footer>
    </div>
  );
}
