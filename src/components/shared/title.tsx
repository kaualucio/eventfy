import React from 'react'

interface TitleProps {
  title: string;
}

export const Title = ({title}: TitleProps) => {
  return (
    <h2 className="text-secondary500 text-3xl font-bold">{title}</h2>
  )
}
