import LocationPageLayout from "@/components/LocationPageLayout";

const SouthSide = () => {
  return (
    <LocationPageLayout
      areaName="South Side"
      areaSlug="south-side"
      metaTitle="Party Bus Rental South Side Pittsburgh | Carson Street, Station Square, Mt Washington"
      metaDescription="Party bus rentals in South Side Pittsburgh. Serving Carson Street, Station Square, Mt. Washington & South Side Flats. Perfect for bar crawls & nightlife. Free quotes!"
      heroDescription="Looking for party buses near you in South Side? Pitt Party Bus is your go-to for Carson Street bar crawls, Station Square events, and Mt. Washington celebrations. Our party buses are perfect for South Side nightlife - no designated driver needed!"
      landmarks={[
        "East Carson Street",
        "Station Square",
        "Mt. Washington Overlooks",
        "Duquesne Incline",
        "Monongahela Incline",
        "SouthSide Works",
        "Rex Theater",
        "Smiling Moose",
        "Jack's Bar",
        "Mario's",
        "Hofbräuhaus",
        "Rivers Casino (nearby)"
      ]}
      neighborhoods={[
        "South Side Flats",
        "South Side Slopes",
        "Station Square",
        "Mt. Washington",
        "Allentown",
        "Arlington",
        "Beltzhoover",
        "Knoxville",
        "Carrick",
        "Banksville",
        "Beechview",
        "Brookline"
      ]}
      popularEvents={[
        {
          name: "Bar Crawls",
          description: "The ultimate South Side bar hopping experience on East Carson Street - visit multiple venues safely!"
        },
        {
          name: "Bachelor Parties",
          description: "Epic bachelor party transportation through Pittsburgh's best nightlife district."
        },
        {
          name: "Bachelorette Parties",
          description: "Girls' night out with style - party bus service to South Side's hottest spots."
        },
        {
          name: "Birthday Celebrations",
          description: "Make your birthday unforgettable with a Carson Street party bus tour."
        },
        {
          name: "Station Square Events",
          description: "Transportation to concerts, dining, and entertainment at Station Square."
        },
        {
          name: "Mt. Washington Dining",
          description: "Scenic party bus rides to Mt. Washington restaurants and overlooks."
        }
      ]}
      testimonial={{
        name: "Jessica's Bachelorette Party",
        event: "South Side Bar Crawl",
        text: "OMG the party bus made my bachelorette SO much better! We hit like 8 bars on Carson Street and didn't have to worry about anything. The driver was awesome and the bus was so fun!"
      }}
      nearbyAreas={[
        { name: "Downtown Pittsburgh", slug: "downtown" },
        { name: "Oakland", slug: "oakland" },
        { name: "North Hills", slug: "north-hills" },
        { name: "South Hills", slug: "south-hills" }
      ]}
    />
  );
};

export default SouthSide;
