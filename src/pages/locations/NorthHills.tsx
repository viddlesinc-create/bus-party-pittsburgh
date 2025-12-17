import LocationPageLayout from "@/components/LocationPageLayout";

const NorthHills = () => {
  return (
    <LocationPageLayout
      areaName="North Hills"
      areaSlug="north-hills"
      metaTitle="Party Bus Rental North Hills Pittsburgh | Cranberry, Wexford, McCandless"
      metaDescription="Party bus rentals in North Hills Pittsburgh. Serving Cranberry Township, Wexford, Pine Township, McCandless & Ross Township. Professional chauffeurs, luxury vehicles. Free quotes!"
      heroDescription="Looking for party buses near you in North Hills? Pitt Party Bus provides premium party bus and limousine service throughout Cranberry Township, Wexford, Pine Township, McCandless, and all North Hills communities. From prom transportation to wedding shuttles, we're your local luxury transportation experts."
      landmarks={[
        "Cranberry Township",
        "UPMC Passavant Hospital",
        "North Hills Village",
        "Pine Township",
        "Seneca Valley School District",
        "Treesdale Golf & Country Club",
        "Graham Park",
        "North Park",
        "Mars Area Schools",
        "Ross Park Mall",
        "McKnight Road",
        "Cranberry Highlands Golf Course"
      ]}
      neighborhoods={[
        "Cranberry Township",
        "Wexford",
        "Pine Township",
        "McCandless",
        "Ross Township",
        "Allison Park",
        "Hampton Township",
        "Gibsonia",
        "Mars",
        "Richland Township",
        "Bradford Woods",
        "Franklin Park"
      ]}
      popularEvents={[
        {
          name: "High School Proms",
          description: "Safe, stylish prom transportation for Seneca Valley, North Allegheny, Pine-Richland, and Hampton students."
        },
        {
          name: "Wedding Transportation",
          description: "Elegant bridal party and guest shuttles to North Hills venues, country clubs, and reception halls."
        },
        {
          name: "Corporate Events",
          description: "Professional transportation for Cranberry business parks and corporate headquarters."
        },
        {
          name: "Wine Tours",
          description: "Scenic tours to nearby wineries and breweries from North Hills with safe, reliable transportation."
        },
        {
          name: "Birthday Celebrations",
          description: "Milestone birthdays and celebrations with luxury party bus transportation throughout North Hills."
        },
        {
          name: "Sporting Events",
          description: "Group transportation to Steelers, Penguins, and Pirates games from North Hills communities."
        }
      ]}
      testimonial={{
        name: "The Johnson Family",
        event: "Pine-Richland Prom",
        text: "We've used Pitt Party Bus for three proms now - each of our kids! They're always professional, on time, and the kids have a blast. Best prom transportation in the North Hills!"
      }}
      nearbyAreas={[
        { name: "Downtown Pittsburgh", slug: "downtown" },
        { name: "South Hills", slug: "south-hills" },
        { name: "Oakland", slug: "oakland" },
        { name: "South Side", slug: "south-side" }
      ]}
    />
  );
};

export default NorthHills;
