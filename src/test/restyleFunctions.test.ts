import {describe, it, expect} from '@jest/globals';

import composeRestyleFunctions from '../composeRestyleFunctions';
import {
  AllProps,
  border,
  effects,
  layout,
  outline,
  position,
  shadow,
  spacing,
  typography,
} from '../restyleFunctions';
import {RestyleFunctionContainer} from '../types';

const theme = {
  colors: {
    coral: '#FFE6E4',
    lightcyan: '#E0FFFF',
  },
  spacing: {
    s: 8,
    m: 16,
  },
  borderRadii: {
    small: 4,
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
};

const dimensions = {width: 375, height: 667};

type Theme = typeof theme;
type Props = AllProps<Theme>;

// Typed as AllProps so every prop object below is checked against the real
// generated prop types -- this is what gives the guarded StyleValueOf lookups
// type-level coverage, not just runtime coverage.
const restyleFunctions = [
  ...spacing,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...outline,
  ...effects,
  ...typography,
] as RestyleFunctionContainer<Props, Theme>[];

const {buildStyle} = composeRestyleFunctions<Theme, Props>(restyleFunctions);

const build = (props: Props) => buildStyle(props, {theme, dimensions});

describe('restyleFunctions', () => {
  describe('CSS logical properties', () => {
    it('resolves logical margin and padding through the spacing theme key', () => {
      expect(
        build({
          marginBlock: 's',
          marginBlockStart: 'm',
          marginInlineEnd: 's',
          paddingInline: 'm',
          paddingBlockEnd: 's',
        }),
      ).toStrictEqual({
        marginBlock: 8,
        marginBlockStart: 16,
        marginInlineEnd: 8,
        paddingInline: 16,
        paddingBlockEnd: 8,
      });
    });

    it('supports inset properties', () => {
      expect(
        build({inset: 0, insetInlineStart: 4, insetBlock: 8}),
      ).toStrictEqual({inset: 0, insetInlineStart: 4, insetBlock: 8});
    });

    it('resolves logical border radii through the borderRadii theme key', () => {
      expect(
        build({borderStartStartRadius: 'small', borderEndEndRadius: 'small'}),
      ).toStrictEqual({
        borderStartStartRadius: 4,
        borderEndEndRadius: 4,
      });
    });

    it('resolves logical border colors through the colors theme key', () => {
      expect(
        build({borderBlockColor: 'coral', borderBlockEndColor: 'lightcyan'}),
      ).toStrictEqual({
        borderBlockColor: '#FFE6E4',
        borderBlockEndColor: '#E0FFFF',
      });
    });

    it('accepts responsive values for logical properties', () => {
      expect(build({marginInline: {phone: 's', tablet: 'm'}})).toStrictEqual({
        marginInline: 8,
      });
    });
  });

  describe('outline', () => {
    it('resolves outlineColor through the colors theme key and passes the rest through', () => {
      expect(
        build({
          outlineColor: 'coral',
          outlineOffset: 2,
          outlineStyle: 'dotted',
          outlineWidth: 1,
        }),
      ).toStrictEqual({
        outlineColor: '#FFE6E4',
        outlineOffset: 2,
        outlineStyle: 'dotted',
        outlineWidth: 1,
      });
    });
  });

  describe('effects', () => {
    it('passes array-valued properties through untouched', () => {
      const filter = [{blur: 4}, {brightness: 0.5}];
      const boxShadow = [{offsetX: 0, offsetY: 2, blurRadius: 4}];

      expect(
        build({
          filter,
          boxShadow,
          mixBlendMode: 'multiply',
          isolation: 'isolate',
        }),
      ).toStrictEqual({
        filter,
        boxShadow,
        mixBlendMode: 'multiply',
        isolation: 'isolate',
      });
    });

    it('accepts the string form of filter and boxShadow', () => {
      expect(
        build({filter: 'blur(4px)', boxShadow: '0 2px 4px red'}),
      ).toStrictEqual({
        filter: 'blur(4px)',
        boxShadow: '0 2px 4px red',
      });
    });
  });

  describe('other view properties', () => {
    it('supports cursor, pointerEvents, boxSizing, backfaceVisibility and borderCurve', () => {
      expect(
        build({
          cursor: 'pointer',
          pointerEvents: 'none',
          boxSizing: 'content-box',
          backfaceVisibility: 'hidden',
          borderCurve: 'continuous',
        }),
      ).toStrictEqual({
        cursor: 'pointer',
        pointerEvents: 'none',
        boxSizing: 'content-box',
        backfaceVisibility: 'hidden',
        borderCurve: 'continuous',
      });
    });

    it('supports userSelect', () => {
      expect(build({userSelect: 'none'})).toStrictEqual({userSelect: 'none'});
    });
  });
});
