export function BingoRange(value: number) {
  if (value >= 1 && value <= 15) {
    return 'B';
  }

  if (value >= 16 && value <= 30) {
    return 'I';
  }

  if (value >= 31 && value <= 45) {
    return 'N';
  }

  if (value >= 46 && value <= 60) {
    return 'G';
  }

  if (value >= 61 && value <= 75) {
    return 'O';
  }
}
