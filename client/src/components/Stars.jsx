
import React , {useEffect} from 'react'

const Stars = () => {
  useEffect(() => {},[])
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(300)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 3 + 2 + 's',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;