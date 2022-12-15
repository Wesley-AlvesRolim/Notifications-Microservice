import { Content } from './Content';

describe('Notification Content', () => {
  it('should create a content', () => {
    const content = new Content('Hello, Wesley! You have a new notification.');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a content with less than 5 characters.', () => {
    const contentInstance = () => new Content('Hi!');

    expect(contentInstance).toThrowError();
  });

  it('should not be able to create a content with more than 248 characters.', () => {
    const bigContent = String('Hi!').repeat(124);
    const contentInstance = () => new Content(bigContent);

    expect(contentInstance).toThrowError();
  });
});
