import React from 'react';

interface CardProps {
  title: string;
  description: string;
  flip?: boolean;
}

export default function Card({ title, description, flip = false }: CardProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-32 border-b border-border ${flip ? 'md:grid-flow-col' : ''}`}>
      <div className={`aspect-square bg-muted rounded-xl border border-border ${flip ? 'md:order-last' : ''}`}></div>
      <div className={`flex items-center justify-center ${flip ? 'md:order-first' : ''}`}>
        <div className="md:max-w-72 flex flex-col">
          <h2 className="text-md font-bold">{title}</h2>
          <p className="text-md">{description}</p>
        </div>
      </div>
    </div>
  );
}