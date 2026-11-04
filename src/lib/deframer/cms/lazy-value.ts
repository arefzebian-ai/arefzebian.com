// LazyValue: a value produced on demand (sync or async) that React can read
// with Suspense. The original runtime uses it for query results, localized strings and lazy
// modules: `preload()` starts loading, `read()` returns the settled value,
// `use()` suspends (throws the pending promise) until it is ready.

type State = "pending" | "fulfilled" | "rejected";

const isPromiseLike = (value: any): value is PromiseLike<unknown> => typeof value?.then === "function";

export class LazyValue<T = unknown> {
  private promiseState: State = "pending";
  private preloadPromise?: Promise<void>;
  private value?: T;
  private reason?: unknown;

  constructor(
    private readonly resolver: () => T | PromiseLike<T>,
    /** Accepted for API compatibility (the original runtime's module cache hash); unused. */
    readonly cacheHash?: string,
  ) {}

  static is(value: unknown): value is LazyValue<unknown> {
    return value instanceof LazyValue;
  }

  /** Current state; reading it starts loading. */
  get status(): State {
    void this.preload();
    return this.promiseState;
  }

  get state(): State {
    return this.promiseState;
  }

  /** Starts loading. Returns a promise while pending, undefined once settled. */
  preload(): Promise<void> | undefined {
    if (this.promiseState !== "pending") return undefined;
    if (this.preloadPromise) return this.preloadPromise;
    let result: T | PromiseLike<T>;
    try {
      result = this.resolver();
    } catch (error) {
      this.reject(error);
      return undefined;
    }
    if (!isPromiseLike(result)) {
      this.fulfill(result);
      return undefined;
    }
    this.preloadPromise = Promise.resolve(result).then(
      (value) => this.fulfill(value),
      (error) => this.reject(error),
    );
    return this.preloadPromise;
  }

  /** Synchronous read; only valid once settled. */
  read = (): T => {
    if (this.promiseState === "fulfilled") return this.value as T;
    if (this.promiseState === "rejected") throw this.reason;
    throw new Error("Need to call preload() before read()");
  };

  /** The value, or a promise for it when it still has to load. */
  readMaybeAsync(): T | Promise<T> {
    const pending = this.preload();
    return pending ? pending.then(this.read) : this.read();
  }

  async readAsync(): Promise<T> {
    return this.readMaybeAsync();
  }

  /** Suspense read: throws the pending promise so the nearest boundary waits. */
  use(): T {
    const pending = this.preload();
    if (pending) throw pending;
    return this.read();
  }

  then<R1 = T, R2 = never>(onFulfilled?: (value: T) => R1 | PromiseLike<R1>, onRejected?: (reason: any) => R2 | PromiseLike<R2>): Promise<R1 | R2> {
    return Promise.resolve(this.readMaybeAsync()).then(onFulfilled, onRejected);
  }

  private fulfill(value: T) {
    this.promiseState = "fulfilled";
    this.value = value;
  }

  private reject(reason: unknown) {
    this.promiseState = "rejected";
    this.reason = reason;
  }
}
