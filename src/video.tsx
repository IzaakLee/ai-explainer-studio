import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

const C={bg:'#10152b',panel:'#1b2342',cyan:'#62e6ff',yellow:'#ffd95a',pink:'#ff7ab6',white:'#f7f8ff'};

export const Explainer: React.FC = () => {
  const f=useCurrentFrame();
  const opacity=interpolate(f,[0,20],[0,1],{extrapolateRight:'clamp'});
  const pulse=1+0.05*Math.sin(f/9);
  const x=interpolate(f,[0,45,90,135,180,225],[1420,1100,760,1200,560,920],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.ease)});
  const y=420+80*Math.sin(f/23);
  return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080">
      <defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="white" strokeOpacity=".055" strokeWidth="2"/></pattern></defs>
      <rect width="1920" height="1080" fill="url(#grid)"/>
      <circle cx="330" cy="270" r="150" fill={C.panel}/><circle cx="330" cy="270" r="105" fill="none" stroke={C.cyan} strokeWidth="8" opacity=".65"/><circle cx="330" cy="270" r="18" fill={C.cyan}/>
      <g opacity={opacity}><text x="150" y="620" fontSize="76" fontWeight="800">YOU MIGHT BE</text><text x="150" y="705" fontSize="96" fontWeight="900" fill={C.yellow}>SMARTER THAN YOU THINK</text><text x="155" y="775" fontSize="34" opacity=".78">One ordinary behavior can reveal a surprisingly useful clue.</text></g>
      <g transform={'translate(970 300) scale('+pulse+')'}><path d="M0 0h55v18c0-12 10-18 18-18s18 6 18 18v0h19v55H92c0-10-7-18-18-18s-19 8-19 18H0z" fill={C.yellow}/></g>
      <g transform={'translate('+x+' '+y+')'}><path d="M0 0h55v18c0-12 10-18 18-18s18 6 18 18v0h19v55H92c0-10-7-18-18-18s-19 8-19 18H0z" fill={C.yellow} opacity=".95"/></g>
      <rect x="1250" y="760" width="430" height="170" rx="24" fill={C.panel}/><text x="1290" y="815" fontSize="27" fill={C.cyan}>VISUAL THREAD</text><text x="1290" y="870" fontSize="38" fontWeight="800">ONE PUZZLE → ONE PAYOFF</text>
      <text x="150" y="960" fontSize="28" opacity=".55">AI EXPLAINER STUDIO • PROOF OF CONCEPT</text>
    </svg>
  </AbsoluteFill>;
};