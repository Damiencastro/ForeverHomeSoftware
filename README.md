# Forever Home Software

This is a project designed and developed for the Spring 2025 Hackathon for Good,
hosted by Kennesaw State University, and sponsored in part by Assurant.

## Project Description

This is a web-based application to display information about foster animals who
are awaiting their "forever home." This app will be used by animal rescue groups
to share informationa bout the animals available for adoption when they go to
events (frequently called "meet and greets") and not all of their available
foster animals are able to attend. A frequent question at these events is, "Do
you have any other animals available?" This enables rescue groups to provide a
full list with important details about each animal.

## User Experience

Because this application was developed in under 48 hours, we had to keep its
scope small. We have held off on developing an administrative interface (for
adding, updating, and deleting foster animals), and opted to provide only the
user interface that potential adopters will use.

The app has several screens to provide different information and capabilities to
the users.

### Splash page

The splash page is what appears when the app loads. Users select the rescue
group they want to see the animals for from this screen.

### Home page

The home page jumps straight into the first animal available for adoption. It
provides a photo and small amount of information on the animal. If the animal
doesn't immediately grab the heart of the potential adopter, they can swipe
right to go to the next animal in the list. If they want more information about
the animal, they can click a **More Information** button to go to the Details
page.

### Details page

The Details page has more information on a given animal. The Details page leads
to additional screens that will be added when time allows, to provide
even-more-specific information such as health and behavioral information about
the animal.

### Filter page

Sometimes a potential adopter has specific needs for their future companion,
such as the animal being child-safe or cat-safe, or being crate-trained. Users
use this screen to filter the list of available animals to show them only
compatible candidates.

## Implementation

We decided to go with a simple stack without a lot of additional libraries,
again due to the time constraints on the project deliverable.

### Server

We used Node with Express for the server.

### Client

We used ReactNative for the client side, since it gives us the option to go from
web-app only to adding a mobile app option.

### Persistence

We went with a SQL database for the persistence layer. We signed up with
FreeSQLDatabase.com to provide that functionality.

## Contributors

This project was designd and developed by
[David Castro](https://github.com/logofile),
[Damien Castro](https://github.com/damiencastro), and
[Samuel Gibbings](https://github.com/).
