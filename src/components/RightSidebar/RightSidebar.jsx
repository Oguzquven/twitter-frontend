import SearchBar from "./SearchBar";
import TrendingCard from "./TrendingCard";
import WhoToFollow from "./WhoToFollow";
import FooterLinks from "./FooterLinks";

function RightSidebar() {
  return (
    <div
      style={{
        width: "300px",
        padding: "12px 0 0 24px",
        position: "sticky",
        top: 0,
        height: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <SearchBar />
      <TrendingCard />
      <WhoToFollow />
      <FooterLinks />
    </div>
  );
}

export default RightSidebar;
