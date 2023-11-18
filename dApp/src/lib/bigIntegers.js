export function floatToBigInt(floatNumber, power = 6) {
  if (Number.isNaN(floatNumber) || !Number.isFinite(floatNumber)) {
    throw new Error("Invalid input: Not a finite number");
  }

  // Remove the decimal point by multiplying with a power of 10
  const precision = 10n ** BigInt(power); // Adjust this for your desired precision
  const bigIntValue = BigInt(Math.round(floatNumber * Number(precision)));

  return bigIntValue;
}

export function bigIntToFloat(bigIntNumber, power = 6) {
  const precision = 10n ** BigInt(power);
  return Number(bigIntNumber / precision);
}
