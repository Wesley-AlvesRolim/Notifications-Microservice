export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateLength(content: string): boolean {
    return content.length >= 5 && content.length <= 248;
  }

  constructor(content: string) {
    const contentLengthIsValid = this.validateLength(content);
    if (!contentLengthIsValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }
}
