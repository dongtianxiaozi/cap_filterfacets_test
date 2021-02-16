export type Either<A, B> = Left<A> | Right<B>;

interface LeftRight<C> {
  value: C;
  isLeft(): boolean;
  isRight(): boolean;
  type(): Function;
}

export interface Left<A> extends LeftRight<A> {
  rightValue(): never;
  leftValue(): A;
}

export interface Right<B> extends LeftRight<B> {
  rightValue(): B;
  leftValue(): never;
}

export function Left<A>(val: A): Left<A> {
  return {
    value: val,
    isLeft: () => true,
    isRight: () => false,
    type: () => val.constructor,
    rightValue: (): never => {
      throw Error('Cannot call to rightValue on type Left. Please validate the type before call for value.');
    },
    leftValue: (): A => {
      return val;
    },
  };
}

export function Right<B>(val: B): Right<B> {
  return {
    value: val,
    isLeft: () => false,
    isRight: () => true,
    type: () => val.constructor,
    rightValue: (): B => {
      return val;
    },
    leftValue: (): never => {
      throw Error('Cannot call to leftValue on type Right. Please validate the type before call for value.');
    },
  };
}
