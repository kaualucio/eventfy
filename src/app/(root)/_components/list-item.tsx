import React from 'react'

interface ListItemProps {
  numberItem: number;
  value: string
}

export const ListItem = ({ numberItem, value }: ListItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-primary500 text-3xl font-bold">{numberItem}.</span>
      <p className="text-md text-secondary400">{value}</p>
    </div>
  )
}
