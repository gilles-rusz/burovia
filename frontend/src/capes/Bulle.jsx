export function Bulle({ children, cote = 'gauche', className = '' }) {
  return <div className={`bulle bulle--${cote} ${className}`}>{children}</div>;
}

export function Recitatif({ children, className = '' }) {
  return <div className={`recitatif ${className}`}>{children}</div>;
}

export function Gilles({ pose, alt = 'Gilles, en super-héros des Capés du Bide', className = '' }) {
  return (
    <img
      className={`gilles ${className}`}
      src={`/capes/gilles-${pose}.webp`}
      alt={alt}
      width="640"
      height="640"
      loading="lazy"
    />
  );
}
