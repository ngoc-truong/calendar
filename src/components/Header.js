import background from "../assets/lindy-dancers-copy.jpg";

const Header = () => {
  return (
    <div className="header">
      <img src={background} alt="illustration dancers" />

      <div className="caption">
        <h1>Lindy Hop</h1>
        <h1>Hamburg</h1>
      </div>
    </div>
  );
};

export default Header;
