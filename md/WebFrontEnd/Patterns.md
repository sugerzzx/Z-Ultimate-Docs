# Ptterns

<Link title="Patterns.dev" link="https://www.patterns.dev/" />

<Link title="JavaScript Patterns Workshop" link="https://javascriptpatterns.vercel.app/patterns" />

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

在 vue 中，我们可以 Observar Pattrn 和组合式函数来实现 Event Bus 的功能。

```ts
import { ref, onUnmounted, onMounted, Ref } from "vue";

type EventListener = (data: any) => void;

type EventBus = {
  subscribe: (eventName: string, callback: EventListener) => void;
  unsubscribe: (eventName: string, callback: EventListener) => void;
  publish: (eventName: string, data?: any) => void;
};

export const useEventBus = (): EventBus => {
  const listeners: { [key: string]: EventListener[] } = {};

  const subscribe = (eventName: string, callback: EventListener) => {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  };

  const unsubscribe = (eventName: string, callback: EventListener) => {
    if (listeners[eventName]) {
      listeners[eventName] = listeners[eventName].filter(cb => cb !== callback);
    }
  };

  const publish = (eventName: string, data?: any) => {
    if (listeners[eventName]) {
      listeners[eventName].forEach(cb => cb(data));
    }
  };

  return { subscribe, unsubscribe, publish };
};

export const useEventListener = (eventName: string, callback: EventListener) => {
  const eventBus = useEventBus();

  onMounted(() => {
    eventBus.subscribe(eventName, callback);
  });

  onUnmounted(() => {
    eventBus.unsubscribe(eventName, callback);
  });
};

export const useEventPublisher = (eventName: string) => {
  const eventBus = useEventBus();

  const publish = (data?: any) => {
    eventBus.publish(eventName, data);
  };

  return { publish };
};
```
