
export const Lougout = () => {

  const handleLogout = () => {
    console.log('logged out');
  }

  return (
    <button onClick={handleLogout} className="btn Header__buttons-login">Cerrar Sesión </button>
  );
}
