import React from 'react';
import {act, create} from 'react-test-renderer';

/**
 * Renders `element` and returns the test renderer.
 *
 * react-test-renderer 19 no longer commits the tree synchronously, so `create`
 * has to run inside `act` for the result to be mounted by the time a test
 * reaches for `root`.
 */
export const render = (element: React.ReactElement) => {
  let renderer: ReturnType<typeof create> | undefined;

  act(() => {
    renderer = create(element);
  });

  if (!renderer) {
    throw new Error('render did not produce a test renderer');
  }

  return renderer;
};
