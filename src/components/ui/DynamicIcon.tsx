import React from "react";
import * as Icons from "lucide-react";

interface DynamicIconProps {
  name?: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 18,
  className = "",
  strokeWidth = 2,
}) => {
  const LucideIcon =
    name && Icons[name as keyof typeof Icons]
      ? (Icons[name as keyof typeof Icons] as React.ElementType)
      : Icons.Code;

  return (
    <LucideIcon
      size={size}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};

export default DynamicIcon;
