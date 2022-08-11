export default ({ children, style, onClick, disabled }) => (
    <button 
      style={style} 
      disabled={disabled}
      onClick={onClick}
    >
      {children}

    </button>
  )