import { Suspense } from 'react';
import Loader from './Loader';

const WithSuspense = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `WithSuspense(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default WithSuspense;
