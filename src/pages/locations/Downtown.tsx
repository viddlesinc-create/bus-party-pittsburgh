import LocationPageLayout from "@/components/LocationPageLayout";

const Downtown = () => {
  return (
    <LocationPageLayout
      areaName="Downtown Pittsburgh"
      areaSlug="downtown"
      metaTitle="Party Bus Rental Downtown Pittsburgh | Strip District, North Shore, Station Square"
      metaDescription="Party bus rentals in Downtown Pittsburgh. Serving Strip District, North Shore, Station Square, Cultural District & Market Square. 24/7 availability. Free quotes!"
      heroDescription="Need a party bus in Downtown Pittsburgh? Pitt Party Bus provides premium transportation throughout the Golden Triangle, Strip District, North Shore, and all downtown neighborhoods. From corporate events to game day celebrations, we're Pittsburgh's downtown party bus experts."
      landmarks={[
        "Acrisure Stadium (Heinz Field)",
        "PNC Park",
        "PPG Paints Arena",
        "Station Square",
        "Market Square",
        "Cultural District",
        "Strip District",
        "Point State Park",
        "David L. Lawrence Convention Center",
        "Heinz Hall",
        "Byham Theater",
        "Rivers Casino"
      ]}
      neighborhoods={[
        "Golden Triangle",
        "Strip District",
        "North Shore",
        "Station Square",
        "Cultural District",
        "Market Square",
        "Penn-Liberty",
        "Firstside",
        "Bluff",
        "South Shore",
        "North Side",
        "Mexican War Streets"
      ]}
      popularEvents={[
        {
          name: "Steelers Game Days",
          description: "Ultimate tailgating experience with party bus transportation to Acrisure Stadium. Skip the parking!"
        },
        {
          name: "Pirates Games",
          description: "Group transportation to PNC Park for baseball games, fireworks nights, and special events."
        },
        {
          name: "Penguins Hockey",
          description: "Party bus service to PPG Paints Arena for hockey games and concerts."
        },
        {
          name: "Corporate Events",
          description: "Professional transportation for conventions, conferences, and business events downtown."
        },
        {
          name: "Night Out on the Town",
          description: "Bar hopping and nightlife tours through Station Square, Strip District, and Cultural District."
        },
        {
          name: "Concert Transportation",
          description: "Hassle-free rides to shows at PPG Paints Arena, Stage AE, and Heinz Hall."
        }
      ]}
      testimonial={{
        name: "Mike's Bachelor Party",
        event: "Downtown Bar Crawl",
        text: "Best bachelor party ever! We hit the Strip District, Station Square, and ended at Rivers Casino. The party bus kept the energy going all night. Highly recommend!"
      }}
      nearbyAreas={[
        { name: "North Hills", slug: "north-hills" },
        { name: "South Hills", slug: "south-hills" },
        { name: "Oakland", slug: "oakland" },
        { name: "South Side", slug: "south-side" }
      ]}
    />
  );
};

export default Downtown;
