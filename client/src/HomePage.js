import NavigationBar from "./components/NavigationBar";
import NavCarousel from "./components/NavCarousel";

export default function HomePage(props) {
  const { setLoggedIn, loggedIn } = props
  return (
    <div className="App">
      <NavigationBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <NavCarousel />
    </div>
  );
}
