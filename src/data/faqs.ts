/**
 * FAQ copy — the single source for both the visible accordions and the FAQPage
 * JSON-LD. Rendered through <FAQSection>, which emits both from the same array.
 *
 * Rules enforced by scripts/validate-seo.mjs:
 *   - every answer is 100-200 words
 *   - every answer names "Pitt Party Bus" and "Pittsburgh"
 *   - no duplicate questions within a page
 *
 * Prices quoted here must match BUSINESS_INFO.priceRange and the per-vehicle
 * rates shown on /pricing. Do not introduce a new number in an answer.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const EVENTS_FAQS: Faq[] = [
  {
    question: "How many hours should I book a party bus for a wedding?",
    answer:
      "Most Pittsburgh weddings book Pitt Party Bus for five to six hours, and the shape of the day decides it rather than the ceremony length. A typical booking covers getting the wedding party from the hotel to the ceremony, holding through photos at a spot like Point State Park or the North Shore, then running guests to the reception. If you want the bus for the send-off as well, add an hour or two at the back end. Because we quote hourly and rates run $150 to $250 depending on the vehicle, an extra hour is a known cost rather than a surprise, and it is far cheaper than booking a second vehicle later. Build in a buffer for photos running long, which they usually do. If your ceremony and reception share a venue, four hours often covers it comfortably.",
  },
  {
    question: "Can one party bus handle both the wedding party and guests?",
    answer:
      "Usually not in one trip, and trying to make it work is the most common planning mistake we see in Pittsburgh. A wedding party of ten to fourteen fits comfortably in a mid-size bus, but a guest shuttle for sixty people needs multiple runs. What most Pitt Party Bus clients do instead is run the bus in shifts: the wedding party first, then two or three loops between the hotel block and the venue for guests. That works when the two locations are close, which they often are downtown or in the South Hills. If the venue is thirty minutes out, shifts eat the evening and a second vehicle makes more sense. Tell us the guest count and both addresses when you ask for a quote and we will tell you honestly which of the two is cheaper for your timing.",
  },
  {
    question: "What is the alcohol policy for prom and graduation bookings?",
    answer:
      "No alcohol, and it is not negotiable on a student booking. For proms and graduations, Pitt Party Bus runs a strictly dry vehicle regardless of any individual passenger's age, and the chauffeur has the authority to end the trip and return the group to the pickup point if alcohol appears on board. Parents booking Pittsburgh prom transportation regularly ask us to put this in writing, and we will. On adult bookings the policy differs: passengers twenty-one and over may bring their own alcohol, we supply ice, cups and cooler space, and the chauffeur checks IDs and may refuse service to anyone visibly intoxicated. We do not sell alcohol on any booking. If your group is mixed ages, the dry policy applies to the whole vehicle, because a chauffeur cannot police individual seats while driving.",
  },
  {
    question: "How far in advance do I need to book for prom season?",
    answer:
      "Six to eight weeks for prom, and that is not padding. Pittsburgh prom season runs April through June and the region's high schools cluster their dates into a handful of Saturdays, so Pitt Party Bus sells out those specific nights well before the surrounding weekends fill. Wedding season is similar between May and October, and New Year's Eve is the single hardest night of the year to book late. For an ordinary Friday or Saturday outside those windows, two to four weeks is comfortable, and we frequently have same-day availability midweek. The practical advice: as soon as your school announces the prom date, call. A deposit holds the vehicle, and it is far easier to adjust the pickup time on a confirmed booking than to find a bus three weeks out.",
  },
  {
    question: "Do you handle corporate events and conference transportation?",
    answer:
      "Yes, and corporate bookings tend to be the most straightforward work Pitt Party Bus does in Pittsburgh, because the requirements are usually fixed in advance. Common jobs are shuttling attendees between a downtown hotel block and the David L. Lawrence Convention Center, moving a team from the office to a holiday party or a Pirates game, and running airport transfers for visiting executives. Our shuttles seat fourteen and twenty-three passengers, which covers most conference loops without needing a full party bus. Billing works the same as any other rental, hourly at $150 to $250 depending on the vehicle, and we can invoice a company rather than taking a card at the door. Give us the schedule and the headcount and we will tell you how many vehicles and how many loops it actually takes.",
  },
  {
    question: "What happens if our event runs longer than we booked?",
    answer:
      "Tell the chauffeur as early in the night as you can and we will usually extend. Pitt Party Bus charges extensions at the same hourly rate as the original booking, so there is no penalty rate for running over in Pittsburgh, but availability is the real constraint: if the vehicle is booked for another group later that evening, we cannot hold it. That is why the timing matters more than the money. A group that mentions at nine o'clock that they might want an extra hour almost always gets it; a group that asks at midnight sometimes cannot. If you already suspect your event will run long, book the extra hour up front. It costs the same either way and removes the risk entirely, which for a wedding or milestone birthday is usually worth it.",
  },
];

/**
 * Location-page FAQs, keyed by the slug used in /locations/[slug].
 * Each set is written for its own area — landmarks, venues and trip patterns
 * differ, so these are not one template with the place name swapped.
 */
export const LOCATION_FAQS: Record<string, Faq[]> = {
  downtown: [
    {
      question: "Where can a party bus pick up and drop off in Downtown Pittsburgh?",
      answer:
        "Almost anywhere, with the caveat that Downtown Pittsburgh has more loading restrictions than the rest of the city. Pitt Party Bus regularly picks up outside hotels on Liberty and Penn, at Market Square, at Station Square across the Smithfield Street Bridge, and at the Convention Center. For Acrisure Stadium and PNC Park on the North Shore, we use the designated bus loading zones rather than the general lots, which is faster on a game night and avoids the post-event gridlock on the bridges. What we cannot do is idle in a bus lane or block a transit stop while a group finishes dinner, so we agree a specific pickup point and time in advance. Give us the venue name when you book and we will pick the corner that actually works.",
    },
    {
      question: "Is a party bus worth it downtown when everything is walkable?",
      answer:
        "It depends entirely on the weather and the size of your group. For four people bar-hopping in the Cultural District on a mild evening, walking wins and Pitt Party Bus would tell you so. For fourteen people trying to get from a Downtown Pittsburgh hotel to a South Side restaurant, then to a show, then back across the river in February, a bus is both cheaper and dramatically less miserable than four rideshares booked at surge pricing three separate times. The break-even is usually around ten passengers or three or more stops. Add a Steelers or Penguins game to the night and the calculation shifts further, because parking downtown on an event night is both expensive and slow to leave. Tell us the itinerary and we will give you a straight answer.",
    },
    {
      question: "How does game-day traffic affect a Downtown pickup?",
      answer:
        "It adds time at the end, not the beginning, and planning around that is most of the job. Getting into Downtown Pittsburgh before a Steelers, Penguins or Pirates game is generally fine; getting off the North Shore afterwards is where an hour disappears, because the bridges bottleneck and everyone leaves at once. Pitt Party Bus builds this into the quote by suggesting a pickup point slightly away from the immediate stadium perimeter, which often saves more time than it costs in walking. We also recommend booking the return leg with an hour of slack rather than to the minute. If your group is happy to wait twenty minutes for the crowd to thin, the ride home is quicker and calmer than leaving the moment the whistle goes.",
    },
    {
      question: "Can we bring drinks on board for a Downtown night out?",
      answer:
        "Yes, if everyone on board is twenty-one or over. Pitt Party Bus supplies ice, cups and cooler space, and passengers bring their own alcohol; we do not sell it. The chauffeur checks IDs before the vehicle moves and can decline service to anyone visibly intoxicated, which is a safety requirement rather than a judgment call. Open containers stay on the bus — you cannot carry a drink off at a stop in Downtown Pittsburgh, and doing so is what turns a good night into a conversation with police. On student or mixed-age bookings the vehicle is dry regardless of individual ages. If your group is going to a venue that serves, the practical approach is keeping the bus stocked for travel between stops rather than pre-loading.",
    },
    {
      question: "What does a Downtown party bus rental cost for a night out?",
      answer:
        "Rates run $150 to $250 an hour depending on the vehicle, and for Downtown Pittsburgh work the hours matter more than the distance because you are not covering many miles. A common booking is four to five hours on a Saturday evening for a group of twenty, which lands in the middle of that range. There is no per-mile surcharge inside our standard service area, and fuel, tolls, insurance and the chauffeur are all included in the hourly rate, so the number you are quoted is the number you pay before gratuity. Split across a full bus, Pitt Party Bus usually works out comparable to rideshares once you count the return trip and surge pricing, with the advantage that the vehicle waits for you.",
    },
  ],
  oakland: [
    {
      question: "Do you handle Pitt and CMU graduation transportation?",
      answer:
        "Yes, and Oakland graduation weekend is one of the busiest dates on the Pitt Party Bus calendar, which is the main thing to know about it. Both Pitt and Carnegie Mellon graduate on overlapping days in late April and early May, the Petersen Events Center and the CMU campus fill Oakland with families at the same hours, and hotel blocks across Pittsburgh sell out. Vehicles for that weekend are typically gone six to eight weeks ahead. Typical bookings are a family group moving between a hotel, the ceremony and a restaurant, which usually needs four to five hours rather than a full evening. Because Oakland parking is genuinely difficult on those days, a bus that drops at the venue and returns is often the difference between arriving on time and circling Forbes Avenue.",
    },
    {
      question: "Where do you pick up near the Pitt and CMU campuses?",
      answer:
        "We use the streets that can actually take a bus, which in Oakland is a shorter list than people expect. Pitt Party Bus commonly picks up on Forbes and Fifth Avenue at agreed points, near the Petersen Events Center, outside the Cathedral of Learning, and on the CMU side near Forbes and Morewood. What we avoid is the narrow residential blocks off Craig Street and the tighter sections around Schenley Farms, where a thirty-passenger vehicle cannot turn or safely load. If your group is scattered across Oakland, the simplest solution in Pittsburgh is one agreed meeting point rather than three pickups, which saves fifteen or twenty minutes of circling. Send us the address when you book and we will name the nearest workable corner for your vehicle size.",
    },
    {
      question: "Can students book a party bus for a formal or fraternity event?",
      answer:
        "Yes, with the alcohol policy stated clearly up front. Pitt Party Bus runs student bookings in Oakland as dry vehicles, meaning no alcohol on board regardless of individual passengers' ages, and the chauffeur can end the trip if that is broken. Beyond that, student formals work like any other booking: a deposit holds the vehicle, we quote hourly at $150 to $250 depending on size, and a group of twenty-five splitting a four-hour booking usually pays less per person than rideshares would cost for the same night in Pittsburgh. One practical note specific to student groups: nominate a single organizer who holds the booking and talks to the chauffeur. Twenty-five people trying to change the plan mid-trip is how a schedule falls apart.",
    },
    {
      question: "How long does it take to get from Oakland to Downtown?",
      answer:
        "Fifteen to twenty minutes in normal traffic, and closer to forty when the Parkway is backed up or a game is letting out. The distance from Oakland to Downtown Pittsburgh is only about three miles, but the Boulevard of the Allies and Forbes both narrow at predictable points, and Pitt Party Bus plans routes around them rather than trusting a straight line. For groups moving from an Oakland hotel to a Downtown restaurant or a show, we generally recommend leaving thirty minutes before you need to arrive. If your evening also includes a stop in Shadyside or Squirrel Hill, tell us at booking, because the order of the stops changes total drive time more than most people assume.",
    },
    {
      question: "What size vehicle suits a typical Oakland group?",
      answer:
        "For most Oakland bookings, something in the middle. Graduation family groups usually run eight to fourteen people, which fits a mini party bus or the Denali SUV limo comfortably, while student formals more often need the twenty-two to thirty passenger buses. Pitt Party Bus operates thirteen vehicles seating two to thirty passengers, so the honest answer depends on your headcount, but the common mistake is booking too small to save money and then discovering that fourteen people in a fourteen-passenger vehicle with coats and bags is tight. In Pittsburgh weather, coats are not optional for half the year. If you are between two sizes, take the larger one; the hourly difference is modest and the comfort difference across a four-hour evening is not.",
    },
  ],
  "south-side": [
    {
      question: "Can a party bus stop along East Carson Street?",
      answer:
        "Yes, but at agreed points rather than wherever the group decides on the night. East Carson Street on the South Side is one of the longest continuous bar strips in Pittsburgh and it is also narrow, heavily parked and busy with pedestrians after dark, so Pitt Party Bus loads at cross-streets and designated pull-offs rather than double-parking mid-block. In practice this means walking half a block, which nobody minds. What genuinely does not work is a bus idling on Carson while a group finishes a round. Agree your stops when you book, keep to roughly the times you set, and the evening runs smoothly. If your plan is loose, we can hold at a nearby side street and come back when you call.",
    },
    {
      question: "Is a party bus a good option for a South Side bar crawl?",
      answer:
        "It is close to the ideal use case, provided you plan the route. A South Side crawl in Pittsburgh usually means three or four venues spread along Carson and the surrounding streets, and Pitt Party Bus turns that into one vehicle holding your group, your coats and your drinks between stops rather than four rideshares booked at surge pricing at midnight. The real advantage is the end of the night: everyone leaves together from one place, and nobody drives. Rates run $150 to $250 an hour depending on the vehicle, so a five-hour Saturday for a group of twenty splits to a modest amount each. The one thing to decide in advance is how long you want at each stop, because that sets the total hours.",
    },
    {
      question: "How does parking work near Station Square and Mt Washington?",
      answer:
        "It is the reason most of these bookings happen. Station Square and Mt Washington have limited parking that fills early on any decent evening, and the Mt Washington overlooks in particular have almost no room for a group arriving in separate cars. Pitt Party Bus drops at the door and waits elsewhere, which removes the problem entirely — you are not circling, and you are not walking up the incline from wherever you eventually parked. For groups combining dinner on Grandview Avenue with a night on the South Side, this matters more than the fare, because the two are only a few minutes apart by vehicle in Pittsburgh but genuinely awkward to link by car. Give us both venues and we will sequence them.",
    },
    {
      question: "What is the latest you will run on a South Side booking?",
      answer:
        "Late, but it needs to be in the booking rather than decided at one in the morning. Pitt Party Bus operates around the clock, so a South Side night running until bar close is entirely normal work for us in Pittsburgh. The constraint is the same one that applies to every extension: if the vehicle is committed to another group the following morning, we cannot simply keep going. Groups that book through to two or three o'clock up front always get the time; groups that ask on the night sometimes cannot. Because we charge the same hourly rate either way, there is no financial reason to under-book. Decide your realistic end time when you reserve, and add an hour if the group is large.",
    },
    {
      question: "How many people can I fit for a South Side birthday?",
      answer:
        "Anywhere from two to thirty, and the South Side is where the larger vehicles earn their keep. Pitt Party Bus runs thirteen vehicles, including twenty-two, twenty-four, twenty-six, twenty-eight and thirty passenger party buses, plus mini buses at twelve and fourteen for smaller groups. For a Pittsburgh birthday crawl the practical guidance is to size for the number who will actually still be with you at the last stop, not the number on the invitation, which is usually smaller. Also account for coats: a bus at nominal capacity in January is noticeably tighter than the same bus in June. If you are between sizes, the larger vehicle costs modestly more per hour and makes a five-hour night considerably more comfortable.",
    },
  ],
  "north-hills": [
    {
      question: "Do you serve Cranberry Township and Wexford?",
      answer:
        "Yes — Cranberry, Wexford, McCandless, Pine Township, Ross Township and Allison Park are all inside the standard Pitt Party Bus service area, with no per-mile surcharge for reaching them. The North Hills is one of our steadier corridors, largely because it is far enough from Downtown Pittsburgh that driving in and parking is a genuine nuisance, and close enough that a bus makes the trip in half an hour. Typical bookings are wedding parties heading to city venues, groups going to Acrisure Stadium or PNC Park on a game day, and Christmas-season nights out. If your pickup is further north than Cranberry, tell us the address when you ask for a quote and we will confirm whether it is inside the standard area before you commit.",
    },
    {
      question: "How long is the drive from the North Hills to Downtown?",
      answer:
        "Roughly thirty minutes without traffic, and up to an hour when I-79 or 279 is congested. That gap is the single most useful thing to plan around for a North Hills booking. Pitt Party Bus builds the return leg of Pittsburgh game-day and event trips with real slack, because the North Shore empties slowly and the tunnels and bridges compound it. For a wedding, we generally recommend leaving Cranberry or Wexford ninety minutes before the ceremony start rather than the sixty minutes a mapping app suggests, which costs one extra hour of rental and removes the most common cause of a late wedding party. If your event has a hard start time, tell us what it is and we will work backwards from it.",
    },
    {
      question: "Is a party bus cheaper than driving in and parking?",
      answer:
        "For a group of ten or more heading into Pittsburgh, usually yes once you count everything. Event parking Downtown or on the North Shore runs a meaningful amount per car, and a group travelling from the North Hills in four separate cars pays that four times, plus fuel, plus whoever draws the short straw and stays sober. Pitt Party Bus quotes hourly at $150 to $250 depending on vehicle, with fuel, tolls, insurance and the chauffeur included, so a five-hour booking split across twenty people is often comparable or better. The part that does not show up in the arithmetic is that nobody has to drive home, and everybody arrives and leaves together rather than reconvening in three different parking garages.",
    },
    {
      question: "Can you do multiple pickups across the North Hills?",
      answer:
        "Yes, and it is common, but each extra stop costs time and time is what you are buying. Pitt Party Bus can collect a group across Cranberry, Wexford and McCandless on the way into Pittsburgh, and for a wedding party spread across the North Hills that is often the right call. The practical limit is about three pickups before the first people on board have been sitting for forty minutes. Beyond that, a single meeting point — usually a shopping centre lot with room to manoeuvre — works better for everyone. Our standard booking includes up to three stops, with additional stops charged at a modest flat fee, so the cost stays predictable. Send us the addresses and we will sequence them sensibly.",
    },
    {
      question: "What vehicles work best for a North Hills wedding?",
      answer:
        "For the wedding party itself, a mid-size bus in the twenty-two to twenty-six passenger range is the usual answer, because it holds the party plus dresses, suit bags and a photographer without anyone being wedged in. For guest shuttles between a North Hills hotel block and a Pittsburgh venue, our fourteen and twenty-three passenger luxury shuttles do the repeated loops more comfortably and cheaply than a party bus would. Pitt Party Bus operates thirteen vehicles seating two to thirty passengers, so most weddings use either one bus in shifts or a bus plus a shuttle. Give us the wedding party size, the guest count and both addresses and we will tell you which of the two actually costs less for your day.",
    },
  ],
  "south-hills": [
    {
      question: "Which South Hills communities do you cover?",
      answer:
        "Mt Lebanon, Upper St Clair, Peters Township, McMurray, Bethel Park and Canonsburg are all within the standard Pitt Party Bus service area, along with the surrounding communities on that side of Pittsburgh. There is no per-mile surcharge for reaching any of them. The South Hills generates a lot of wedding and prom work for us, partly because the school and country club calendars cluster tightly and partly because the drive into the city through the Liberty Tunnel is exactly the kind of trip nobody wants to make in formal wear in their own car. If your address sits further out than Canonsburg, mention it when you request a quote and we will confirm coverage before you place a deposit.",
    },
    {
      question: "How does the Liberty Tunnel affect timing from the South Hills?",
      answer:
        "It is the single biggest variable on any South Hills booking, and it is worth planning around rather than hoping. The Liberty Tunnel can move a group from Mt Lebanon into Downtown Pittsburgh in about twenty minutes, or it can add half an hour when it backs up, which it does reliably at rush hour and after events. Pitt Party Bus routes around it via the West End or Banksville when we can see it is stacked, but the safest planning approach is simply leaving earlier for anything with a fixed start time. For weddings we generally recommend building in an extra thirty minutes. It costs a fraction of an hour's rental and it is the difference between arriving relaxed and arriving apologising.",
    },
    {
      question: "Do you handle South Hills prom transportation?",
      answer:
        "Yes, and it is one of our busiest categories, which means booking early genuinely matters. Mt Lebanon, Upper St Clair, Peters Township and Bethel Park proms fall on a small number of Saturdays in April and May, and Pitt Party Bus sells out those specific dates six to eight weeks ahead while the neighbouring weekends stay open. Every student booking runs as a dry vehicle: no alcohol on board regardless of any individual passenger's age, and the chauffeur can end the trip and return the group to the pickup point if that is broken. Parents in Pittsburgh routinely ask us to confirm that policy in writing before they pay a deposit, and we are happy to do so.",
    },
    {
      question: "Can we use a party bus for a South Hills winery or brewery tour?",
      answer:
        "Yes, and it is one of the better uses of a bus in this part of Pittsburgh, because the stops are spread out and the whole point is that nobody drives. A typical South Hills tour runs four to six hours across three or four stops heading south and west toward Washington County. Pitt Party Bus charges hourly at $150 to $250 depending on the vehicle, and our standard booking includes up to three stops with additional stops at a modest flat fee, so a fourth or fifth venue is a known cost rather than a negotiation on the day. Passengers twenty-one and over may bring drinks for the ride between stops; we supply ice, cups and cooler space.",
    },
    {
      question: "What does a South Hills booking typically cost?",
      answer:
        "Most South Hills bookings with Pitt Party Bus land between four and six hours, at $150 to $250 an hour depending on the vehicle, with fuel, tolls, insurance and the chauffeur included in that rate. A wedding party of twenty taking a mid-size bus for five hours sits in the middle of the range; a smaller family group in the Denali SUV limo for four hours sits at the lower end. There is no per-mile charge for Mt Lebanon, Upper St Clair, Peters Township or Bethel Park, so the distance into Pittsburgh does not change the price — only the hours do. Gratuity of eighteen to twenty percent is customary and not included. Tell us your date, group size and stops for an exact quote.",
    },
  ],
};

export const HOME_FAQS: Faq[] = [
  {
    question: "How much does a party bus cost in Pittsburgh?",
    answer:
      "Pitt Party Bus rates run $150 to $250 an hour depending on the vehicle, and the size of the bus is what moves the number rather than the day of the week. A mini party bus for eight to twelve passengers sits at the bottom of that range with a three-hour minimum; the largest buses sit at the top with a four-hour minimum. That means a realistic Pittsburgh evening starts around $450 for a small group and lands between $800 and $1,250 for a full bus across four or five hours. Fuel, tolls, insurance and the chauffeur are all included in the hourly rate, and there is no per-mile charge inside our standard service area, so the quote you get is the amount you pay before gratuity. Gratuity of eighteen to twenty percent is customary and is not built in.",
  },
  {
    question: "How far in advance should I book a party bus in Pittsburgh?",
    answer:
      "Two to four weeks covers most Pittsburgh bookings, but the exceptions matter more than the rule. Prom season between April and June, wedding season between May and October, and New Year's Eve all need six to eight weeks, because the whole region concentrates onto a handful of dates and Pitt Party Bus sells those specific nights out long before the surrounding weekends fill. Graduation weekend for Pitt and Carnegie Mellon behaves the same way. Outside those windows we frequently have same-day availability, particularly midweek, so a last-minute booking is worth a phone call rather than an assumption. The practical rule: if your date is fixed and other people's dates are fixed to the same day, book early. If your date is flexible, you have more room than you think.",
  },
  {
    question: "What areas do you serve in Pittsburgh?",
    answer:
      "Pitt Party Bus serves Pittsburgh and the surrounding Allegheny County area with no per-mile surcharge. That covers the city neighbourhoods — Downtown, Oakland, the South Side, Shadyside, Squirrel Hill, the Strip District, Lawrenceville and the North Shore — as well as the North Hills communities of Cranberry, Wexford, McCandless, Ross Township and Allison Park, and the South Hills communities of Mt Lebanon, Upper St Clair, Peters Township, Bethel Park and Canonsburg. We also run east to Monroeville, Murrysville and Greensburg, and west to Moon Township, Robinson and Sewickley, including Pittsburgh International Airport. Trips beyond that standard area are quoted case by case rather than refused. If you are not sure whether your pickup address is inside the standard area, give it to us when you request a quote and we will confirm before you pay a deposit.",
  },
  {
    question: "Can we bring alcohol on the party bus?",
    answer:
      "Yes, on adult bookings, if every passenger on board is twenty-one or over. Pitt Party Bus supplies ice, cups and cooler space and you bring your own drinks; we do not sell alcohol on any Pittsburgh rental. The chauffeur checks IDs before the vehicle moves and has the authority to decline service to anyone visibly intoxicated, which is a safety requirement rather than a judgment call. Open containers must stay on the bus — carrying a drink off at a stop is a citation waiting to happen. Student bookings work differently: proms, graduations and any group including under-21 passengers run as strictly dry vehicles regardless of individual ages, because a chauffeur cannot police individual seats while driving. If your group is mixed ages, the dry policy applies to the whole vehicle.",
  },
  {
    question: "What's included in a party bus rental?",
    answer:
      "The hourly rate you are quoted covers the professional chauffeur, fuel, tolls and insurance, plus the vehicle's amenities: premium sound with Bluetooth, LED lighting, climate control, tinted windows, and a bar area with ice, cups and cooler space. Red carpet service and bottled water come as standard, and the larger Pitt Party Bus vehicles add dance floor space. Up to three stops are included in a standard Pittsburgh booking. What is not included: gratuity, which is customarily eighteen to twenty percent, and a short list of optional extras — decorations, stops beyond the first three, waiting time past fifteen minutes, and airport pickups each carry a modest set fee. Those are published rather than discovered at the end of the night, and we will quote them up front if you ask.",
  },
];

export const FLEET_FAQS: Faq[] = [
  {
    question: "How many passengers fit in a party bus?",
    answer:
      "Across the Pitt Party Bus fleet, anywhere from two to thirty passengers. We operate thirteen vehicles in Pittsburgh: party buses at twenty-two, twenty-four, twenty-six, twenty-eight and thirty passengers, Ford mini party buses at twelve and fourteen, a Denali SUV limo taking ten to fourteen, a Lincoln Town Car for two to six, luxury shuttles at fourteen and twenty-three, and Ford Expedition and Lincoln Continental private cars for smaller groups. The stated capacity is a seated capacity, so it assumes people sitting rather than standing. A useful rule when choosing: a vehicle at its nominal capacity in January, with everybody carrying a winter coat, feels considerably tighter than the same vehicle in June. If your headcount sits right on a boundary, take the larger vehicle.",
  },
  {
    question: "What size party bus do I need for 10 people?",
    answer:
      "For ten people, a twelve or fourteen passenger Ford mini party bus is the usual Pitt Party Bus answer, and the Denali SUV limo is the alternative if you want something that looks more formal on arrival. Both give ten passengers room to sit comfortably with coats and bags rather than filling every seat exactly. The mini bus is the better choice for a Pittsburgh night out with several stops, because getting in and out is easier and there is more floor space; the SUV limo suits a wedding arrival or a formal dinner better. Both sit at the lower end of our $150 to $250 hourly range with a three-hour minimum, so a straightforward evening for ten starts around $450 before gratuity.",
  },
  {
    question: "What size party bus do I need for 15 people?",
    answer:
      "Fifteen is the awkward number, and it is worth getting right. It is one over our fourteen-passenger mini party bus and shuttle, so the honest recommendation from Pitt Party Bus is a twenty-two passenger party bus rather than trying to squeeze into the smaller vehicle. That gives fifteen people in Pittsburgh genuine room for coats, bags and moving around during the trip, which across a four or five hour evening makes a real difference. It also gives you headroom if a couple of extra people join, which happens more often than groups expect. The twenty-two passenger bus sits in the middle of our $150 to $250 hourly range with a four-hour minimum, so budget accordingly rather than pricing the mini bus and being disappointed.",
  },
  {
    question: "What size party bus do I need for 20 people?",
    answer:
      "A twenty-two or twenty-four passenger party bus is the right fit for twenty people. Booking exactly to capacity is the most common mistake we see in Pittsburgh: twenty people in a twenty-passenger vehicle means nobody has anywhere to put a coat, and on a winter night that is not a small problem. Twenty-two to twenty-four gives you the margin. Pitt Party Bus also runs twenty-six, twenty-eight and thirty passenger buses if your group is likely to grow, and for a wedding party the larger option is often worth it because of dresses, suit bags and a photographer's equipment. These sit in the upper part of our $150 to $250 hourly range with a four-hour minimum. Tell us the real headcount and we will size it.",
  },
  {
    question: "What is the largest party bus available in Pittsburgh?",
    answer:
      "The largest vehicle in the Pitt Party Bus fleet is our thirty passenger party bus, which is the biggest we operate in Pittsburgh. It carries twenty-six to thirty passengers with premium leather seating, an LED light show system, a high-end sound system, a full bar with coolers and dedicated dance floor space. It sits at the top of our $150 to $250 hourly range with a four-hour minimum. If your group is larger than thirty, the practical solution is two vehicles rather than one — commonly a thirty passenger bus paired with a twenty-three passenger luxury shuttle, which is usually cheaper than it sounds because the shuttle rate is lower. Give us your total headcount and we will price both options so you can compare.",
  },
];

export const NEAR_ME_FAQS: Faq[] = [
  {
    question: "Where can I find a party bus near me in Pittsburgh?",
    answer:
      "Pitt Party Bus dispatches across Pittsburgh and the surrounding Allegheny County area, so \"near me\" resolves to the same fleet wherever in the region you are searching from. There is no per-mile surcharge inside our standard service area, which means a pickup in Cranberry costs the same hourly rate as one in Downtown Pittsburgh; only the hours you book change the price. When comparing local operators, the questions worth asking are whether the quoted rate includes fuel, tolls and insurance, how many stops are included, and whether the company can show you the actual vehicle rather than a stock photo. We are happy to answer all three. Call with your date, group size and stops and we will quote the real number rather than a starting-from figure.",
  },
  {
    question: "What Pittsburgh neighborhoods do you serve for party bus rentals?",
    answer:
      "All of them, plus the surrounding suburbs. Within the city, Pitt Party Bus regularly runs Downtown, Oakland, the South Side, Shadyside, Squirrel Hill, the Strip District, Lawrenceville and the North Shore. Outside the city we cover the North Hills — Cranberry, Wexford, McCandless, Pine Township, Ross Township and Allison Park — and the South Hills, including Mt Lebanon, Upper St Clair, Peters Township, McMurray, Bethel Park and Canonsburg. East we reach Monroeville, Murrysville, Irwin and Greensburg; west, Moon Township, Robinson, Sewickley and Pittsburgh International Airport. We have dedicated pages for the five areas we serve most. If your address is further out than those, tell us when you request a quote and we will confirm coverage before you commit.",
  },
  {
    question: "How quickly can I book a party bus near me in Pittsburgh?",
    answer:
      "Sometimes the same day, and that is a genuine answer rather than marketing. Pitt Party Bus operates around the clock and midweek availability in Pittsburgh is often open, so a Tuesday booking made on Tuesday morning is frequently possible. Weekends are tighter, and the peak dates — prom Saturdays in April through June, wedding season, graduation weekend and New Year's Eve — are typically gone six to eight weeks ahead. The determining factor is almost never our paperwork, which takes minutes; it is whether the vehicle you need is already committed. So a last-minute call is always worth making, but if your date is one that everyone else in the region also wants, do not rely on it. Call and we will tell you immediately what is free.",
  },
  {
    question: "What's the minimum rental time for a party bus near Pittsburgh?",
    answer:
      "Three hours on our smaller vehicles and four hours on the larger buses. Pitt Party Bus applies a three-hour minimum to the mini party buses and party vans, which at $150 an hour puts the entry point around $450, and a four-hour minimum to the executive and largest party buses. Minimums exist because a vehicle and chauffeur committed to your evening cannot take another Pittsburgh booking in the gap, not as an upsell. In practice most groups book longer than the minimum anyway — four to six hours is the common range for a night out, a wedding or a brewery tour. If you genuinely only need a one-way transfer, say so when you call: a private car or shuttle is often the cheaper answer than a party bus at minimum.",
  },
];

export const PRICING_FAQS: Faq[] = [
  {
    question: "How much is a party bus for 5 hours?",
    answer:
      "Between $750 and $1,250 with Pitt Party Bus, depending entirely on which vehicle you need. At our published Pittsburgh rates, a mini party bus for eight to twelve passengers runs $150 an hour, so five hours is $750. A party van for thirteen to fifteen is $175 an hour, or $875. An executive party bus for twenty to twenty-five is $200 an hour, or $1,000. Our largest buses are $250 an hour, or $1,250 for five hours. Every one of those figures includes the professional chauffeur, fuel, tolls and insurance, and up to three stops. What is not included is gratuity, customarily eighteen to twenty percent, and optional extras such as decorations or additional stops. Split across a full bus, five hours usually works out to a modest amount per person.",
  },
  {
    question: "How much does it cost to rent a party bus?",
    answer:
      "Pitt Party Bus charges $150 to $250 an hour in Pittsburgh, with a three-hour minimum on the smaller vehicles and four hours on the larger buses. The realistic entry point is therefore around $450 for a mini bus on a short evening, with most bookings landing between $800 and $1,500 once you account for the four to six hours a wedding, prom or night out actually takes. Vehicle size is the main driver of the rate — not distance, because there is no per-mile charge inside our standard service area, and not the day of the week. The quoted hourly rate includes the chauffeur, fuel, tolls, insurance and up to three stops. Gratuity of eighteen to twenty percent is customary and separate. Tell us the details and we will quote the exact figure.",
  },
  {
    question: "What is the average party bus cost per hour?",
    answer:
      "Across the Pitt Party Bus fleet the range is $150 to $250 an hour, and the middle of the Pittsburgh market sits around $175 to $200 for a mid-size bus carrying fourteen to twenty-five passengers with a premium sound system, LED lighting, a bar setup and a professional chauffeur. Below that, $150 buys a mini party bus for a smaller group. Above it, $250 buys our largest bus with a dance floor. Be cautious of quotes materially below this range from any operator: the usual explanation is that fuel, tolls, insurance or gratuity have been excluded from the headline number and reappear later. Our rate includes all four. Weekends and peak dates are in demand rather than priced differently, so book early rather than expecting a discount.",
  },
  {
    question: "How much to tip a party bus driver?",
    answer:
      "Eighteen to twenty percent of the total rental is the standard, and twenty to twenty-five percent is appropriate for genuinely exceptional service — a chauffeur who handled a schedule change gracefully or navigated a Pittsburgh game-day exit without drama. On an $800 booking that works out to roughly $144 to $160. Pitt Party Bus does not build gratuity into the quoted hourly rate, which is deliberate: it means the number we quote is the number you pay for the rental itself, and the tip stays a decision rather than a line item. Cash handed directly to the chauffeur at the end of the rental is the norm and is what drivers prefer, though we can add it to the final card payment if that is easier for your group.",
  },
  {
    question: "Are there hidden fees with party bus rentals?",
    answer:
      "Not with Pitt Party Bus, and the way to verify that is to check the list rather than take the claim. Your quoted Pittsburgh hourly rate includes the chauffeur, fuel, tolls, insurance and all vehicle amenities, plus up to three stops. The optional extras are published: decorations run $25 to $50, stops beyond the first three are $15 each, waiting time past fifteen minutes is $50 an hour, and airport pickups carry a $25 fee. Gratuity of eighteen to twenty percent is customary and separate. Damage or excessive cleaning is charged if it occurs, which is standard across the industry. That is the complete list. If another operator's quote looks lower, ask specifically which of fuel, tolls, insurance and gratuity are excluded from it.",
  },
  {
    question: "What's the minimum rental time for a party bus?",
    answer:
      "Three hours on the mini party buses and party vans, four hours on the executive and largest party buses. At Pitt Party Bus rates that puts the Pittsburgh entry point at roughly $450 for a three-hour mini bus booking and $800 for four hours on an executive bus. The minimum exists because a vehicle and chauffeur committed to your evening cannot take another booking around it, not as a way of inflating the total. In practice it rarely binds: most groups book four to six hours because that is what a wedding, a prom or a proper night out actually takes once you account for photos running long or a dinner reservation slipping. If you only need a one-way transfer, ask about a private car or shuttle instead.",
  },
];

export const FAQ_PAGE_FAQS: Faq[] = [
  {
    question: "How far in advance should I book my party bus?",
    answer:
      "Two to four weeks is comfortable for most Pittsburgh dates, but peak periods need six to eight. Prom season runs April through June, wedding season May through October, and New Year's Eve is the single hardest night of the year to book late. Graduation weekend for Pitt and Carnegie Mellon behaves the same way. On those dates the whole region wants the same handful of Saturdays, so Pitt Party Bus sells them out well ahead while the surrounding weekends stay open. Outside those windows we frequently have same-day availability, particularly midweek. The practical rule is simple: if your date is one that thousands of other people also have circled, book as soon as it is announced. A deposit holds the vehicle and the details can be adjusted later.",
  },
  {
    question: "Do you require a deposit to secure my booking?",
    answer:
      "Yes — twenty-five percent of the total, with the balance due on the day of service. Until the deposit is paid, Pitt Party Bus cannot hold a vehicle against another Pittsburgh booking for the same date, so on a busy Saturday a verbal reservation is not a reservation. We accept cash, credit cards and PayPal for the deposit, and corporate clients can be invoiced instead. The deposit is what converts a quote into a confirmed booking with a specific vehicle assigned to it, which matters most on the peak dates where availability moves quickly. Once it is paid, changes to pickup times, stops and even vehicle size are usually straightforward, subject to what else is on the schedule that day.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Modifications are free up to forty-eight hours before your event, which covers almost every change groups actually need: pickup times shifting, an extra stop appearing, a headcount moving up or down. Talk to Pitt Party Bus as soon as you know and we will adjust the Pittsburgh booking. Cancellations work on a sliding scale: seven or more days in advance receives a full refund minus a $50 processing fee, while cancellations inside seven days forfeit the deposit. That window exists because a vehicle released a week out can usually be rebooked and one released two days out generally cannot. If your plans are genuinely uncertain, say so when you book and we will tell you honestly which date carries the most risk.",
  },
  {
    question: "What if I need to extend my rental time?",
    answer:
      "Tell the chauffeur as early as you can and we will usually accommodate it at the same hourly rate — Pitt Party Bus does not apply a penalty rate for running over in Pittsburgh. The constraint is availability rather than price: if the vehicle is committed to another group later that night or early the next morning, we cannot hold it, and no amount of notice at midnight changes that. A group that raises the possibility at nine o'clock almost always gets the extra hour; a group that asks at closing time sometimes cannot. If you already suspect the evening will run long, book the extra hour up front. It costs the same either way and removes the risk entirely.",
  },
  {
    question: "How much does a party bus rental cost in Pittsburgh?",
    answer:
      "Pitt Party Bus charges $150 to $250 an hour depending on vehicle size, with a three-hour minimum on the smaller vehicles and four hours on the larger buses. A mini party bus for eight to twelve passengers is $150 an hour; a party van for thirteen to fifteen is $175; an executive bus for twenty to twenty-five is $200; our largest buses are $250. That puts a realistic Pittsburgh evening between roughly $450 for a small group on a short booking and $1,250 for a full bus across five hours. Vehicle size drives the price, not distance — there is no per-mile charge inside our standard service area. Gratuity of eighteen to twenty percent is customary and is not included in the quoted rate.",
  },
  {
    question: "What's included in the rental price?",
    answer:
      "The quoted hourly rate covers the professional chauffeur, fuel, tolls and insurance, plus the vehicle's amenities: premium sound with Bluetooth, LED lighting, climate control, tinted windows and a bar area with ice, cups and cooler space. Red carpet service and bottled water are standard on every Pitt Party Bus rental in Pittsburgh, and up to three stops are included. Larger buses add dance floor space. Excluded are gratuity, customarily eighteen to twenty percent, and a short published list of optional extras — decorations, additional stops beyond three, waiting time past fifteen minutes, and airport pickups. Those are quoted up front on request rather than appearing at the end of the night, and none of them apply unless you actually use them.",
  },
  {
    question: "Are there any hidden fees I should know about?",
    answer:
      "No, and the honest way to answer that is with the full list rather than a reassurance. On a Pitt Party Bus rental in Pittsburgh the optional charges are: decorations $25 to $50, extra stops beyond the first three at $15 each, waiting time past fifteen minutes at $50 an hour, and airport pickup or drop-off at $25. Gratuity of eighteen to twenty percent is customary and separate from the rate. Damage or excessive cleaning is charged if it occurs, as it is with every operator. Everything else — chauffeur, fuel, tolls, insurance, amenities, red carpet — is inside the hourly rate you were quoted. If a competing quote is materially cheaper, ask which of those four inclusions it leaves out.",
  },
  {
    question: "Do you offer any discounts?",
    answer:
      "Yes, in a few specific situations. Pitt Party Bus offers reduced rates on weekday bookings from Monday through Thursday, which are genuinely quieter for us in Pittsburgh, and on off-season dates outside the spring prom and summer wedding peaks. We also offer discounts for military personnel and for repeat customers, and student rates for prom and graduation groups. What we do not do is discount peak Saturdays, because those dates sell out regardless and pretending otherwise would be dishonest. If your date is flexible, moving a celebration from a Saturday to a Thursday or from June to February is by far the largest saving available. Ask when you call and we will tell you which of these applies to your booking.",
  },
  {
    question: "What types of vehicles do you have?",
    answer:
      "Pitt Party Bus operates thirteen vehicles in Pittsburgh, seating two to thirty passengers. Party buses come at twenty-two, twenty-four, twenty-six, twenty-eight and thirty passengers. Ford mini party buses seat twelve and fourteen. For formal arrivals we run a Denali SUV limo taking ten to fourteen and a Lincoln Town Car for two to six. Luxury shuttles at fourteen and twenty-three passengers handle guest transport and corporate loops, where repeated runs matter more than a dance floor. Ford Expedition and Lincoln Continental private cars cover executive and airport transfers. Every vehicle carries premium sound, LED lighting and climate control. The full list with photos, capacities and hourly rates is on our fleet page, and you are welcome to view any vehicle before booking.",
  },
  {
    question: "What amenities are included in your party buses?",
    answer:
      "Standard across the Pitt Party Bus fleet in Pittsburgh: premium leather seating, LED lighting systems, high-quality sound with Bluetooth, climate control, tinted windows, a bar area with ice and cups, and charging points. Our larger buses add dedicated dance floor space and upgraded entertainment systems. Red carpet service and complimentary bottled water come with every rental regardless of vehicle. What we supply for drinks is the infrastructure rather than the drinks themselves — ice, cups, napkins and cooler space — because we do not sell alcohol on any booking. Amenities vary slightly by vehicle, so if a particular feature matters to your event, name it when you call and we will tell you which vehicles have it rather than promising in general terms.",
  },
  {
    question: "Can I see the vehicle before booking?",
    answer:
      "Yes, and we would rather you did. Pitt Party Bus encourages Pittsburgh customers to view the actual vehicle before paying a deposit, particularly for weddings where the photographs matter. Call ahead to arrange a time, since vehicles are frequently out on bookings and turning up unannounced usually means seeing an empty parking space. If a visit is impractical, we can send additional photographs or a video walkthrough of the specific vehicle you are considering — not a generic stock image of a similar bus. That distinction is worth insisting on with any operator you are comparing us against: stock photography is the single most common way a fleet looks better online than it does on the night. Ask to see the vehicle you are actually being assigned.",
  },
  {
    question: "How do you maintain your vehicles?",
    answer:
      "Every Pitt Party Bus vehicle in Pittsburgh goes through regular DOT inspections, routine maintenance at 3,000-mile intervals, deep cleaning after each use and a safety check before every trip. The fleet is fully licensed and insured. Maintenance is the least visible part of this business and the part that most affects whether your evening happens as planned, which is why the pre-trip check exists as a separate step rather than being folded into the general schedule. If you want the specifics for a particular vehicle before booking a wedding or a large group, ask and we will tell you. We would also encourage you to ask the same question of any operator you are comparing, and to be wary of a vague answer.",
  },
  {
    question: "Are your drivers licensed and insured?",
    answer:
      "Yes. Every Pitt Party Bus rental in Pittsburgh is driven by a professional chauffeur, and commercial insurance covers the vehicle and passengers on every booking. Chauffeurs are responsible for ID checks where alcohol is involved and have the authority to decline service to visibly intoxicated passengers or to end a trip where the alcohol policy is broken — that authority is part of the job rather than a discretionary call. If you need our carrier details, liability limits or operating authority number in writing, for a corporate procurement process or because you are a parent booking prom transportation, ask and we will provide them. Any operator that hesitates at that question is telling you something. We would rather answer it before you pay a deposit.",
  },
  {
    question: "Can we bring our own alcohol?",
    answer:
      "On adult bookings, yes, provided every passenger is twenty-one or over. Pitt Party Bus supplies ice, cups and cooler space; you bring the drinks. We do not sell alcohol on any Pittsburgh rental. The chauffeur checks IDs before departure and may decline service to anyone visibly intoxicated. Open containers stay on the vehicle — carrying a drink off at a stop is what turns a good night into a citation. Student bookings are different and the difference is absolute: proms, graduations and any group that includes under-21 passengers run as strictly dry vehicles regardless of individual ages, and the chauffeur can end the trip and return the group to the pickup point. A mixed-age group makes the whole vehicle dry.",
  },
  {
    question: "What's your policy on smoking?",
    answer:
      "No smoking or vaping inside any Pitt Party Bus vehicle, without exception. This is partly a legal requirement for commercial passenger vehicles in Pennsylvania and partly practical: smoke gets into upholstery and carries into the next group's booking, which is why a cleaning charge applies where it happens. What we do instead on Pittsburgh bookings is work smoke breaks into the stops. If members of your group smoke, tell us when you book and the chauffeur will factor short stops into the route rather than everyone discovering the policy an hour into the trip. That small piece of planning avoids essentially every problem this rule otherwise causes, and it costs nothing as long as it does not add unscheduled stops.",
  },
  {
    question: "What happens if there's bad weather?",
    answer:
      "We run, and Pittsburgh weather is a normal operating condition rather than an exception. Snow and ice affect timing rather than availability: Pitt Party Bus builds extra time into winter routes, particularly through the tunnels and over the bridges where conditions change quickly. What we will not do is drive into genuinely unsafe conditions to keep a schedule, and if the National Weather Service issues a severe warning affecting your date we will contact you to discuss options rather than waiting for you to call. In the rare case where a trip genuinely cannot run safely, we will reschedule or refund rather than hold you to a booking we could not fulfil. Practical advice: on a winter booking, build an extra half hour into your own plan.",
  },
  {
    question: "Where do you provide service?",
    answer:
      "Pitt Party Bus serves Pittsburgh and the surrounding Allegheny County area with no per-mile surcharge. Inside the city that covers Downtown, Oakland, the South Side, Shadyside, Squirrel Hill, the Strip District, Lawrenceville and the North Shore. To the north, Cranberry, Wexford, McCandless, Pine Township, Ross Township and Allison Park. To the south, Mt Lebanon, Upper St Clair, Peters Township, McMurray, Bethel Park and Canonsburg. East we cover Monroeville, Murrysville, Irwin and Greensburg; west, Moon Township, Robinson and Sewickley, including Pittsburgh International Airport. We maintain dedicated pages for the five areas we serve most often. If your pickup address falls outside that list, give it to us with your quote request and we will confirm coverage before you commit to anything.",
  },
  {
    question: "Do you travel outside of Pittsburgh?",
    answer:
      "Yes, and those trips are quoted case by case rather than at the standard rate. Pitt Party Bus regularly runs into Washington, Westmoreland and Butler counties for wineries, breweries and venues outside the immediate Pittsburgh area, and longer trips — a concert in Cleveland, a wedding venue two hours out — are entirely possible. What changes is that a long-distance booking has to account for the vehicle being unavailable for anything else that day, so the hourly structure works differently than it does for a local night out. Tell us the destination and the timing when you call and we will give you a real figure. We would rather quote it properly than apply a local rate that does not fit the trip.",
  },
  {
    question: "How long does it take for pickup?",
    answer:
      "For a scheduled Pittsburgh booking, the vehicle arrives at the agreed time — chauffeurs are dispatched to be in position rather than en route at your pickup slot, and fifteen minutes of waiting is included before the waiting-time charge starts. For a same-day or last-minute request, allow a couple of hours between the call and the pickup so that Pitt Party Bus can get a vehicle and chauffeur to you, more if you are in the outer service area or it is a busy evening. What genuinely slows a pickup down is an address a large vehicle cannot reach, so if you are on a narrow residential street, expect to meet the bus at the nearest workable corner.",
  },
  {
    question: "Can you accommodate multiple stops?",
    answer:
      "Yes — up to three stops are included in a standard Pitt Party Bus booking, and additional stops are $15 each, so a longer Pittsburgh route is a known cost rather than a negotiation on the night. Bar crawls, brewery tours and wedding days with several locations are routine work for us. The practical limit is time rather than the fee: each stop consumes fifteen to twenty minutes of a booking once people get off and back on, so a five-stop evening needs more hours than groups typically estimate. Give us the full list of addresses when you book and we will sequence them to minimise driving, which often saves more time than it costs. Changes to the route mid-trip are fine if the schedule allows.",
  },
];
