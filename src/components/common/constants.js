import { RxDashboard } from 'react-icons/rx';
import { TbSmartHome } from 'react-icons/tb';
import { IoIosArrowDown } from 'react-icons/io';
import { MdFormatListBulleted } from 'react-icons/md';
import { LuListChecks } from 'react-icons/lu';
import { LuListVideo } from 'react-icons/lu';
import {
  AddFileIcon,
  AddIcon,
  CalendarIcon,
  CollaborationIcon,
  DashboardIcon,
  HomeIcon,
  InvoiceIcon,
  ManagementIcon,
  MessageIcon,
  PaymentsIcon,
  SettingsIcon,
} from './Images';

export const navItems = [
  { id: 1, url: '/', text: 'Home' },
  {
    id: 2,
    url: '/properties',
    text: 'Properties',
    sub: [
      {
        id: 1,
        name: 'New Listings',
        path: '/properties/:filter',
      },
      {
        id: 2,
        name: 'Price Reduced',
        path: '/properties/:filter',
      },
      {
        id: 3,
        name: 'New Construction',
        path: '/properties/:filter',
      },
      {
        id: 4,
        name: 'Insured Homes',
        path: '/properties/:filter',
      },
    ],
  },
  { id: 3, url: '/agents', text: 'Agents' },
  { id: 4, url: '/about-us', text: 'About Us' },
  { id: 5, url: '/contact-us', text: 'Contact Us' },
  { id: 6, url: '/blog', text: 'Blog' },
];

export const filterOptions = [
  {
    id: 1,
    text: 'Property Type',
    sub: [
      {
        id: 1,
        name: 'Flat',
      },
      {
        id: 2,
        name: 'Terrace',
      },
      {
        id: 3,
        name: 'Detached',
      },
    ],
  },
  {
    id: 2,
    text: 'Price Range',
    sub: [
      {
        id: 1,
        name: '2 million and above',
      },
      {
        id: 2,
        name: '1 million and above',
      },
      {
        id: 3,
        name: '600k and above',
      },
      {
        id: 4,
        name: '200k and above',
      },
    ],
  },
  { id: 3, text: 'Search by location' },
];

export const accTypeOptions = [
  {
    id: 1,
    label: 'Tenant',
    title: 'I am a user,',
    text: 'looking to rent a house of my dreams',
  },
  {
    id: 2,
    label: 'Landlord',
    title: 'I am a landlord,',
    text: ' looking to list my properties and manage rent terms',
  },
  {
    id: 3,
    label: 'Agent',
    title: 'I am an agent,',
    text: ' looking to manage clients and properties',
  },
];

export const sidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon fill="#616161" />,
    sec: <DashboardIcon fill="#1140E7" />,
    hover: <DashboardIcon fill="#1140E7" />,
  },
  {
    title: 'My Properties',
    icon: <HomeIcon fill="#616161" />,
    sec: <HomeIcon fill="#1140E7" />,
    hover: <HomeIcon fill="#1140E7" />,
    path: '/my-properties/all',
    dropDown: <IoIosArrowDown />,
    sub: [
      {
        id: 1,
        name: 'All Listings',
        path: '/my-properties/all',
        icon: <MdFormatListBulleted />,
      },
      {
        id: 2,
        name: 'Unlisted Listings',
        path: '/my-properties/unlisted-listings',
        icon: <LuListChecks />,
      },
      {
        id: 3,
        name: 'Active Listings',
        path: '/my-properties/active-listings',
        icon: <LuListVideo />,
      },
      {
        id: 4,
        name: 'Rented Properties',
        path: '/my-properties/rented-properties',
        icon: <LuListVideo />,
      },
    ],
  },
  // {
  //   title: 'Applications/Inquiries',
  //   icon: <AddFileIcon fill="#616161" />,
  //   sec: <AddFileIcon fill="#1140E7" />,
  //   hover: <AddFileIcon fill="#1140E7" />,
  //   path: '/inquires',
  // },

  {
    title: 'Tenant Management',
    icon: <ManagementIcon fill="#616161" />,
    sec: <ManagementIcon fill="#1140E7" />,
    hover: <ManagementIcon fill="#1140E7" />,
    path: '/tenant-mgt',
  },
  {
    title: 'Transactions',
    icon: <PaymentsIcon fill="#616161" />,
    sec: <PaymentsIcon fill="#1140E7" />,
    hover: <PaymentsIcon fill="#1140E7" />,
    path: '/transactions',
  },
  {
    title: 'Messages',
    icon: <MessageIcon fill="#616161" />,
    sec: <MessageIcon fill="#1140E7" />,
    hover: <MessageIcon fill="#1140E7" />,
    path: '/messages',
  },
  {
    title: 'Tenancy Agreements',
    icon: <InvoiceIcon fill="#616161" />,
    sec: <InvoiceIcon fill="#1140E7" />,
    hover: <InvoiceIcon fill="#1140E7" />,
    path: '/tenancy-agreements',
  },
  {
    title: 'Collaborations',
    icon: <CollaborationIcon fill="#616161" />,
    sec: <CollaborationIcon fill="#1140E7" />,
    hover: <CollaborationIcon fill="#1140E7" />,
    path: '/collaborations',
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon fill="#616161" />,
    sec: <CalendarIcon fill="#1140E7" />,
    hover: <CalendarIcon fill="#1140E7" />,
    path: '/calendar',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon fill="#616161" />,
    sec: <SettingsIcon fill="#1140E7" />,
    hover: <SettingsIcon fill="#1140E7" />,
    path: '/settings',
  },
];

export const tenantSidebarData = [
  {
    title: 'Dashboard',
    path: '/tenant/dashboard',
    icon: <DashboardIcon fill="#616161" />,
    sec: <DashboardIcon fill="#1140E7" />,
    hover: <DashboardIcon fill="#1140E7" />,
  },
  {
    title: 'My Properties',
    icon: <HomeIcon fill="#616161" />,
    sec: <HomeIcon fill="#1140E7" />,
    hover: <HomeIcon fill="#1140E7" />,
    path: '/tenant/property',
  },
  {
    title: 'Transactions',
    icon: <PaymentsIcon fill="#616161" />,
    sec: <PaymentsIcon fill="#1140E7" />,
    hover: <PaymentsIcon fill="#1140E7" />,
    path: '/transactions',
  },
  {
    title: 'Messages',
    icon: <MessageIcon fill="#616161" />,
    sec: <MessageIcon fill="#1140E7" />,
    hover: <MessageIcon fill="#1140E7" />,
    path: '/messages',
  },
  {
    title: 'Tenancy Agreements',
    icon: <InvoiceIcon fill="#616161" />,
    sec: <InvoiceIcon fill="#1140E7" />,
    hover: <InvoiceIcon fill="#1140E7" />,
    path: '/tenancy-agreements',
  },

  {
    title: 'Calendar',
    icon: <CalendarIcon fill="#616161" />,
    sec: <CalendarIcon fill="#1140E7" />,
    hover: <CalendarIcon fill="#1140E7" />,
    path: '/calendar',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon fill="#616161" />,
    sec: <SettingsIcon fill="#1140E7" />,
    hover: <SettingsIcon fill="#1140E7" />,
    path: 'tenant/settings',
  },
];

export const howItWorks = [
  {
    id: 1,
    title: 'Sign up and create account',
    text: 'Get started by creating a free account on TREG. ',
  },
  {
    id: 2,
    title: 'Search and Discover Properties',
    text: 'Browse through a variety of property listings tailored to your preferences.',
  },
  {
    id: 3,
    title: 'Connect with Landlords and Agents',
    text: 'Find verified landlords and agents on the platform',
  },
  {
    id: 4,
    title: 'Secure Your Rental with Escrow',
    text: 'Protect your deposit with our escrow service.',
  },
  {
    id: 5,
    title: 'Sign and Manage Your Lease',
    text: 'Once you’ve chosen a property, sign your lease agreement digitally.',
  },
  {
    id: 6,
    title: 'Rate Your Experience',
    text: 'After moving in, rate your landlord and leave a review to help others make informed decisions.',
  },
];

export const properties = [
  {
    id: 1,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg', // Replace with actual image path
  },
  {
    id: 2,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 3,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 4,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 5,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 6,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 7,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
  {
    id: 8,
    type: 'Apartment',
    price: '₦40,000',
    beds: 2,
    baths: 3,
    address: '123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    image: '/assets/herobg2.jpg',
  },
];

export const exploreData = [
  {
    id: 1,
    image: '/assets/h1.jpeg',
    meta: 'New Listings',
    text: '1224',
  },
  {
    id: 2,
    image: '/assets/h2.jpeg',
    meta: 'Priced Reduced',
    text: '1224',
  },
  {
    id: 3,
    image: '/assets/h3.jpeg',
    meta: 'New Construction',
    text: '1224',
  },
  {
    id: 4,
    image: '/assets/h3.jpeg',
    meta: 'New Construction',
    text: '1224',
  },
];
export const agents = [
  {
    id: 1,
    name: 'Ola Samuel',
    role: 'Real Estate Agent',
    phone: '+1 234 567 890',
    image: '/assets/agent.jpeg',
  },
  {
    id: 2,
    name: 'Ola Samuel',
    role: 'Real Estate Agent',
    phone: '+1 234 567 890',
    image: '/assets/agent.jpeg',
  },
  {
    id: 3,
    name: 'Ola Samuel',
    role: 'Real Estate Agent',
    phone: '+1 234 567 890',
    image: '/assets/agent.jpeg',
  },
  {
    id: 4,
    name: 'Ola Samuel',
    role: 'Real Estate Agent',
    phone: '+1 234 567 890',
    image: '/assets/agent.jpeg',
  },
];

export const whyChooseTreg = [
  {
    img: '/assets/discover-circle.svg',
    title: 'Expert Guidance',
    text: 'Work with top-rated agents who understand your market and priorities.',
  },
  {
    img: '/assets/rocket-01.svg',
    title: 'Innovative Tools',
    text: 'Explore properties through virtual tours and secure your funds with escrow services.',
  },
  {
    img: '/assets/puzzle.svg',
    title: 'Tailored Experience',
    text: 'Personalize your search, track your preferences, and save your favorite listings.',
  },
];

export const dashboardData = [
  {
    id: 1,
    label: 'All Listing',
    value: '1.01',
  },
  {
    id: 2,
    label: 'Active Rentals',
    value: '1.01',
  },
  {
    id: 2,
    label: 'Rented Properties',
    value: '1.01',
  },
  {
    id: 4,
    label: 'Unlisted Properties',
    value: '1.01',
  },
];

export const tenantCounts = [
  {
    id: 1,
    label: 'Total Tenants',
    value: '1.01',
  },
  {
    id: 2,
    label: 'Active Tenants',
    value: '1.01',
  },
  {
    id: 2,
    label: 'Pending Move-ins',
    value: '1.01',
  },
  {
    id: 4,
    label: 'Vacated Properties',
    value: '1.01',
  },
];

export const bestPerforming = [
  {
    img: '/assets/h1.jpeg',
    label: 'The Bourdillon',
    address: 'Owo Road, Allen Avenue',
    price: '2.5',
  },
  {
    img: '/assets/h1.jpeg',
    label: 'The Bourdillon',
    address: 'Owo Road, Allen Avenue',
    price: '2.5',
  },
  {
    img: '/assets/h1.jpeg',
    label: 'The Bourdillon',
    address: 'Owo Road, Allen Avenue',
    price: '2.5',
  },
];

export const headers = [
  'id',
  'Tenant Name',
  'Property',
  'Amount Paid',

  'Payment Type',
  'Status',
  'Actions',
];

export const transHeaders = [
  'id',
  'Date',
  'Category',
  'Amount Paid',
  'Type',
  'Status',
  'Actions',
];
export const statuses = ['Active', 'Draft', 'Expired'];
export const fetchedTransactions = [
  {
    id: 'TREG-TXN-56789-LND',
    date: 'Sep 01, 2022',
    property: '2-Bedroom Flat, Ikeja',
    name: 'Yinka Oluwadahunsi',
    amount: '₦30,000',
    charge: '₦20,000',
    status: 'active',
    type: 'Rent',
  },
  {
    id: 'TREG-TXN-56789-LND',
    date: 'Sep 01, 2022',
    property: '2-Bedroom Flat, Ikeja',
    name: 'Yinka Oluwadahunsi',
    amount: '₦30,000',
    charge: '₦20,000',
    status: 'Pending',
    type: 'Rent',
  },
  {
    id: 'TREG-TXN-56789-LND',
    date: 'Sep 01, 2022',
    property: '2-Bedroom Flat, Ikeja',
    name: 'Yinka Oluwadahunsi',
    amount: '₦30,000',
    charge: '₦20,000',
    status: 'Rented',
    type: 'Rented',
  },
];
export const inquiriesHeaders = [
  'Inquiry ID',
  'Property Title',
  'Applicant Name',
  'Contact Info',
  'Application Date',
  'Status',
  'Actions',
];

export const inquiriesData = [
  {
    id: 'TREG-TXN-56789-LND',
    date: 'Sep 01, 2022',
    property: '2-Bedroom Flat, Ikeja',
    name: 'Yinka Oluwadahunsi',
    amount: '₦30,000',
    charge: '₦20,000',
    status: 'Pending Review',
    type: 'Rent',
  },
  {
    id: 'TREG-TXN-56789-LND',
    date: 'Sep 01, 2022',
    property: '2-Bedroom Flat, Ikeja',
    name: 'Yinka Oluwadahunsi',
    amount: '₦30,000',
    charge: '₦20,000',
    status: 'Approved',
    type: 'Rented',
  },
];

export const propertyTypes = [
  {
    name: 'Flat',
    value: 'Flat',
  },
  { name: 'Apartment', value: 'Apartment' },
  { name: 'Duplex', value: 'Duplex' },
  { name: 'Bungalow', value: 'Bungalow' },
  { name: 'Self Contain', value: 'Self Contain' },
  { name: 'Penthouse', value: 'Penthouse' },
  { name: 'Terraced House', value: 'Terraced House' },
  { name: 'Loft', value: 'Loft' },
];

export const amenitiesList = [
  'Wi-Fi',
  'Parking Space',
  'Security',
  'Swimming Pool',
  'Air Conditioning',
  'Fully Furnished',
];
export const videos = [
  {
    propertyId: '67cc5bf1e07bdd2a117091c0',
    videoLink:
      'https://res.cloudinary.com/dmdvssgw7/video/upload/v1741446182/videos/file_yjjuzu.mp4',
  },
  {
    propertyId: '67cc5',
    videoLink: 'https://youtu.be/SRSg_6bdnFI?si=4YO3QiAEYxwiZu1j',
  },
  {
    propertyId: '67cc5bf1e07bdd2a117091c0',
    videoLink:
      'https://res.cloudinary.com/dmdvssgw7/video/upload/v1741446182/videos/file_yjjuzu.mp4',
  },
  {
    propertyId: '67cc5bf1e07bdd2a117091c0',
    videoLink:
      'https://res.cloudinary.com/dmdvssgw7/video/upload/v1741446182/videos/file_yjjuzu.mp4',
  },
];
