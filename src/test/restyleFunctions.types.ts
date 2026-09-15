import {BoxProps} from '../createBox';
import {TextProps} from '../createText';

/**
 * Type-level coverage for the style properties added on top of upstream's
 * frozen tables.
 *
 * The prop types resolve through `StyleValueOf`, which degrades to `never` when
 * the installed react-native does not know a property. That guard is invisible
 * at runtime, so these assertions are the only thing standing between a working
 * prop and one that silently accepts nothing.
 *
 * Enforced by `yarn typecheck`; there is deliberately nothing to run here.
 */
type Theme = {
  colors: {primary: string};
  spacing: {m: number};
  borderRadii: {small: number};
  breakpoints: {phone: number};
  textVariants: {defaults: {fontSize: number}};
};

type Box = BoxProps<Theme>;
type Text = TextProps<Theme>;

// Pass-through properties must resolve to real react-native types, not `never`.
export const passThrough: Box = {
  cursor: 'pointer',
  pointerEvents: 'none',
  boxSizing: 'content-box',
  backfaceVisibility: 'hidden',
  borderCurve: 'continuous',
  outlineStyle: 'dotted',
  outlineWidth: 1,
  outlineOffset: 2,
  boxShadow: [{offsetX: 0, offsetY: 2}],
  filter: [{blur: 4}],
  mixBlendMode: 'multiply',
  isolation: 'isolate',
  inset: 8,
  insetInlineStart: 4,
};

// userSelect is a TextStyle property, so it belongs to the typography group.
export const textOnly: Text = {
  userSelect: 'none',
};

// Themed properties must resolve to keys of the corresponding theme section.
export const themed: Box = {
  outlineColor: 'primary',
  borderBlockColor: 'primary',
  marginBlock: 'm',
  paddingInlineEnd: 'm',
  borderStartStartRadius: 'small',
};

// And the responsive form must work for the new properties too.
export const responsive: Box = {
  marginBlock: {phone: 'm'},
  cursor: {phone: 'pointer'},
};

export const rejected: Box = {
  // @ts-expect-error - not a CursorValue
  cursor: 'grab',
  // @ts-expect-error - outlineColor is a theme key, not a raw colour
  outlineColor: 'red',
  // @ts-expect-error - marginBlock is a spacing key, not a raw number
  marginBlock: 999,
  // @ts-expect-error - not a theme borderRadii key
  borderStartStartRadius: 'huge',
  // @ts-expect-error - not a valid outlineStyle
  outlineStyle: 'groove',
};
