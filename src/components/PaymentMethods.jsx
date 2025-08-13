function PaymentMethods() {
  const logos = [
    "/images/visa.png",
    "/images/mastercard.png",
    "/images/amex.png",
    "/images/banelco.png",
    "/images/pagofacil.png",
    "/images/mercado.png",
    "/images/paypal.png",
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center mt-2">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt="Payment Method"
          className="h-8 object-contain"
        />
      ))}
    </div>
  );
};

export default PaymentMethods;