import { FaPhoneAlt, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const footerLinks = [
  {
    link: "https://maps.app.goo.gl/fZGhZrtWCDrdrJtY7",
    label: "Map of church location",
    icon: <FaLocationDot size={24} className="icon" />,
    bold: true,
    boldContent: "Address:",
    content: "200 Monaco Dr., Cedar Park, TX 78613",
  },
  {
    link: "tel:+17374004458",
    label: "Call us",
    icon: <FaPhoneAlt size={24} className="icon" />,
    bold: false,
    boldContent: "",
    content: "(737) 400-4458",
  },
  {
    link: "mailto:church@saintmaryaustin.org",
    label: "Email us",
    icon: <FaEnvelope size={24} className="icon" />,
    bold: false,
    boldContent: "",
    content: "church@saintmaryaustin.org",
  },
];

export const pageLinks = [
  { name: "Home", link: "/", label: "Go to home page" },
  { name: "About", link: "/about", label: "Go to about page" },
  { name: "Calendar", link: "/calendar", label: "Go to calendar page" },
];

export const socialLinks = [
  {
    link: "https://www.facebook.com/saintmaryaustin/",
    icon: <FaFacebook size={32} className="icon" />,
    label: "Go to Facebook page",
  },
  {
    link: "https://www.instagram.com/saintmaryaustin/",
    icon: <FaInstagram size={32} className="icon" />,
    label: "Go to Instagram page",
  },
];
