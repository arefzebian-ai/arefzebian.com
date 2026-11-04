// Main-thread scheduling helpers used by generated loaders and pagination.
// The original runtime breaks long chains of preload work into small tasks so input stays
// responsive; on the server there is nothing to yield to.

interface YieldOptions {
  priority?: "user-blocking" | "user-visible" | "background";
  /** "paint": continue after the next frame has been painted. */
  continueAfter?: "paint";
  ensureContinueBeforeUnload?: boolean;
  signal?: AbortSignal;
}

interface LoaderContext {
  signal?: AbortSignal;
}

const isBrowser = typeof window !== "undefined";

function schedulerYield(priority?: YieldOptions["priority"]): Promise<void> {
  const scheduler = isBrowser ? (window as any).scheduler : undefined;
  if (priority === "background") return new Promise((resolve) => setTimeout(resolve, 1));
  if (typeof scheduler?.yield === "function") return scheduler.yield({ priority }).catch(() => {});
  if (typeof scheduler?.postTask === "function") return scheduler.postTask(() => {}, { priority }).catch(() => {});
  if (priority === "user-blocking") return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/** Gives the browser a chance to handle input / paint before continuing. */
export function yieldToMain(options: YieldOptions = {}): Promise<void> {
  if (!isBrowser) return Promise.resolve();
  if (options.continueAfter === "paint") {
    // Resolve after the next paint, with a timeout in case frames are throttled.
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, 100);
      requestAnimationFrame(() => {
        void schedulerYield(options.priority).then(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    });
  }
  return schedulerYield(options.priority);
}

/** Runs `fn` in its own task. */
export async function runWithYield<T>(fn: () => T | Promise<T>, context?: LoaderContext): Promise<T | undefined> {
  await yieldToMain();
  if (context?.signal?.aborted) return undefined;
  return fn();
}

/** Starts each task in its own task (they still run concurrently) and settles when all are done. */
export async function runTasksWithYield(tasks: Array<() => unknown>, context?: LoaderContext): Promise<PromiseSettledResult<unknown>[]> {
  const started: unknown[] = [];
  for (const task of tasks) {
    await yieldToMain();
    if (context?.signal?.aborted) break;
    try {
      started.push(task());
    } catch (error) {
      started.push(Promise.reject(error));
    }
  }
  return Promise.allSettled(started);
}
