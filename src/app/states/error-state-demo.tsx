'use client';

import { BASE_PATH } from '@/lib/base-path';
import { ErrorState } from '@/registry/frontend-ui/error-state/components/error-state';

const EXAMPLE_DIGEST = '2817461093';

export function ErrorStateDemo() {
  return (
    <ErrorState
      digest={EXAMPLE_DIGEST}
      homeHref={`${BASE_PATH}/`}
      onRetry={() => {
        window.location.reload();
      }}
    />
  );
}
