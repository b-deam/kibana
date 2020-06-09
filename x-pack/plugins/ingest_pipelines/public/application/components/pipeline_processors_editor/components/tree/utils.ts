/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { ProcessorInternal } from '../../types';

const ITEM_HEIGHTS_PX = {
  withoutNestedItems: 59,
  withNestedItems: 95,
  padding: 16,
};
export const calculateItemHeight = ({
  processor,
  isFirstInArray,
}: {
  processor: ProcessorInternal;
  isFirstInArray: boolean;
}): number => {
  const padding = isFirstInArray ? ITEM_HEIGHTS_PX.padding : 0;
  if (!processor.onFailure?.length) {
    return padding + ITEM_HEIGHTS_PX.withoutNestedItems;
  }

  return (
    padding +
    ITEM_HEIGHTS_PX.withNestedItems +
    processor.onFailure.reduce((acc, p, idx) => {
      return acc + calculateItemHeight({ processor: p, isFirstInArray: idx === 0 });
    }, 0)
  );
};
