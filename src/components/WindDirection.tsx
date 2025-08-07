import React from 'react';

interface WindDirectionProps {
  speed: number;
  direction?: number;
}

export const WindDirection: React.FC<WindDirectionProps> = ({
  speed,
  direction,
}) => {
  return (
    <div className="flex items-center gap-1">
      {direction !== undefined && (
        <span
          className="text-sm font-bold inline-block transition-transform duration-300"
          style={{
            transform: `rotate(${direction}deg)`,
            transformOrigin: 'center',
          }}
        >
          ↓
        </span>
      )}
      <span>{speed.toFixed(1)}</span>
    </div>
  );
};
