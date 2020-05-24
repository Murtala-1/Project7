const Data = [
  {
    id: 1,
    restaurantName: 'Snapcafe & resto',
    address: '7 Race Course Rd, GRA, Kano',
    lat: 12.000466,
    lng: 8.552359,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipMfCQ-dXE9EqgiWkJr9QQRshjKpDmPAjzWel7fE=w408-h305-k-no',
    ratings: [
      {
        stars: 4,
        comment: 'Great! But not many veggie options.',
      },
      {
        stars: 5,
        comment: 'My favorite restaurant!',
      },
    ],
  },

  {
    id: 2,
    restaurantName: 'Chips Plus',
    address: 'Nassarawa-Mariri Rd Tarauni, Kano',

    lat: 11.980985,
    lng: 8.559263,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipPcfHNMoupbg_jtvNsVbVLVCrPnElFfT8KEjZgZ=w408-h544-k-no',
    ratings: [
      {
        stars: 5,
        comment: 'Tiny pizzeria next to Sacre Coeur!',
      },
      {
        stars: 3,
        comment: 'Meh, it was fine.',
      },
    ],
  },

  {
    id: 3,
    restaurantName: 'Pizza & Gurasa',
    address: '10 Lugard Avenue, By Race Course Rd, Nassarawa, Kano',

    lat: 11.989385,
    lng: 8.547427,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipOBdhkzqrfFNdKxOhVvQW3LKeH_WVU0amg2aQaw=w408-h408-k-no',

    ratings: [
      {
        stars: 5,
        comment: 'There Pizza and Gurasa is really nice!',
      },
      {
        stars: 4,
        comment: 'I think is nice place to get nice stuf',
      },
    ],
  },
  {
    id: 4,
    restaurantName: 'Corner Indian Grill',
    address: 'Lafia Rd, Nassarawa, Kano',

    lat: 11.989488,
    lng: 8.561568,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipP1ma2w_x7YZXI1UyVcSmEp2hqy_tYW7jQHQXJn=w426-h240-k-no',

    ratings: [
      {
        stars: 5,
        comment:
          'Had a very nice experience. Good ambience. Lovely grilled chicken.',
      },
      {
        stars: 4,
        comment: 'I think is nice place to get nice stuf',
      },
    ],
  },
  {
    id: 5,
    restaurantName: "Marietta's Restaurant",
    address: '5 Gidado Mukhtar Link, Nassarawa, Kano',

    lat: 11.992049,
    lng: 8.551654,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipNgSbufzimoX--pI94m8j_Vq5yCVet6GslE_6rz=w408-h343-k-no',

    ratings: [
      {
        stars: 5,
        comment:
          "They've got a good very nice cake. As I've taste it and I love it",
      },
      {
        stars: 4,
        comment:
          "I'll be right here. Until they drag me off the line. I'm not going anywhere.",
      },
    ],
  },
  {
    id: 6,
    restaurantName: 'habib bread',
    address: 'Habib Bread St, Giginyu, kawon kudu',

    lat: 11.992049,
    lng: 8.551654,
    picURL:
      'data:image/jpeg;base64,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',
    ratings: [
      {
        stars: 5,
        comment: 'Nice egg bread they got there. Very nice',
      },
      {
        stars: 4,
        comment: 'Wow wonderfully never forget u',
      },
    ],
  },

  {
    id: 7,
    restaurantName: 'Green Park Restaurant',
    address: 'adjacent to Ali Avenue, Ahmadu Bello, Kano',

    lat: 11.994406,
    lng: 8.557665,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipPE6-cjEohpRYBqrIUYFZef4JXUOPxbCDPBBqxJ=w408-h270-k-no',

    ratings: [
      {
        stars: 5,
        comment: 'Good place for tea and relaxation.',
      },
      {
        stars: 4,
        comment: 'Nice food is served here.',
      },
    ],
  },
  {
    id: 8,
    restaurantName: 'Raudat Kitchen',
    address: '22, Alu Ave, Nassarawa, Kano',

    lat: 11.993170,
    lng: 8.557446,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipNGhzNQkkWMvJ4b3rmIYbAJKti2ciBVJBy1B0AY=w408-h285-k-no',

    ratings: [
      {
        stars: 5,
        comment: 'Good place for tea and relaxation.',
      },
      {
        stars: 4,
        comment: 'Nice food is served here.',
      },
    ],
  },

  {
    id: 9,
    restaurantName: 'Taj Mahal Indian Cuisine',
    address: 'Alu Ave, GRA, Kano',

    lat: 11.994245,
    lng: 8.556859,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipMugsjJBDqSFFXRP77VTp5tyv9zq6wMuUWtuIIc=w426-h240-k-no',

    ratings: [
      {
        stars: 5,
        comment: 'Good place for tea and relaxation.',
      },
      {
        stars: 4,
        comment: 'Nice food is served here.',
      },
    ],
  },

  {
    id: 10,
    restaurantName: 'Shaban Restaurant',
    address: 'Wudil Rd, Tarauni, Kano',

    lat: 11.978476,
    lng: 8.563421,
    picURL:
      'https://lh5.googleusercontent.com/p/AF1QipM_NAqut_BIDZRN3PpjAxTYTq6plvsLvw3CENpr=w408-h306-k-no',

    ratings: [
      {
        stars: 5,
        comment: 'Good place for tea and relaxation.',
      },
      {
        stars: 4,
        comment: 'Nice food is served here.',
      },
    ],
  },
];

export default Data;


