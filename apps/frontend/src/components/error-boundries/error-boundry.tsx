import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    // If `hasError` is true, a fallback is rendered
    if (this.state.hasError) {
      return (
        <div className="bg-sidebar h-screen w-screen">
          {this.props.fallback}
        </div>
      );
    }

    // Otherwise, render children  as normal
    return this.props.children;
  }
}

export default ErrorBoundary;
