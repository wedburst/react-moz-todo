import React from 'react'

export const FilterButton = ({name, isPressed, setFilter}) => {
    return (
        <button type="button" className="btn toggle-btn" 
            aria-pressed={isPressed} // Para saber el estado del valor boleano
            onClick={() => setFilter(name)}
        >
          <span className="visually-hidden">Show </span>
          <span>{name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    )
}
