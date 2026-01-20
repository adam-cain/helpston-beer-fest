/**
 * ============================================================================
 * KEYSTATIC APP COMPONENT
 * ============================================================================
 * 
 * Actual Keystatic component, loaded client-side only.
 */

'use client';

import { makePage } from '@keystatic/next/ui/app';
import keystatic from '../../../../keystatic-cms-config';

export default makePage(keystatic);
