function Header({ resetStateToDefault }) {
  return (
    <div className="container mx-auto border-b mb-6">
      <button onClick={resetStateToDefault} className="py-4 font-bold">
        Home
      </button>
    </div>
  );
}
export default Header;
