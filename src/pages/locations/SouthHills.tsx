import LocationPageLayout from "@/components/LocationPageLayout";

const SouthHills = () => {
  return (
    <LocationPageLayout
      areaName="South Hills"
      areaSlug="south-hills"
      metaTitle="Party Bus Rental South Hills Pittsburgh | Mt Lebanon, Upper St Clair, Peters Township"
      metaDescription="Party bus rentals in South Hills Pittsburgh. Serving Mt. Lebanon, Upper St. Clair, Peters Township, Bethel Park & McMurray. Luxury transportation for all occasions. Free quotes!"
      heroDescription="Searching for party buses near you in South Hills? Pitt Party Bus delivers premium party bus and limousine service to Mt. Lebanon, Upper St. Clair, Peters Township, Bethel Park, and all South Hills communities. Experience luxury transportation for weddings, proms, corporate events, and celebrations."
      landmarks={[
        "South Hills Village Mall",
        "The Galleria of Mt. Lebanon",
        "Peters Township Parks",
        "Upper St. Clair Country Club",
        "Boyce Park",
        "South Park",
        "Rolling Hills Country Club",
        "Mt. Lebanon Recreation Center",
        "Bethel Park Community Center",
        "Southpointe",
        "The Meadows Racetrack",
        "Tanger Outlets"
      ]}
      neighborhoods={[
        "Mt. Lebanon",
        "Upper St. Clair",
        "Peters Township",
        "McMurray",
        "Bethel Park",
        "South Park",
        "Bridgeville",
        "Castle Shannon",
        "Dormont",
        "Canonsburg",
        "Cecil Township",
        "Jefferson Hills"
      ]}
      popularEvents={[
        {
          name: "High School Proms",
          description: "Premier prom transportation for Mt. Lebanon, Upper St. Clair, Peters Township, and Bethel Park students."
        },
        {
          name: "Wedding Transportation",
          description: "Sophisticated bridal party shuttles and guest transportation to South Hills venues and country clubs."
        },
        {
          name: "Country Club Events",
          description: "Luxury transportation to Rolling Hills, St. Clair Country Club, and other prestigious venues."
        },
        {
          name: "Corporate Shuttles",
          description: "Professional group transportation for Southpointe businesses and corporate events."
        },
        {
          name: "Casino Trips",
          description: "Fun group transportation to The Meadows and other gaming destinations."
        },
        {
          name: "Shopping Tours",
          description: "Group outings to Tanger Outlets, South Hills Village, and The Galleria."
        }
      ]}
      testimonial={{
        name: "Amanda & David",
        event: "Wedding Reception",
        text: "Our wedding shuttle from the church in Mt. Lebanon to our reception in Peters Township was flawless. The driver was professional and our guests loved the party bus experience!"
      }}
      nearbyAreas={[
        { name: "Downtown Pittsburgh", slug: "downtown" },
        { name: "North Hills", slug: "north-hills" },
        { name: "Oakland", slug: "oakland" },
        { name: "South Side", slug: "south-side" }
      ]}
    />
  );
};

export default SouthHills;
