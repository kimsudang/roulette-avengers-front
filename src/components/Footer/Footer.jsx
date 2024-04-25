import Github from "../../assets/github-logo.png";

const Footer = () => {
  return (
    <div className="relative flex items-center justify-between w-full h-12 transform translate-y-0 bg-gray-300 Footer">
      <p className="pl-5 m-0">@ Roulette-avengers </p>
      <a href="https://github.com/rollet-avengers" target="_blank">
        <img src={Github} className="w-8 mr-5" />
      </a>
    </div>
  );
};

export default Footer;
