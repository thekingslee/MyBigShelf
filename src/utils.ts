export const capitalizeFirstText = (str: string | undefined) => {
  if (str) return str[0].toUpperCase() + str.slice(1);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

export const isValidImageUrl = (url: string): boolean => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
};

export function formatMoney(amount: number | string): string {
  // Convert to string and split into integer and decimal parts
  const [integerPart, decimalPart] = amount.toString().split(".");

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part with the decimal part (if it exists)
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

export const statesAndCities = {
  states: [
    {
      name: "Abia",
      cities: [
        "Aba",
        "Umuahia",
        "Ohafia",
        "Arochukwu",
        "Bende",
        "Isuikwuato",
        "Uzuakoli",
      ],
    },
    {
      name: "Adamawa",
      cities: [
        "Yola",
        "Mubi",
        "Numan",
        "Jimeta",
        "Ganye",
        "Michika",
        "Mayo-Belwa",
      ],
    },
    {
      name: "Akwa Ibom",
      cities: [
        "Uyo",
        "Eket",
        "Ikot Ekpene",
        "Oron",
        "Abak",
        "Ikot Abasi",
        "Etinan",
      ],
    },
    {
      name: "Anambra",
      cities: [
        "Awka",
        "Onitsha",
        "Nnewi",
        "Ekwulobia",
        "Aguata",
        "Ihiala",
        "Ogidi",
      ],
    },
    {
      name: "Bauchi",
      cities: [
        "Bauchi",
        "Azare",
        "Misau",
        "Jama'are",
        "Katagum",
        "Gamawa",
        "Dass",
      ],
    },
    {
      name: "Bayelsa",
      cities: [
        "Yenagoa",
        "Brass",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Okoloba",
        "Ekeremor",
      ],
    },
    {
      name: "Benue",
      cities: [
        "Makurdi",
        "Gboko",
        "Otukpo",
        "Katsina-Ala",
        "Vandeikya",
        "Zaki Biam",
        "Adikpo",
      ],
    },
    {
      name: "Borno",
      cities: [
        "Maiduguri",
        "Biu",
        "Gwoza",
        "Dikwa",
        "Bama",
        "Konduga",
        "Monguno",
      ],
    },
    {
      name: "Cross River",
      cities: [
        "Calabar",
        "Ogoja",
        "Ikom",
        "Obudu",
        "Ugep",
        "Obubra",
        "Akamkpa",
      ],
    },
    {
      name: "Delta",
      cities: [
        "Asaba",
        "Warri",
        "Sapele",
        "Ughelli",
        "Agbor",
        "Abraka",
        "Burutu",
      ],
    },
    {
      name: "Ebonyi",
      cities: [
        "Abakaliki",
        "Afikpo",
        "Onueke",
        "Unwana",
        "Ezza",
        "Ishiagu",
        "Okposi",
      ],
    },
    {
      name: "Edo",
      cities: [
        "Benin City",
        "Auchi",
        "Ekpoma",
        "Uromi",
        "Irrua",
        "Sabongida-Ora",
        "Igarra",
      ],
    },
    {
      name: "Ekiti",
      cities: [
        "Ado-Ekiti",
        "Ikere",
        "Oye",
        "Ijero",
        "Emure",
        "Ido-Osi",
        "Ikole",
      ],
    },
    {
      name: "Enugu",
      cities: [
        "Enugu",
        "Nsukka",
        "Oji River",
        "Awgu",
        "Udi",
        "Agbani",
        "Ninth Mile",
      ],
    },
    {
      name: "Abuja",
      cities: [
        "Abuja",
        "Gwagwalada",
        "Kuje",
        "Bwari",
        "Kubwa",
        "Lugbe",
        "Nyanya",
      ],
    },
    {
      name: "Gombe",
      cities: [
        "Gombe",
        "Billiri",
        "Kaltungo",
        "Bajoga",
        "Kumo",
        "Dukku",
        "Nafada",
      ],
    },
    {
      name: "Imo",
      cities: [
        "Owerri",
        "Orlu",
        "Okigwe",
        "Mbaise",
        "Oguta",
        "Nkwerre",
        "Mbano",
      ],
    },
    {
      name: "Jigawa",
      cities: [
        "Dutse",
        "Hadejia",
        "Gumel",
        "Kazaure",
        "Ringim",
        "Garki",
        "Birnin Kudu",
      ],
    },
    {
      name: "Kaduna",
      cities: [
        "Kaduna",
        "Zaria",
        "Kafanchan",
        "Sanga",
        "Kachia",
        "Birnin Gwari",
        "Giwa",
      ],
    },
    {
      name: "Kano",
      cities: ["Kano", "Dambatta", "Gaya", "Bichi", "Wudil", "Rano", "Karaye"],
    },
    {
      name: "Katsina",
      cities: [
        "Katsina",
        "Funtua",
        "Daura",
        "Jibia",
        "Malumfashi",
        "Kankia",
        "Dutsin-Ma",
      ],
    },
    {
      name: "Kebbi",
      cities: [
        "Birnin Kebbi",
        "Argungu",
        "Yauri",
        "Zuru",
        "Jega",
        "Koko",
        "Bagudo",
      ],
    },
    {
      name: "Kogi",
      cities: [
        "Lokoja",
        "Okene",
        "Idah",
        "Kabba",
        "Ankpa",
        "Dekina",
        "Ayingba",
      ],
    },
    {
      name: "Kwara",
      cities: [
        "Ilorin",
        "Offa",
        "Pategi",
        "Omu-Aran",
        "Jebba",
        "Lafiagi",
        "Erin-Ile",
      ],
    },
    {
      name: "Lagos",
      cities: [
        "Lagos",
        "Ikeja",
        "Badagry",
        "Epe",
        "Ikorodu",
        "Lekki",
        "Oshodi",
      ],
    },
    {
      name: "Nasarawa",
      cities: [
        "Lafia",
        "Keffi",
        "Akwanga",
        "Nasarawa",
        "Doma",
        "Toto",
        "Keana",
      ],
    },
    {
      name: "Niger",
      cities: [
        "Minna",
        "Bida",
        "Kontagora",
        "Suleja",
        "Lapai",
        "New Bussa",
        "Kagara",
      ],
    },
    {
      name: "Ogun",
      cities: [
        "Abeokuta",
        "Ijebu Ode",
        "Sagamu",
        "Ilaro",
        "Ota",
        "Ijebu-Igbo",
        "Ayetoro",
      ],
    },
    {
      name: "Ondo",
      cities: ["Akure", "Ondo", "Owo", "Ikare", "Ilaje", "Okitipupa", "Idanre"],
    },
    {
      name: "Osun",
      cities: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Ejigbo", "Iwo", "Ikirun"],
    },
    {
      name: "Oyo",
      cities: [
        "Ibadan",
        "Ogbomosho",
        "Oyo",
        "Iseyin",
        "Saki",
        "Eruwa",
        "Igbo-Ora",
      ],
    },
    {
      name: "Plateau",
      cities: [
        "Jos",
        "Bukuru",
        "Pankshin",
        "Shendam",
        "Langtang",
        "Wase",
        "Barkin Ladi",
      ],
    },
    {
      name: "Rivers",
      cities: [
        "Port Harcourt",
        "Bonny",
        "Degema",
        "Bori",
        "Omoku",
        "Okrika",
        "Opobo",
      ],
    },
    {
      name: "Sokoto",
      cities: [
        "Sokoto",
        "Tambuwal",
        "Wurno",
        "Rabah",
        "Binji",
        "Gwadabawa",
        "Illela",
      ],
    },
    {
      name: "Taraba",
      cities: ["Jalingo", "Wukari", "Bali", "Takum", "Zing", "Gembu", "Ibi"],
    },
    {
      name: "Yobe",
      cities: [
        "Damaturu",
        "Potiskum",
        "Gashua",
        "Geidam",
        "Nguru",
        "Buni Yadi",
        "Damagum",
      ],
    },
    {
      name: "Zamfara",
      cities: [
        "Gusau",
        "Kaura Namoda",
        "Anka",
        "Talata Mafara",
        "Bukkuyum",
        "Gummi",
        "Zurmi",
      ],
    },
  ],
};
