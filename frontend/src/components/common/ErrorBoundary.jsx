// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-6 rounded-3xl border border-rose-300 bg-rose-50 p-8 text-slate-900 dark:border-rose-600 dark:bg-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Sorry, we encountered an issue while rendering the page. Please try again.
          </p>
          <button
            type="button"
            onClick={this.resetError}
            className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-white transition hover:bg-slate-700 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
