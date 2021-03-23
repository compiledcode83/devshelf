import React, { Component, ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';
import { ReportDialogOptions } from '@sentry/browser';

type State = {
  error: Error | null;
  eventId: string;
  errorInfo: string;
  hasError: boolean;
};

export class ErrorBoundary extends Component {
  state: State = {
    error: null,
    eventId: '',
    errorInfo: '',
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo & Record<string, any>) {
    if (!this.state.error) {
      this.setState({ error });
    }

    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId, errorInfo });
    });
  }

  onReportFeedbackClick = (config: ReportDialogOptions) => {
    Sentry.showReportDialog(config);
  };

  render() {
    const { hasError, errorInfo, eventId } = this.state;
    if (hasError) {
      return (
        <>
          <button onClick={() => this.onReportFeedbackClick({ eventId })}>Report feedback</button>
          <p>{errorInfo}</p>
        </>
      );
    }
    return this.props.children;
  }
}
