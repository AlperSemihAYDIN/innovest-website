// framer-motion mock — tüm animasyon bileşenlerini sade HTML'e düşürür
import React from 'react';

const createComponent = (tag: string) => {
  const Component = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(
    ({ children, ...props }, ref) => {
      // framer-motion'a özgü prop'ları filtrele
      const htmlProps: Record<string, unknown> = {};
      const filtered = [
        'initial','animate','exit','transition','variants','whileHover','whileTap',
        'whileFocus','whileInView','layoutId','layout','drag','dragConstraints',
        'onDragEnd','onAnimationComplete','viewport','custom','transformTemplate',
        'useInView','useAnimation','useSpring','useTransform','useScroll',
      ];
      Object.entries(props).forEach(([k, v]) => {
        if (!filtered.includes(k)) htmlProps[k] = v;
      });
      return React.createElement(tag, { ...htmlProps, ref }, children);
    }
  );
  Component.displayName = `Motion.${tag}`;
  return Component;
};

export const motion = {
  div: createComponent('div'),
  span: createComponent('span'),
  p: createComponent('p'),
  h1: createComponent('h1'),
  h2: createComponent('h2'),
  h3: createComponent('h3'),
  section: createComponent('section'),
  article: createComponent('article'),
  ul: createComponent('ul'),
  li: createComponent('li'),
  button: createComponent('button'),
  a: createComponent('a'),
  nav: createComponent('nav'),
  header: createComponent('header'),
  footer: createComponent('footer'),
  main: createComponent('main'),
};

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useInView = () => true;
export const useAnimation = () => ({ start: jest.fn(), stop: jest.fn() });
export const useScroll = () => ({ scrollY: { get: () => 0 } });
export const useTransform = (_: unknown, __: unknown, output: unknown[]) => output[0];
export const useSpring = (value: unknown) => value;
export const useMotionValue = (initial: unknown) => ({ get: () => initial, set: jest.fn() });

export default { motion, AnimatePresence, useInView, useAnimation };
