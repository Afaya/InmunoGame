export function truncTo2Decimals(receivedNumber: number): number {
  return Math.trunc(receivedNumber * 100) / 100;
}
