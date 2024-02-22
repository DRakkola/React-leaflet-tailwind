import {
  createContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";

// Create a context for notifications
export const NotificationsContext = createContext({
  setcurrentNotification: () => {},
  uuid: null,
});

// Create a provider component

export const NotificationsProvider = ({ children }) => {
  // Use a custom hook or context to manage notification state
  // const { setcurrentNotification, currentNotification } =
  //   useContext(NotificationsContext);
  const [currentNotification, setcurrentNotification] = useState({
    data: "Notifications working",
    type: "success",
  });
  // Function to generate a unique identifier for the WebSocket connection
  function generateUUID() {
    return crypto.randomUUID();
  }

  const uuid = useMemo(() => generateUUID(), []); // remove useMemo to fix 'useMemo' is not defined error

  // Function to handle new messages
  const handleNewMessage = useCallback(
    (message, type) => {
      setcurrentNotification({ data: message, type: type });
    },
    [setcurrentNotification]
  );

  // Set up WebSocket connection and event listener
  useEffect(() => {
    let websocket;
    let heartbeatInterval;
    console.log(uuid);
    function connect() {
      websocket = new WebSocket(`ws://localhost:80/ws/notifications/${uuid}`);

      websocket.onopen = () => {
        // Send a heartbeat every 30 seconds to keep the connection alive
        heartbeatInterval = setInterval(() => {
          websocket.send(JSON.stringify({ type: "heartbeat" }));
        }, 30000);
      };

      websocket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        handleNewMessage(newMessage.data, newMessage.type);
        console.log("New message:", newMessage);
      };

      websocket.onclose = () => {
        clearInterval(heartbeatInterval);
        // Try to reconnect after 5 seconds if the connection is closed
        setTimeout(connect, 5000);
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        websocket.close();
      };
    }

    connect(); // Call connect to open the WebSocket connection

    return () => {
      clearInterval(heartbeatInterval);
      if (websocket) {
        websocket.close();
      }
    };
  }, [handleNewMessage]);

  // Provide the data and the handler to the context
  return (
    <NotificationsContext.Provider
      value={{
        currentNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
