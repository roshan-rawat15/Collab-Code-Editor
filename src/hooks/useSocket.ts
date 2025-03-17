import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';

export const useSocket = (isRealTime: boolean) => {
  const socketRef = useRef<Socket | null>(null);
  const { editor } = useCodeEditorStore();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRealTime) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
        setError(null);
      }
      return;
    }

    const connectSocket = () => {
      try {
        // Create socket connection
        socketRef.current = io('http://localhost:3000', {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 20000,
        });

        socketRef.current.on('connect', () => {
          console.log('Connected to server:', socketRef.current?.id);
          setIsConnected(true);
          setError(null);
        });

        socketRef.current.on('connect_error', (err) => {
          console.error('Connection error:', err.message);
          setError('Failed to connect to server');
          setIsConnected(false);
        });

        socketRef.current.on('disconnect', (reason) => {
          console.log('Disconnected from server. Reason:', reason);
          setIsConnected(false);
        });

        // Handle incoming code updates
        socketRef.current.on('codeUpdate', (data) => {
          if (editor && data.code !== editor.getValue()) {
            const position = editor.getPosition();
            editor.setValue(data.code);
            if (position) {
              editor.setPosition(position);
            }
          }
        });

        // Handle cursor updates
        socketRef.current.on('cursorUpdate', (data) => {
          if (editor) {
            const decorations = editor.createDecorationsCollection();
            decorations.set([{
              range: {
                startLineNumber: data.position.lineNumber,
                startColumn: data.position.column,
                endLineNumber: data.position.lineNumber,
                endColumn: data.position.column + 1
              },
              options: {
                className: 'remote-cursor',
                hoverMessage: { value: `User ${data.userId}'s cursor` }
              }
            }]);

            setTimeout(() => decorations.clear(), 1500);
          }
        });
      } catch (err) {
        console.error('Error initializing socket:', err);
        setError('Failed to initialize socket connection');
      }
    };

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
        setError(null);
      }
    };
  }, [isRealTime, editor]);

  // Function to emit code changes
  const emitCodeChange = (code: string) => {
    if (socketRef.current && isRealTime && isConnected) {
      socketRef.current.emit('codeChange', { code });
    }
  };

  // Function to emit cursor position
  const emitCursorMove = (position: { lineNumber: number; column: number }) => {
    if (socketRef.current && isRealTime && isConnected) {
      socketRef.current.emit('cursorMove', { position });
    }
  };

  return { emitCodeChange, emitCursorMove, isConnected, error };
}; 