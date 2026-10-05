import React from 'react';
import { Composition } from 'remotion';
import { Explainer } from './video';

export const RemotionRoot: React.FC = () => (
  <Composition id="Explainer" component={Explainer} durationInFrames={30 * 30} fps={30} width={1920} height={1080} />
);