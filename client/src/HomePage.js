import NavigationBar from "./components/NavigationBar";
import NavCarousel from "./components/NavCarousel";

export default function HomePage({userID}) {
  return (
    <div className="App">
      <NavigationBar userID={userID}/>
      <NavCarousel />
    </div>
  );
}
