import LocationPageLayout from "@/components/LocationPageLayout";

const Oakland = () => {
  return (
    <LocationPageLayout
      areaName="Oakland"
      areaSlug="oakland"
      metaTitle="Party Bus Rental Oakland Pittsburgh | Pitt, CMU, Shadyside, Squirrel Hill"
      metaDescription="Party bus rentals in Oakland Pittsburgh. Serving University of Pittsburgh, CMU, Shadyside, Squirrel Hill & East End. Perfect for graduations & events. Free quotes!"
      heroDescription="Need a party bus in Oakland? Pitt Party Bus provides premium transportation for University of Pittsburgh events, Carnegie Mellon celebrations, and everything in between. From graduation parties to Pitt game days, we're Oakland's trusted party bus service."
      landmarks={[
        "University of Pittsburgh",
        "Carnegie Mellon University",
        "Cathedral of Learning",
        "Phipps Conservatory",
        "Carnegie Museum of Art",
        "Carnegie Museum of Natural History",
        "Schenley Park",
        "Heinz Chapel",
        "UPMC Presbyterian",
        "Soldiers & Sailors Memorial",
        "Petersen Events Center",
        "Frick Park"
      ]}
      neighborhoods={[
        "North Oakland",
        "South Oakland",
        "Central Oakland",
        "Shadyside",
        "Squirrel Hill",
        "Point Breeze",
        "Regent Square",
        "Greenfield",
        "Hazelwood",
        "Bloomfield",
        "Friendship",
        "Highland Park"
      ]}
      popularEvents={[
        {
          name: "Graduation Parties",
          description: "Celebrate Pitt and CMU graduations with luxury party bus transportation for families and friends."
        },
        {
          name: "Pitt Football Games",
          description: "Game day transportation to Acrisure Stadium from Oakland - tailgate on the way!"
        },
        {
          name: "Wedding Transportation",
          description: "Elegant shuttles to Phipps Conservatory, Heinz Chapel, and Oakland wedding venues."
        },
        {
          name: "Museum Events",
          description: "Group transportation to Carnegie Museums, special exhibitions, and cultural events."
        },
        {
          name: "Shadyside Shopping Tours",
          description: "Luxury transportation for shopping excursions on Walnut Street and Ellsworth Avenue."
        },
        {
          name: "University Events",
          description: "Transportation for campus events, alumni gatherings, and university celebrations."
        }
      ]}
      testimonial={{
        name: "The Martinez Family",
        event: "CMU Graduation",
        text: "We brought family from out of town for our daughter's CMU graduation. The party bus picked everyone up from the hotel and took us to campus, then to dinner in Shadyside. Perfect day!"
      }}
      nearbyAreas={[
        { name: "Downtown Pittsburgh", slug: "downtown" },
        { name: "South Side", slug: "south-side" },
        { name: "North Hills", slug: "north-hills" },
        { name: "South Hills", slug: "south-hills" }
      ]}
    />
  );
};

export default Oakland;
