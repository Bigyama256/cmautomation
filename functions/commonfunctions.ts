export class CommonFunctions {
  static generateRandomNumberString(length: number = 3): string {
    if (length <= 0) {
      throw new Error("length must be positive");
    }

    const min = Math.pow(10, length - 1);      
    const max = Math.pow(10, length) - 1;      

    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    return random.toString();
  }

  /**
   * Append a random number suffix to any base string.
   * Example: ("Event with registration", 3) => "Event with registration 472"
   */
  static appendRandomNumber(base: string, length: number = 3): string {
    const suffix = this.generateRandomNumberString(length);
    return `${base} ${suffix}`;
  }
}
