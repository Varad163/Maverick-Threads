"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      console.log("Payment Success! Session ID:", sessionId);
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Verifying your payment...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your purchase.
      </p>

      <p className="text-sm text-gray-400">
        Stripe Session ID: <span className="font-mono">{sessionId}</span>
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </a>
    </div>
  );
}
