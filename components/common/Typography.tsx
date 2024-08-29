import React from "react";
import classNames from "classnames";

interface TypographyProps {
  variant:
    | "headings"
    | "title"
    | "subtitle1"
    | "subtitle2"
    | "textLarge"
    | "text"
    | "caption";
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
  ellipsis?: boolean;
  lines?: number;
  children?: React.ReactNode;
}

const Typography = ({
  variant,
  color,
  weight,
  style,
  ellipsis = false,
  lines = 1,
  children,
}: TypographyProps) => {
  const baseStyles = classNames(
    color && `text-${color}`,
    weight && `font-${weight}`,
    ellipsis && "overflow-hidden text-ellipsis",
    ellipsis && lines && "line-clamp-" + lines
  );

  switch (variant) {
    case "headings":
      return (
        <h1
          className={classNames(baseStyles, "text-4xl font-bold")}
          style={style}
        >
          {children}
        </h1>
      );
    case "title":
      return (
        <h2
          className={classNames(baseStyles, "text-3xl font-semibold")}
          style={style}
        >
          {children}
        </h2>
      );
    case "subtitle1":
      return (
        <h3
          className={classNames(baseStyles, "text-xl font-semibold")}
          style={style}
        >
          {children}
        </h3>
      );
    case "subtitle2":
      return (
        <p
          className={classNames(baseStyles, "text-lg font-semibold")}
          style={style}
        >
          {children}
        </p>
      );
    case "textLarge":
      return (
        <p
          className={classNames(baseStyles, "text-lg font-normal")}
          style={style}
        >
          {children}
        </p>
      );
    case "text":
      return (
        <p
          className={classNames(baseStyles, "text-base font-normal")}
          style={style}
        >
          {children}
        </p>
      );
    case "caption":
      return (
        <span
          className={classNames(
            baseStyles,
            "text-sm font-normal text-gray-500"
          )}
          style={style}
        >
          {children}
        </span>
      );
    default:
      return (
        <p
          className={classNames(baseStyles, "text-base font-normal")}
          style={style}
        >
          {children}
        </p>
      );
  }
};

export default Typography;
