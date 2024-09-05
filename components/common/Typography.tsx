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
  className?: any;
  children?: React.ReactNode;
}

const Typography = ({
  variant,
  color,
  weight,
  className,
  style,
  ellipsis = false,
  lines = 1,
  children,
}: TypographyProps) => {
  const baseStyles = classNames(
    `break-keep`,
    `whitespace-pre-wrap`,
    color && `text-${color}`,
    weight && `font-${weight}`,
    ellipsis && "overflow-hidden text-ellipsis",
    ellipsis && lines && "line-clamp-" + lines
  );

  switch (variant) {
    case "headings":
      return (
        <h1
          className={classNames(baseStyles, className, "text-6xl font-bold")}
          style={style}
        >
          {children}
        </h1>
      );
    case "title":
      return (
        <h2
          className={classNames(
            baseStyles,
            className,
            "text-3xl font-semibold"
          )}
          style={style}
        >
          {children}
        </h2>
      );
    case "subtitle1":
      return (
        <h3
          className={classNames(baseStyles, className, "text-xl font-semibold")}
          style={style}
        >
          {children}
        </h3>
      );
    case "subtitle2":
      return (
        <p
          className={classNames(baseStyles, className, "text-lg font-semibold")}
          style={style}
        >
          {children}
        </p>
      );
    case "textLarge":
      return (
        <p
          className={classNames(baseStyles, className, "text-lg font-normal")}
          style={style}
        >
          {children}
        </p>
      );
    case "text":
      return (
        <p
          className={classNames(baseStyles, className, "text-base font-normal")}
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
            className,
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
          className={classNames(baseStyles, className, "text-base font-normal")}
          style={style}
        >
          {children}
        </p>
      );
  }
};

export default Typography;
