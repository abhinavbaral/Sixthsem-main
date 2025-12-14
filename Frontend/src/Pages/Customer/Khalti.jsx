import { useState } from "react";

export default function Khalti() {
  const [method, setMethod] = useState("khalti");
  const [amount, setAmount] = useState("100");
  const [productName, setProductName] = useState("Test Product");
  const [transactionId, setTransactionId] = useState("txn-456");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (method === "cod") {
      alert("Order placed with Cash on Delivery!");
      setLoading(false);
      return;
    }

    if (method === "khalti") {
      try {
        const res = await fetch("/api/initiate-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "khalti", amount, productName, transactionId }),
        });
        const data = await res.json();
        if (data.khaltiPaymentUrl) window.location.href = data.khaltiPaymentUrl;
        else alert("Failed to initiate payment.");
      } catch (err) {
        alert("Error initiating payment");
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

      <label className="block text-sm font-medium mb-1">Payment Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="khalti">Khalti</option>
        <option value="cod">Cash on Delivery</option>
      </select>

      {method === "khalti" && (
        <>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <label className="block text-sm font-medium mb-1">Transaction ID</label>
          <input
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading
          ? "Processing..."
          : method === "cod"
          ? "Place COD Order"
          : "Pay with Khalti"}
      </button>
    </form>
  );
}
