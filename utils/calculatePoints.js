function calculatePoints(paymentAmount) {
  let points = paymentAmount;

  if (paymentAmount >= 50 && paymentAmount <= 149) {
    points += 0;
  } else if (paymentAmount >= 150 && paymentAmount <= 299) {
    points += paymentAmount * 0.05;
  } else if (paymentAmount >= 300 && paymentAmount <= 499) {
    points += paymentAmount * 0.1;
  } else if (paymentAmount >= 500 && paymentAmount <= 3000) {
    points += paymentAmount * 0.15;
  }

  return points;
}

export default calculatePoints;
