
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center glass-card m-4">
          <h2 className="text-2xl font-bold text-destructive mb-4">Algo salió mal</h2>
          <p className="text-muted-foreground mb-4">
            Ha ocurrido un error al cargar este componente.
          </p>
          <pre className="bg-muted p-4 rounded text-xs text-left overflow-auto max-w-full mb-4">
            {this.state.error?.toString()}
          </pre>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
