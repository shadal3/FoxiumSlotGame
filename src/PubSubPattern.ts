export class PubSub {
    private static eventMap = {} as Record<string, Set<(...args: any[]) => void>>;
  
    constructor() {}
  
    public static subscribe(event: string, callback: (...args: any[]) => void) {
      if (!PubSub.eventMap[event]) {
        // create a new set
        PubSub.eventMap[event] = new Set();
      }
      PubSub.eventMap[event].add(callback);
    }
  
    public static emit (event: string, ...args: any[]) {
      if (!PubSub.eventMap[event]) {
        return;
      }
  
      PubSub.eventMap[event].forEach((cb: any) => cb(...args));
    }
  }
  
  