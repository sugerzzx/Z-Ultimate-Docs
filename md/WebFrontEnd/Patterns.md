# Ptterns

👉 [Patterns.dev](https://www.patterns.dev/)

👉 [JavaScript Patterns Workshop](https://javascriptpatterns.vercel.app/patterns)

## Observer Pattern

[Observer Pattern](https://www.patterns.dev/vanilla/observer-pattern)

在 react 中，我们可以结合 Observer Pattern 和 Context API 来实现 Event Bus 的功能。

```tsx
import { createContext, Dispatch, FC, ReactNode, useCallback, useContext, useMemo, useReducer, useState } from "react";

export type EventListener = (data: any) => void;

type EventBusProps = {
  subscribe: (eventName: string, callback: EventListener) => void;
  unsubscribe: (eventName: string, callback: EventListener) => void;
  publish: (eventName: string, data?: any) => void;
};

const EventBusContext = createContext<EventBusProps>(null!);

export const useEventBusContext = () => {
  return useContext(EventBusContext);
};

interface EventBusContextProviderProps {
  children: ReactNode;
}

export const EventBusContextProvider: FC<EventBusContextProviderProps> = ({ children }) => {
  const [listeners, setListeners] = useState<{ [key: string]: EventListener[] }>({});

  const subscribe = useCallback(
    (eventName: string, callback: EventListener) => {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName].push(callback);
      setListeners({ ...listeners });
    },
    [listeners]
  );

  const unsubscribe = useCallback(
    (eventName: string, callback: EventListener) => {
      if (listeners[eventName]) {
        listeners[eventName] = listeners[eventName].filter(cb => cb !== callback);
        setListeners({ ...listeners });
      }
    },
    [listeners]
  );

  const publish = useCallback(
    (eventName: string, data?: any) => {
      if (listeners[eventName]) {
        listeners[eventName].forEach(cb => cb(data));
      }
    },
    [listeners]
  );

  const contextValue = useMemo(() => ({ subscribe, unsubscribe, publish }), [subscribe, unsubscribe, publish]);

  return <EventBusContext.Provider value={contextValue}>{children}</EventBusContext.Provider>;
};
```

