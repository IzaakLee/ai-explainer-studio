import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Explainer } from './video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Explainer"
    component={Explainer}
    durationInFrames={5 * 60 * 30}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
