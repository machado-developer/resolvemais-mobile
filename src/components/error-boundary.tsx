// components/error-boundary.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<ErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.FallbackComponent) {
        const FallbackComponent = this.props.FallbackComponent;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Oops! Algo deu errado
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 20, color: '#6B7280' }}>
            {this.state.error?.message || 'Um erro inesperado ocorreu'}
          </Text>
          <TouchableOpacity
            onPress={this.resetError}
            style={{ backgroundColor: '#3B82F6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;