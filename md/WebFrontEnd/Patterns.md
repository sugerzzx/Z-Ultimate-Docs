# Ptterns

[Patterns.dev](https://www.patterns.dev/)

[JavaScript Patterns Workshop](https://javascriptpatterns.vercel.app/patterns)

[Vue Design Patterns](https://dev-academy.com/vue-design-patterns/)

## Observer Pattern

[Observer Pattern](https://www.patterns.dev/vanilla/observer-pattern)

在 react 中，我们可以结合 Observer Pattern 和 Context API 来实现 Event Bus 的功能。

```tsx
import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useRef } from "react";

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
  const listenersRef = useRef<{ [key: string]: EventListener[] }>({});

  const subscribe = useCallback((eventName: string, callback: EventListener) => {
    if (!listenersRef.current[eventName]) {
      listenersRef.current[eventName] = [];
    }
    listenersRef.current[eventName].push(callback);
  }, []);

  const unsubscribe = useCallback((eventName: string, callback: EventListener) => {
    if (listenersRef.current[eventName]) {
      listenersRef.current[eventName] = listenersRef.current[eventName].filter(cb => cb !== callback);
    }
  }, []);

  const publish = useCallback((eventName: string, data?: any) => {
    if (listenersRef.current[eventName]) {
      listenersRef.current[eventName].forEach(cb => cb(data));
    }
  }, []);

  const contextValue = useMemo(() => ({ subscribe, unsubscribe, publish }), [subscribe, unsubscribe, publish]);

  return <EventBusContext.Provider value={contextValue}>{children}</EventBusContext.Provider>;
};
```

使用方式：

```tsx
import { FC, useEffect } from "react";
import { EventBusContextProvider, useEventBusContext } from "./EventBusContext";

const ComponentA: FC = () => {
  const { subscribe, publish } = useEventBusContext();

  useEffect(() => {
    subscribe("eventA", data => {
      console.log("ComponentA received data: ", data);
    });

    return () => {
      unsubscribe("eventA", data => {
        console.log("ComponentA received data: ", data);
      });
    };
  }, []);

  return (
    <button
      onClick={() => {
        publish("eventB", "data from ComponentA");
      }}
    >
      Publish eventB
    </button>
  );
};

const ComponentB: FC = () => {
  const { subscribe, publish } = useEventBusContext();

  useEffect(() => {
    subscribe("eventB", data => {
      console.log("ComponentB received data: ", data);
    });

    return () => {
      unsubscribe("eventB", data => {
        console.log("ComponentB received data: ", data);
      });
    };
  }, []);

  return (
    <button
      onClick={() => {
        publish("eventA", "data from ComponentB");
      }}
    >
      Publish eventA
    </button>
  );
};

const App: FC = () => {
  return (
    <EventBusContextProvider>
      <ComponentA />
      <ComponentB />
    </EventBusContextProvider>
  );
};

export default App;
```
